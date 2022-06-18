import { Context } from "@app/context";
import { CronJob } from "cron";
import { isWithinInterval } from "date-fns";
import { Exam } from "@app/prisma/clients/common";

interface ExamStatistics {
  failed: number;
  three: number;
  four: number;
  five: number;
}

const getDates = async (
  ctx: Context,
  is_exam: boolean,
  study_period: number,
) => {
  return ctx.prisma.common.period.findMany({
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

const filterExams = (dates: Array<Interval>, exams: any): ExamStatistics => {
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
      const exams = await ctx.prisma.common.exam.findMany({});
      const all = {
        sp_1_exams: filterExams(await getDates(ctx, true, 1), exams),
        sp_2_exams: filterExams(await getDates(ctx, true, 2), exams),
        sp_3_exams: filterExams(await getDates(ctx, true, 3), exams),
        sp_4_exams: filterExams(await getDates(ctx, true, 4), exams),

        august_re_exams: filterExams(await getDates(ctx, false, 0), exams),
        october_re_exams: filterExams(await getDates(ctx, false, 1), exams),
        january_re_exams: filterExams(await getDates(ctx, false, 2), exams),
        easter_re_exams: filterExams(await getDates(ctx, false, 3), exams),
        june_re_exams: filterExams(await getDates(ctx, false, 4), exams),
      };
      await ctx.cache.passrate_by_period.set(JSON.stringify(all));
    },
    null,
    undefined,
    undefined,
    undefined,
    true,
  );
};
