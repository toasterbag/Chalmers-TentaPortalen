import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/programme/:code/surveys",

  handler: async (
    { params }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const owner = params.code;
    const course_codes = await prisma.course.findMany({
      distinct: ["course_code"],
      where: { owner_code: owner },
      select: { course_code: true },
    });
    const data = await prisma.survey.groupBy({
      _avg: {
        prerequisite_mean: true,
        goals_mean: true,
        structure_mean: true,
        litterature_mean: true,
        assessment_mean: true,
        administration_mean: true,
        workload_mean: true,
        working_environment_mean: true,
        total_impression_mean: true,
      },
      where: {
        course_code: { in: course_codes.map((e) => e.course_code) },
      },
      by: ["academic_year"],
    });

    return Ok(data);
  },
};
