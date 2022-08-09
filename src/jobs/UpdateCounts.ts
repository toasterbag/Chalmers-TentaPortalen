import { Context } from "@app/context";
import { AcademicYear } from "@app/utils";
import { CronJob } from "cron";

export const UpdateExamCount = (ctx: Context) => {
  return new CronJob(
    "0 0 * * * *",
    async () => {
      const count = await ctx.prisma.common.moduleResult.count({
        where: {
          grading_system: "ThreeFourFive",
        },
      });
      await ctx.cache.entries.EXAM_COUNT.set(String(count));
    },
    null,
    undefined,
    undefined,
    undefined,
    true,
  );
};

export const UpdateThesisCount = (ctx: Context) => {
  return new CronJob(
    "0 0 * * * *",
    async () => {
      const count = await ctx.prisma.common.examThesis.count({});
      await ctx.cache.entries.THESIS_COUNT.set(String(count));
    },
    null,
    undefined,
    undefined,
    undefined,
    true,
  );
};

export const UpdateActiveCoursesWithExamCount = (ctx: Context) => {
  return new CronJob(
    "0 0 * * * *",
    async () => {
      const currentYear = AcademicYear.currentYear().toString();
      const count = await ctx.prisma.common.course.count({
        where: {
          instances: {
            some: {
              academic_year: currentYear,
            },
          },
          exams: {
            some: {
              academic_year: currentYear,
            },
            every: {
              thesis_id: null,
            },
          },
        },
      });
      await ctx.cache.entries.ACTIVE_COURSES_WITH_EXAM_COUNT.set(String(count));
    },
    null,
    undefined,
    undefined,
    undefined,
    true,
  );
};

export const UpdateActiveCoursesWithThesisCount = (ctx: Context) => {
  return new CronJob(
    "0 0 * * * *",
    async () => {
      const currentYear = AcademicYear.currentYear().toString();
      const count = await ctx.prisma.common.course.count({
        where: {
          instances: {
            some: {
              academic_year: currentYear,
            },
          },
          exams: {
            some: {
              thesis_id: { not: null },
            },
          },
        },
      });
      await ctx.cache.entries.ACTIVE_COURSES_WITH_THESIS_COUNT.set(
        String(count),
      );
    },
    null,
    undefined,
    undefined,
    undefined,
    true,
  );
};
