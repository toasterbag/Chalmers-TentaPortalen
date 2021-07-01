import { PrismaClient } from "@prisma/client";
import { Config } from "@app/config";

// Caches
import * as LastUpdatedCache from "@app/context/cache/last_updated";
import * as ProgrammesByYearCache from "@app/context/cache/programmes_by_year";
import * as CourseCodesCache from "@app/context/cache/course_codes";
import * as PassrateByPeriodCache from "@app/context/cache/passrate_by_period";

class Progress {
  updated: Date | undefined;
  running = false;
  progress = 0;
  progress_target = 0;
  constructor(updated: Date | undefined) {
    this.updated = updated;
  }
}
export class Context {
  config: Config;
  prisma: PrismaClient = new PrismaClient();
  // status: {
  //   course_material: Progress;
  //   exam_statistics: Progress;
  //   study_portal: Progress;
  // };
  cache: {
    last_updated: LastUpdatedCache.CacheType;
    programmes_by_year: ProgrammesByYearCache.CacheType;
    course_codes: CourseCodesCache.CacheType;
    passrate_by_period: PassrateByPeriodCache.CacheType;
  };

  private constructor(config: Config) {
    this.prisma = new PrismaClient();
    this.config = config;
    this.cache = {
      last_updated: LastUpdatedCache.gen_cache(this),
      programmes_by_year: ProgrammesByYearCache.gen_cache(this),
      course_codes: CourseCodesCache.gen_cache(this),
      passrate_by_period: PassrateByPeriodCache.gen_cache(this),
    };
    // this.status = status;
  }
  static async initialize(config: Config): Promise<Context> {
    const ctx = new Context(config);
    for (const cache of Object.values(ctx.cache)) {
      cache.update();
    }
    // const course_material_last_imported = await ctx.prisma.$queryRaw`
    // SELECT completed FROM scans WHERE title='course_material' ORDER BY completed DESC LIMIT 1;`;

    // const exam_datasheet_last_imported = await ctx.prisma.$queryRaw`
    // SELECT completed FROM scans WHERE title='exam_statistics_datasheet' ORDER BY completed DESC LIMIT 1;`;

    // const study_portal_last_imported = await ctx.prisma.$queryRaw`
    // SELECT completed FROM scans WHERE title='study_portal' ORDER BY completed DESC LIMIT 1;`;

    // const status = {
    //   course_material: new Progress(
    //     course_material_last_imported.length
    //       ? new Date(course_material_last_imported[0].completed)
    //       : undefined,
    //   ),
    //   exam_statistics: new Progress(
    //     exam_datasheet_last_imported.length
    //       ? new Date(exam_datasheet_last_imported[0].completed)
    //       : undefined,
    //   ),
    //   study_portal: new Progress(
    //     study_portal_last_imported.length
    //       ? new Date(study_portal_last_imported[0].completed)
    //       : undefined,
    //   ),
    // };

    return ctx;
  }
}
