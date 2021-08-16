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

export type CacheType = Cache<Map<string, ExamCollection>>;

const get_dates = async (
  ctx: Context,
  is_exam: boolean,
  study_period: number,
  year: string,
) => {
  return ctx.prisma.period.findMany({
    select: {
      start: true,
      end: true,
    },
    where: {
      type: is_exam ? "Exam period" : "Re-exam period",
      study_period,
      academic_year: year,
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

const get_by_year = async (
  ctx: Context,
  exams: any,
  year: string,
): Promise<ExamCollection> => {
  return {
    sp_1_exams: filter_exams(await get_dates(ctx, true, 1, year), exams),
    sp_2_exams: filter_exams(await get_dates(ctx, true, 2, year), exams),
    sp_3_exams: filter_exams(await get_dates(ctx, true, 3, year), exams),
    sp_4_exams: filter_exams(await get_dates(ctx, true, 4, year), exams),

    august_re_exams: filter_exams(await get_dates(ctx, false, 0, year), exams),
    october_re_exams: filter_exams(await get_dates(ctx, false, 1, year), exams),
    january_re_exams: filter_exams(await get_dates(ctx, false, 2, year), exams),
    easter_re_exams: filter_exams(await get_dates(ctx, false, 3, year), exams),
    june_re_exams: filter_exams(await get_dates(ctx, false, 4, year), exams),
  };
};

const updater = async (ctx: Context): Promise<Map<string, ExamCollection>> => {
  const exams = await ctx.prisma.exam.findMany({});
  const pairs = await Promise.all(
    ["2018/2019"].map((y) => [y, get_by_year(ctx, exams, y)]),
  );
  return new Map(pairs as Array<[string, ExamCollection]>);
};

const wasOverOneDayAgo = (t: Date) => differenceInHours(t, new Date()) >= 24;

export const gen_cache = (ctx: Context): CacheType =>
  new Cache({
    title: "Passrate by exam period and year",
    // I know this is horrible
    initial: new Map(),
    updater,
    shouldUpdate: wasOverOneDayAgo,
    ctx,
  });
