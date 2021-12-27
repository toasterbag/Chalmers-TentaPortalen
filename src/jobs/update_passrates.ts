import { Context } from "@app/context";
import { CronJob } from "cron";
import { isWithinInterval } from "date-fns";
import { Exam } from "@prisma/client";

interface ExamStatistics {
  failed: number;
  three: number;
  four: number;
  five: number;
}

const get_dates = async (
  ctx: Context,
  is_exam: boolean,
  study_period: number,
) => {
  return ctx.prisma.period.findMany({
    select: {
      start: true,
      end: true,
    },
    where: {
      type: is_exam ? "Exam period" : "Re-exam period",
      study_period,
    },
  });
};

const filter_exams = (dates: Array<Interval>, exams: any): ExamStatistics => {
  return exams
    .filter((exam: Exam) => {
      for (const { start, end } of dates) {
        if (isWithinInterval(new Date(exam.date), { start, end })) {
          return true;
        }
      }
      return false;
    })
    .reduce(
      (count: ExamStatistics, exam: Exam) => ({
        failed: count.failed + exam.failed,
        three: count.three + exam.three,
        four: count.four + exam.four,
        five: count.five + exam.five,
      }),
      { failed: 0, three: 0, four: 0, five: 0 },
    );
};

export default (ctx: Context) => {
  return new CronJob(
    "0 0 0 * * *",
    async function RenewPassrateByPeriodCache() {
      const exams = await ctx.prisma.exam.findMany({});
      const all = {
        sp_1_exams: filter_exams(await get_dates(ctx, true, 1), exams),
        sp_2_exams: filter_exams(await get_dates(ctx, true, 2), exams),
        sp_3_exams: filter_exams(await get_dates(ctx, true, 3), exams),
        sp_4_exams: filter_exams(await get_dates(ctx, true, 4), exams),

        august_re_exams: filter_exams(await get_dates(ctx, false, 0), exams),
        october_re_exams: filter_exams(await get_dates(ctx, false, 1), exams),
        january_re_exams: filter_exams(await get_dates(ctx, false, 2), exams),
        easter_re_exams: filter_exams(await get_dates(ctx, false, 3), exams),
        june_re_exams: filter_exams(await get_dates(ctx, false, 4), exams),
      };
      await ctx.redis_cache.passrate_by_period.set(JSON.stringify(all));
    },
    null,
    undefined,
    undefined,
    undefined,
    true,
  );
};
