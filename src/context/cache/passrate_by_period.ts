import { Exam, Programme } from ".prisma/client";
import { Context } from "@app/context";
import { Cache } from "@app/context/cache";
import { differenceInHours, Interval, isWithinInterval } from "date-fns";

// This could probably be optimized and ran directly as SQL but its only updated at most every month
// and takes less than a minute to run on my computer

interface ExamStatistics {
  failed: number;
  three: number;
  four: number;
  five: number;
}

interface ExamCollection {
  sp_1_exams: ExamStatistics;
  sp_2_exams: ExamStatistics;
  sp_3_exams: ExamStatistics;
  sp_4_exams: ExamStatistics;

  august_re_exams: ExamStatistics;
  october_re_exams: ExamStatistics;
  january_re_exams: ExamStatistics;
  easter_re_exams: ExamStatistics;
  june_re_exams: ExamStatistics;
}

export type CacheType = Cache<ExamCollection>;

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
      (count: ExamStatistics, exam: Exam) => {
        count.failed += exam.failed;
        count.three += exam.three;
        count.four += exam.four;
        count.five += exam.five;
        return count;
      },
      { failed: 0, three: 0, four: 0, five: 0 },
    );
};

const updater = async (ctx: Context): Promise<ExamCollection> => {
  const exams = await ctx.prisma.exam.findMany({});
  return {
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
};

const wasOverOneDayAgo = (t: Date) => differenceInHours(t, new Date()) >= 24;

export const gen_cache = (ctx: Context): CacheType =>
  new Cache({
    title: "Passrate by exam period",
    // I know this is horrible
    initial: {
      sp_1_exams: {
        failed: 0,
        three: 0,
        four: 0,
        five: 0,
      },
      sp_2_exams: {
        failed: 0,
        three: 0,
        four: 0,
        five: 0,
      },
      sp_3_exams: {
        failed: 0,
        three: 0,
        four: 0,
        five: 0,
      },
      sp_4_exams: {
        failed: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      august_re_exams: {
        failed: 0,
        three: 0,
        four: 0,
        five: 0,
      },
      october_re_exams: {
        failed: 0,
        three: 0,
        four: 0,
        five: 0,
      },
      january_re_exams: {
        failed: 0,
        three: 0,
        four: 0,
        five: 0,
      },
      easter_re_exams: {
        failed: 0,
        three: 0,
        four: 0,
        five: 0,
      },
      june_re_exams: {
        failed: 0,
        three: 0,
        four: 0,
        five: 0,
      },
    },
    updater,
    shouldUpdate: wasOverOneDayAgo,
    ctx,
  });
