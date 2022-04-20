import "@app/global";
import { build_config, Config } from "@app/config";
import { scrape_instances_for_id } from "@app/import/instance";
import { isMainThread, Worker as NodeWorker } from "node:worker_threads";
import RedisClient, { Redis } from "ioredis";
import { isError } from "@app/utils";
import { fetch_programme_plan } from "@app/import/programmes";
import { RedisCache } from "@app/redis";
import { PrismaClient } from "@prisma/client";
import { TaskQueue } from "./task_queue";

class Worker {
  private prisma = new PrismaClient();

  private redis: Redis;

  private cache: RedisCache;

  private task_queue: TaskQueue;

  constructor(config: Config) {
    this.redis = new RedisClient({
      host: config.redis.host,
    });
    this.cache = new RedisCache(this.redis);
    this.task_queue = new TaskQueue(this.redis);

    if (isMainThread) {
      throw Error("Can't start worker as main thread");
    }
  }

  async fetch_course_instance({
    course_code,
    instance_id,
  }: {
    course_code: string;
    instance_id: string;
  }) {
    const res = await scrape_instances_for_id(course_code, instance_id);
    if (isError(res)) {
      console.error(res);
      return;
    }

    const {
      instances,
      course,
      department,
      programme_plan_entries,
      modules,
      module_dates,
      examiners,
    } = res;
    // Skip all non-chalmers courses, GU programmes owns a couple
    // and we can't match against those as they aren't included in our ladok reports
    // Example: KBT050 2009/2010 is owned by FARGU
    if (!(await this.cache.valid_programme_codes.has(course.owner_code))) {
      // console.warn(
      //   `Skipping ${course.course_code}, ${instances[0].academic_year}. Programme '${course.owner_code}' does not exist in database`,
      // );
      return;
    }

    await this.prisma.examiner.createMany({
      data: examiners,
      skipDuplicates: true,
    });

    await this.prisma.department.createMany({
      data: [department],
      skipDuplicates: true,
    });

    await this.prisma.course.upsert({
      where: { course_code: course.course_code },
      create: course,
      update: course,
    });

    await this.prisma.courseInstance.createMany({
      data: instances,
      skipDuplicates: true,
    });

    for (const entry of programme_plan_entries) {
      if (
        !(await this.cache.scraped_programme_instances.has(
          entry.programme_instance_id,
        ))
      ) {
        await this.fetch_programme_instance(
          entry.programme_instance_id,
          entry.programme_code,
        );
      }
    }
    try {
      await this.prisma.programmePlanEntry.createMany({
        data: programme_plan_entries,
        skipDuplicates: true,
      });
    } catch {
      console.log(programme_plan_entries);
    }

    await this.prisma.courseModule.createMany({
      data: modules,
      skipDuplicates: true,
    });

    await this.prisma.moduleDates.createMany({
      data: module_dates,
      skipDuplicates: true,
    });

    // console.log(
    //   `Imported ${course.course_code}, ${instances[0].academic_year}`,
    // );
  }

  async fetch_programme_instance(instance_id: string, programme_code: string) {
    const { admission_year } = await fetch_programme_plan(instance_id);
    await this.prisma.programmeInstance.createMany({
      data: [{ admission_year, instance_id, programme_code }],
      skipDuplicates: true,
    });
    await this.cache.scraped_programme_instances.add(instance_id);
  }

  async next() {
    const task = await this.task_queue.pop_queue();
    if (task) {
      const { kind, data } = task;
      switch (kind) {
        case "FetchCourseInstance":
          await this.fetch_course_instance(data);
          break;
      }
      await wait(1000);
    } else {
      await wait(1000);
    }
    this.next();
  }
}

export const start_workers = (config_path: string, worker_count: number) => {
  Array.from(range(worker_count)).forEach(
    () => new NodeWorker(__filename, { argv: [config_path] }),
  );
};

const worker_main = async () => {
  const config = await build_config(process.argv[2]);

  const s = new Worker(config);
  s.next();
};

if (!isMainThread) {
  worker_main().catch((e) => console.error(e));
}
