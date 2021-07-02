import { PrismaClient } from "@prisma/client";
import { Config } from "@app/config";

// Caches
import * as LastUpdatedCache from "@app/context/cache/last_updated";
import * as ProgrammesByYearCache from "@app/context/cache/programmes_by_year";
import * as CourseCodesCache from "@app/context/cache/course_codes";
import * as PassrateByPeriodCache from "@app/context/cache/passrate_by_period";
import * as PassrateByPeriodAndYearCache from "@app/context/cache/passrate_by_period_and_year";

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
  status: {
    exam_statistics: Progress;
    study_portal: Progress;
  };
  cache: {
    last_updated: LastUpdatedCache.CacheType;
    programmes_by_year: ProgrammesByYearCache.CacheType;
    course_codes: CourseCodesCache.CacheType;
    passrate_by_period: PassrateByPeriodCache.CacheType;
    passrate_by_period_and_year: PassrateByPeriodAndYearCache.CacheType;
  };

  private constructor(config: Config) {
    this.prisma = new PrismaClient();
    this.config = config;
    this.status = {
      exam_statistics: new Progress(undefined),
      study_portal: new Progress(undefined),
    };
    this.cache = {
      last_updated: LastUpdatedCache.gen_cache(this),
      programmes_by_year: ProgrammesByYearCache.gen_cache(this),
      course_codes: CourseCodesCache.gen_cache(this),
      passrate_by_period: PassrateByPeriodCache.gen_cache(this),
      passrate_by_period_and_year: PassrateByPeriodAndYearCache.gen_cache(this),
    };
    // this.status = status;
  }
  static async initialize(config: Config): Promise<Context> {
    const ctx = new Context(config);
    for (const cache of Object.values(ctx.cache)) {
      cache.update();
    }
    const exam_datasheet_last_imported = await ctx.prisma.$queryRaw`
    SELECT completed FROM scans WHERE title='exam_statistics_datasheet' ORDER BY completed DESC LIMIT 1;`;

    const study_portal_last_imported = await ctx.prisma.$queryRaw`
    SELECT completed FROM scans WHERE title='study_portal' ORDER BY completed DESC LIMIT 1;`;

    ctx.status = {
      exam_statistics: new Progress(
        exam_datasheet_last_imported.length
          ? new Date(exam_datasheet_last_imported[0].completed)
          : undefined,
      ),
      study_portal: new Progress(
        study_portal_last_imported.length
          ? new Date(study_portal_last_imported[0].completed)
          : undefined,
      ),
    };

    return ctx;
  }
}
