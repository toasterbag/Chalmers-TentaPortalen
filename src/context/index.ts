import { Config } from "@app/config";
import { Logger } from "@app/log";
import RedisClient, { Redis } from "ioredis";
import { TaskQueue } from "@app/worker/task_queue";
import { RedisCache } from "@app/redis";

// Caches
import * as LastUpdatedCache from "@app/context/cache/last_updated";
import * as ProgrammesByYearCache from "@app/context/cache/programmes_by_year";
import { prisma } from "@app/prisma";
import { AuthenticationProvider } from "@app/auth";

export class Context {
  config: Config;

  redis_cache: RedisCache;

  prisma = prisma;

  auth = new AuthenticationProvider(prisma);

  redis: Redis;

  task_queue: TaskQueue;

  log: Logger;

  cache: {
    last_updated: LastUpdatedCache.CacheType;
    programmes_by_year: ProgrammesByYearCache.CacheType;
  };

  private constructor(config: Config) {
    Logger.init(this.prisma, {
      disable_console: false,
      meta: {
        env: process.env.NODE_ENV ?? "?",
        version: process.env.npm_package_version ?? "?",
        node_version: process.env.NODE_VERSION ?? "?",
      },
    });
    this.log = new Logger();
    this.redis = new RedisClient({
      host: config.redis.host,
    });
    this.redis_cache = new RedisCache(this.redis);
    this.task_queue = new TaskQueue(this.redis);
    this.config = config;

    this.cache = {
      last_updated: LastUpdatedCache.gen_cache(this),
      programmes_by_year: ProgrammesByYearCache.gen_cache(this),
    };

    // this.status = status;
  }

  static async initialize(config: Config): Promise<Context> {
    const ctx = new Context(config);
    for (const cache of Object.values(ctx.cache)) {
      cache.update();
    }
    // const exam_datasheet_last_imported = await ctx.prisma.$queryRaw`
    // SELECT completed FROM scans WHERE title='exam_statistics_datasheet' ORDER BY completed DESC LIMIT 1;`;

    // const study_portal_last_imported = await ctx.prisma.$queryRaw`
    // SELECT completed FROM scans WHERE title='study_portal' ORDER BY completed DESC LIMIT 1;`;

    // const all_uploaded_exams = await ctx.prisma.exam.findMany({
    //   where: { thesis_id: { not: null } },
    //   include: { thesis: true },
    // });
    // for (const exam of all_uploaded_exams) {
    //   if (!exam.thesis) continue;
    //   const path = `${config.paths.data}/courses/${exam.course_code}/${exam.date}/exam.${exam.thesis.filetype}`;
    //   if (!(await pathExists(path))) {
    //     console.log(`Removing thesis for ${exam.course_code} ${exam.date}`);
    //     await ctx.prisma.examThesis.delete({
    //       where: {
    //         id: exam.thesis.id,
    //       },
    //     });
    //   }
    // }

    return ctx;
  }
}
