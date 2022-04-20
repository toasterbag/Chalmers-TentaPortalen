import { isDefined } from "@app/utils";
import { Electivity, PrismaClient } from "@prisma/client";

export const survey_results_for_programme = async (
  prisma: PrismaClient,
  programme_code: string,
  start_period: number,
  end_period: number,
  grade: number,
): Promise<Map<string, number | undefined>> => {
  // const where: Where = {};
  // if ("programme_codes" in params) {
  //   where.programme_code = {
  //     in: params.programme_codes,
  //   };
  // } else if ("programme_category" in params) {
  //   where.programme_code = {
  //     startsWith: params.programme_category,
  //   };
  // }

  const data = await prisma.programmePlanEntry.findMany({
    where: {
      programme_code,
      grade,
      electivity: Electivity.Compulsory,
      course_instance: {
        start_period: {
          lte: start_period,
        },
        end_period: {
          lte: end_period,
        },
      },
    },
    select: {
      course_code: true,
      programme_instance: true,
      course_instance: {
        select: {
          survey: true,
        },
      },
    },
  });

  const normalized = data.map((entry) => ({
    admission_year: entry.programme_instance.admission_year,
    programme_code: entry.programme_instance.programme_code,
    course_code: entry.course_code,
    survey: entry.course_instance.survey,
  }));

  const t2 = normalized.groupBy((e) => e.admission_year);

  const t3 = t2
    .map(([admission_year, courses]) => ({
      admission_year,
      total_impression: courses
        .map((c) => c.survey?.total_impression_mean)
        .filter(isDefined)
        .average(),
    }))
    .sortBy((a, b) => a.admission_year.localeCompare(b.admission_year))
    .filter((e) => e.total_impression !== 0)
    .reduce((map, { admission_year, total_impression }) => {
      map.set(admission_year, total_impression);
      return map;
    }, new Map());

  return t3;
};

export interface PassthroughFilter {
  assessment_kind?: string;
  programme_category?: string;
  programmes?: Array<string>;
  grade: number;
  start_period: number;
  end_period: number;
}

export const survey_results_for_category = async (
  prisma: PrismaClient,
  filters: PassthroughFilter,
) => {
  const programmes = await prisma.programmeInstance.findMany({
    select: {
      programme_code: true,
    },
    where: {
      admission_year: "2021/2022",
      programme_code: {
        contains: filters?.programme_category,
        in: filters?.programmes,
      },
    },
  });
  const t1 = await Promise.all(
    programmes
      .map((e) => e.programme_code)
      .map(async (code) => ({
        label: code,
        result: await survey_results_for_programme(
          prisma,
          code,
          filters.start_period,
          filters.end_period,
          filters.grade,
        ),
      })),
  );
  // console.log(t1);
  const years = t1
    .flatMap((e) => Array.from(e.result.keys()))
    .sortBy((a, b) => a.localeCompare(b))
    .unique();

  for (const p of t1) {
    for (const key of years) {
      if (!p.result.has(key)) p.result.set(key, undefined);
    }
  }

  const data = t1.map((p) => ({
    label: p.label,
    data: Array.from(p.result.entries())
      .sortBy(([a], [b]) => a.localeCompare(b))
      .map(([, x]) => x),
  }));

  return { labels: years, data };
};
