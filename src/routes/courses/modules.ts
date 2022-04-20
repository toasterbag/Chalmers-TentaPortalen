import { Context } from "@app/context";
import { computePerformanceFields } from "@app/prisma/exam";
import { Method, Response, Ok } from "@app/server";
import { AcademicYear } from "@app/utils";
import { Request } from "express";

type AssessmentResult = {
  date: string;
  academic_year: string;
  failed: number;
  three: number;
  four: number;
  five: number;
  total: number;
  percent: {
    failed: number;
    three: number;
    four: number;
    five: number;
  };
};

const filterFollowupExams = (
  results: Array<AssessmentResult>,
  filter: boolean,
) => {
  if (filter) {
    const resultsByYear = results.groupBy((e: { date: string }) =>
      AcademicYear.from_date(new Date(e.date)).toString(),
    );

    return resultsByYear.map(([, resultsInYear]) =>
      resultsInYear.reduce((a, b) => (a.total > b.total ? a : b)),
    );
  }
  return results;
};

export default {
  method: Method.GET,
  path: "/course/:code/modules",

  handler: async (
    { params, query }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const { code } = params;
    const modules = (
      await prisma.moduleResult.findMany({
        where: {
          course_code: code,
        },
        orderBy: {
          module_id: "asc",
        },
      })
    ).map(computePerformanceFields);

    const res = modules
      .groupBy((m) => m.module_id)
      .reduce((map, [id, assessments]) => {
        const { name, module_id, grading_system, points } = assessments[0];
        map.set(id, {
          name,
          module_id,
          grading_system,
          points,
          results: filterFollowupExams(
            assessments.map(
              ({
                academic_year,
                failed,
                three,
                four,
                five,
                percent,
                total,
                date,
              }) => ({
                academic_year,
                failed,
                three,
                four,
                five,
                total,
                percent,
                date,
              }),
            ),
            query.onlyPrimaries === "true",
          ).sortBy((a, b) => b.date.localeCompare(a.date)),
        });
        return map;
      }, new Map());

    return Ok(Array.from(res.values()));
  },
};
