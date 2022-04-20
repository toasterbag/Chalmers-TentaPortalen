import fetch from "node-fetch";
import cheerio from "cheerio";
import { getYear } from "date-fns";

import {
  scrape_all_programmes,
  get_active_programmes,
} from "@app/import/programmes";
import { scrape_periods } from "@app/import/periods";

import { scrape_survey } from "@app/import/survey";
import {
  AcademicYear,
  Queue,
  getUserAgent,
  isDefined,
  isError,
} from "@app/utils/index";
import { Context } from "@app/context";
import { ProgressBar } from "@app/log/progress";
import { CourseInstance } from "@prisma/client";

const CONCURRENCY = 16;
// We COULD go further back but there won't be any exams or surveys at that point
const START_YEAR = 2010;

// WARNING ACHTUNG
// This code is dangerous!!!
// Parsing the student portal is difficult because everything is just html tables
// and you can't expect it to conform to anything really.
// I will try my best to comment the code below. Please don't judge me too harshly

const get_all_course_ids = async (): Promise<
  Array<{ code: string; id: string }>
> => {
  const CURRENT_YEAR = getYear(new Date());

  // TODO this might break during the spring semester
  // the problem is that during the autumn we want to look at
  // CURRENT_YEAR + 2 and during the spring its CURRENT_YEAR + 1
  // This is an easy fix but I am always scared when I have to change
  // stuff in the import code :(
  const years = Array(CURRENT_YEAR + 2 - START_YEAR)
    .fill(0)
    .map((_, i) => new Date(i + START_YEAR, 1))
    .map((e) => AcademicYear.from_date(e));

  const queue: Queue<
    AcademicYear,
    Array<{ code: string; id: string }>
  > = new Queue(years);
  const instance_ids = await queue.start(async (academic_year) => {
    const base_url = "https://www.student.chalmers.se/sp/course_list";
    const query = {
      flag: 1,
      sortorder: "CODE",
      // search_course_code: "SSY080",
      search_ac_year: academic_year.toString(),
      query_start: 0,
      batch_size: 5000, // We will never have this many courses so it should give all of them in one page
    };

    const query_string = Object.entries(query)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");

    const res = await fetch(`${base_url}?${query_string}`, {
      headers: {
        "User-Agent": getUserAgent(),
      },
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    return $("tbody tbody")
      .toArray()
      .flatMap((table) => {
        const header = $(table).find("td.tableHeader:contains('Kod')");
        if (header.length > 0) {
          return $("tr:nth-child(n+3)", table)
            .toArray()
            .map((row) => {
              const course_link = $(row).find("td:first-child a");
              const id = $(course_link).attr("href")?.replace(/.*=/, "");
              const code = $(course_link).text();
              if (id) {
                return { code, id };
              }
              return undefined;
            })
            .filter(isDefined);
        }
        return undefined;
      })
      .filter(isDefined);
  }, CONCURRENCY);

  return instance_ids.flat();
};

const import_programmes = async (ctx: Context) => {
  const programmes = await scrape_all_programmes(2010);
  if (isError(programmes)) {
    console.error(programmes);
    return;
  }
  await ctx.prisma.programme.createMany({
    data: programmes,
    skipDuplicates: true,
  });
  console.info("Finished importing programmes");
};

const import_instances = async (ctx: Context) => {
  const instances = await ctx.prisma.courseInstance.findMany({});
  const instances_ids = new Set(instances.map((i) => i.study_portal_id));
  const all_instance_ids = await get_all_course_ids();
  const missing_instances = all_instance_ids.filter(
    ({ id }) => !instances_ids.has(id),
  );

  console.info(
    `Got ${all_instance_ids.length} course instances, filtered down to ${missing_instances.length}`,
  );

  await ctx.task_queue.clear_queue();
  for (const { code, id } of missing_instances) {
    await ctx.task_queue.push_task({
      kind: "FetchCourseInstance",
      data: { course_code: code, instance_id: id },
    });
  }
  // const queue = new Queue(missing_instances);
  // await queue.start(async ({ code, id }) => {
  //   let { instances, course, department } = await scrape_instances_for_id(
  //     code,
  //     id,
  //   );
  //   if (instances.isEmpty()) {
  //     Log.warn(`No instances found for ${course.course_code}`);
  //     return;
  //   }
  //   // Skip all non-chalmers courses, GU programmes owns a couple
  //   // and we can't match against those as they aren't included in our ladok reports
  //   // Example: KBT050 2009/2010 is owned by FARGU
  //   if (!programme_codes.includes(course.owner_code)) {
  //     Log.warn(
  //       `Skipping ${course.course_code}, ${instances[0].academic_year}. Programme '${course.owner_code}' does not exist in database`,
  //     );
  //     return;
  //   }
  //   await ctx.prisma.department.upsert({
  //     where: { id: department.id },
  //     create: department,
  //     update: department,
  //   });

  //   await ctx.prisma.course.upsert({
  //     where: { course_code: course.course_code },
  //     create: course,
  //     update: course,
  //   });

  //   await ctx.prisma.courseInstance.createMany({
  //     data: instances,
  //     skipDuplicates: true,
  //   });

  //   Log.info(`Imported ${course.course_code}, ${instances[0].academic_year}`);
  // }, CONCURRENCY);

  console.info("Finished importing courses and instances");
};

const import_surveys = async (ctx: Context) => {
  // Filter out instances that we already have surveys for
  let instances = await ctx.prisma.courseInstance.findMany({
    orderBy: {
      academic_year: "asc",
    },
  });
  const surveys_in_database = await ctx.prisma.survey.findMany({});
  instances = instances
    .filter(
      (i) =>
        !surveys_in_database.some(
          (s) =>
            s.course_code === i.course_code &&
            s.academic_year === i.academic_year &&
            s.start_period === i.start_period,
        ),
    )
    // There weren't any digital course surveys prior to 2012
    .filter((i) => Number(i.academic_year.split("/")[0]) >= 2012);
  const queue: Queue<CourseInstance, void> = new Queue(instances);
  await queue.start(async (instance) => {
    const survey = await scrape_survey(ctx, instance);
    if (survey) {
      await ctx.prisma.survey.createMany({
        data: [survey],
        skipDuplicates: true,
      });
    }
    await wait(200);
  }, CONCURRENCY);
  console.info("Finished importing surveys");
};

// Chalmers IT hate him!!!
// This guy scraped ALL courses in JUST seven MINUTES
// with this ONE WIERD TRICK
// No but really running this the first time takes forever.
// Chalmers servers are really slow (chalmers.se is running Windows Server 2008)
// As long as the terminal is printing everything is fine, expect this to take up to 24 hours
// I haven't been rate limited yet but I can just feel it coming, run it behind a VPN or something
const scrape_everything = async (ctx: Context) => {
  ctx.log.info("Started scraping");
  await ctx.task_queue.clear_queue();

  const periods = await scrape_periods();

  await ctx.prisma.period.createMany({
    data: periods,
    skipDuplicates: true,
  });
  console.info("Finished scraping exam periods");

  await import_programmes(ctx);
  await ctx.prisma.programme.updateMany({ data: { active: false } });
  for (const code of await get_active_programmes()) {
    await ctx.prisma.programme.update({
      data: { active: true },
      where: { code },
    });
  }
  console.info("Finished scraping programmes");

  for (const programme of await ctx.prisma.programme.findMany({
    distinct: ["code"],
  })) {
    await ctx.redis_cache.valid_programme_codes.add(programme.code);
  }

  for (const programme of await ctx.prisma.programmeInstance.findMany({
    select: { instance_id: true },
  })) {
    await ctx.redis_cache.scraped_programme_instances.add(
      programme.instance_id,
    );
  }

  await import_instances(ctx);
  const target = await ctx.task_queue.queue_len();
  const p = new ProgressBar({ prefix: "Scraping course instances", target });

  while (true) {
    const queue_len = target - (await ctx.task_queue.queue_len());
    if (queue_len === target) break;
    p.update(queue_len);
    await wait(1000);
  }
  p.finish();
  console.info("Finished scraping course instances");
  await import_surveys(ctx);
  console.info("Finished scraping course surveys");

  ctx.log.info("Finished scraping the study portal");
};

export const test_case = async (ctx: Context) => {
  await ctx.task_queue.clear_queue();

  // const periods = await scrape_periods();
  // await ctx.prisma.period.createMany({
  //   data: periods,
  //   skipDuplicates: true,
  // });
  // console.info("Finished scraping exam periods");

  // await import_programmes(ctx);
  // await ctx.prisma.programme.updateMany({ data: { active: false } });
  // for (const code of await get_active_programmes()) {
  //   await ctx.prisma.programme.update({
  //     data: { active: true },
  //     where: { code },
  //   });
  // }

  // console.info("Finished scraping programmes");

  const instances = [
    31772, 31134, 28758, 28318, 26760, 24698, 23197, 21871, 20693,
  ];
  await wait(1000);
  for (const id of instances) {
    await ctx.task_queue.push_task({
      kind: "FetchCourseInstance",
      data: { course_code: "TDA555", instance_id: String(id) },
    });
  }

  const target = await ctx.task_queue.queue_len();
  const p = new ProgressBar({ prefix: "Scraping course instances", target });

  while (true) {
    const queue_len = target - (await ctx.task_queue.queue_len());
    if (queue_len === target) break;
    p.update(queue_len);
    await wait(1000);
  }
  p.finish();

  await import_surveys(ctx);
  console.info("Finished scraping course surveys");
};

export { scrape_everything };
