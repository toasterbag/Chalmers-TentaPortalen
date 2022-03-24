import { Electivity, PrismaClient } from "@prisma/client";

// type ProgrammeCategory = "TK" | "TI" | "TS" | "MP";

// interface BaseParameters {
//   grade?: number;
// }

// interface WithProgrammes {
//   // Programme codes such as "TKDAT"
//   programme_codes: Array<string> | undefined;
// }

// interface WithCategory {
//   // Programme category such as "TK" or "TI"
//   programme_category: ProgrammeCategory | undefined;
// }

// type EitherCategoryOrProgrammes =
//   | (BaseParameters & WithProgrammes)
//   | (BaseParameters & WithCategory);

// type Parameters = EitherCategoryOrProgrammes;

// type Where = {
//   programme_code?: {
//     in?: Array<string>;
//     startsWith?: ProgrammeCategory;
//   };
// };

class Result {
  failed: number;

  threes: number;

  fours: number;

  fives: number;

  constructor(failed: number, threes: number, fours: number, fives: number) {
    this.failed = failed;
    this.threes = threes;
    this.fours = fours;
    this.fives = fives;
  }

  combine(other: Result) {
    const failed = this.failed + other.failed;
    const threes = this.threes + other.threes;
    const fours = this.fours + other.fours;
    const fives = this.fives + other.fives;
    return new Result(failed, threes, fours, fives);
  }

  get percent_failed() {
    return this.failed / this.total;
  }

  get percent_passed() {
    return this.passed / this.total;
  }

  get passed() {
    return this.threes + this.fours + this.fives;
  }

  get total() {
    return this.failed + this.passed;
  }
}

export const passthrough_for_programme = async (
  prisma: PrismaClient,
  programme_code: string,
  until_period: number,
  grade: number,
  assesment_kind?: string,
): Promise<Map<string, Result | undefined>> => {
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
          lte: until_period,
        },
        end_period: {
          gte: until_period,
        },
      },
    },
    select: {
      course_code: true,
      programme_instance: true,
      course_instance: {
        select: {
          modules: {
            select: {
              module_id: true,
              kind: true,
            },
          },
        },
      },
    },
  });

  const normalized = data.map((entry) => ({
    admission_year: entry.programme_instance.admission_year,
    programme_code: entry.programme_instance.programme_code,
    course_code: entry.course_code,
    modules: assesment_kind
      ? // Filter out certain kinds of exams
        entry.course_instance.modules.filter(
          (mod) => mod.kind === assesment_kind,
        )
      : entry.course_instance.modules,
  }));

  const t1 = normalized.map(async (entry) => ({
    ...entry,
    results: await Promise.all(
      entry.modules.map((module) =>
        prisma.moduleResult.findMany({
          where: {
            module_id: module.module_id,
            course_code: entry.course_code,
            academic_year: entry.admission_year,
          },
        }),
      ),
    ),
  }));

  const t2 = (await Promise.all(t1)).groupBy((e) => e.admission_year);

  const t3 = Object.entries(t2)
    .map(([admission_year, courses]) => ({
      admission_year,
      result: courses
        .map((c) => c.results)
        .flat()
        .flat()
        .map((e) => new Result(e.failed, e.three, e.four, e.five))
        .reduce((a, b) => a.combine(b), new Result(0, 0, 0, 0)),
    }))
    .sortBy((a, b) => a.admission_year.localeCompare(b.admission_year))
    .filter((x) => x.result.total !== 0)
    .reduce((map, { admission_year, result }) => {
      map.set(admission_year, result);
      return map;
    }, new Map());

  return t3;
};

export interface PassthroughFilter {
  assesment_kind?: string;
  programme_category?: string;
  programmes?: Array<string>;
  grade?: number;
}

export const passthrough_for_category = async (
  prisma: PrismaClient,
  until_period: number,
  filters?: PassthroughFilter,
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
        result: await passthrough_for_programme(
          prisma,
          code,
          until_period,
          filters?.grade ?? 1,
          filters?.assesment_kind,
        ),
      })),
  );
  const years = t1
    .flatMap((e) => Array.from(e.result.keys()))
    .sortBy((a, b) => a.localeCompare(b))
    .unique();

  for (const p of t1) {
    for (const key of years) {
      if (!p.result.has(key)) p.result.set(key, undefined);
    }
  }

  const total = t1
    .map((e) => e.result)
    .reduce((map, next) => {
      for (const [key, val] of next.entries()) {
        if (!map.has(key)) map.set(key, new Result(0, 0, 0, 0));
        if (val !== undefined) {
          map.set(key, map.get(key).combine(val));
        }
      }
      return map;
    }, new Map());
  t1.push({
    label: "Average",
    result: total,
  });

  const data = t1.map((p) => ({
    label: p.label,
    data: Array.from(p.result.entries())
      .sortBy(([a], [b]) => a.localeCompare(b))
      .map(([, x]) => x)
      .map((r) => (r !== undefined ? r.percent_passed : r)),
  }));
  return { labels: years, data };
};
