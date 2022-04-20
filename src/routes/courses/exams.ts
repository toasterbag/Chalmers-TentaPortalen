import { Context } from "@app/context";
import { computePerformanceFields } from "@app/prisma/exam";
import { Method, Response, Ok } from "@app/server";
import { AcademicYear } from "@app/utils";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/course/:code/exams",

  handler: async (
    { params, query }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const { code } = params;
    const exams = (
      await prisma.exam.findMany({
        where: {
          course_code: code.toUpperCase(),
        },
        include: {
          thesis: true,
          solution: true,
        },
        orderBy: { date: "desc" },
      })
    ).map(computePerformanceFields);

    if (query.onlyPrimaries === "true") {
      const examsByYear = exams.groupBy((e: { date: string }) =>
        AcademicYear.from_date(new Date(e.date)).toString(),
      );

      return Ok(
        examsByYear.map(([, examsInYear]) =>
          examsInYear.reduce((a, b) => (a.total > b.total ? a : b), {
            total: 0,
          }),
        ),
      );
    }

    return Ok(exams);
  },
};
