import { Electivity, PrismaClient } from "@prisma/client";
import { HST, Result } from "./passrate";

export const passthrough_for_programme = async (
  prisma: PrismaClient,
  programme_code: string,
  until_period: number,
  grade: number,
  assessment_kind: string | undefined,
): Promise<Map<string, { result: Result; hst: HST } | undefined>> => {
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
          lte: until_period,
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
    modules:
      assessment_kind !== undefined
        ? // Filter out certain kinds of exams
          entry.course_instance.modules.filter(
            (mod) => mod.kind === assessment_kind,
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
          orderBy: { date: "asc" },
        }),
      ),
    ),
  }));

  const t2 = (await Promise.all(t1)).groupBy((e) => e.admission_year);

  const t3 = Object.entries(t2)
    .map(([admission_year, courses]) => {
      const only_primaries = courses
        .map((course) => course.results.map((mod) => mod[0]))
        .flat();

      return {
        admission_year,
        total_hst: only_primaries
          .map(({ points, failed, three, four, five }) => ({
            points,
            result: new Result(failed, three, four, five),
          }))
          .map(({ points, result }) => points * result.total)
          .reduce((a, b) => a + b, 0),
        fulfilled_hst: courses
          .map((c) => c.results)
          .flat()
          .flat()
          .map(({ points, failed, three, four, five }) => ({
            points,
            result: new Result(failed, three, four, five),
          }))
          .map(({ points, result }) => ({
            total: points * result.total,
            passed: points * result.passed,
          }))
          .reduce(
            (a, b) => ({
              total: a.total + b.total,
              passed: a.passed + b.passed,
            }),
            { total: 0, passed: 0 },
          ),
      };
    })
    .sortBy((a, b) => a.admission_year.localeCompare(b.admission_year))
    .reduce((map, { admission_year, fulfilled_hst, total_hst }) => {
      map.set(admission_year, { fulfilled_hst, total_hst });
      return map;
    }, new Map());

  return t3;
};
