import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/programme/:code/surveys",

  handler: async (
    { params }: Request,
    { redis_cache }: Context,
  ): Promise<Response> => {
    const owner = params.code;
    // const data = await prisma.survey.groupBy({
    //   _avg: {
    //     prerequisite_mean: true,
    //     goals_mean: true,
    //     structure_mean: true,
    //     teaching_mean: true,
    //     litterature_mean: true,
    //     assessment_mean: true,
    //     answer_frequency: true,
    //     administration_mean: true,
    //     workload_mean: true,
    //     working_environment_mean: true,
    //     total_impression_mean: true,
    //   },
    //   _count: {
    //     _all: true,
    //   },
    //   where: {
    //     course: {
    //       owner_code: owner,
    //     },
    //   },
    //   by: ["academic_year"],
    //   orderBy: {
    //     academic_year: "asc",
    //   },
    // });

    // return Ok(
    //   data.reduce((agg, next) => {
    //     return {
    //       ...agg,
    //       [next.academic_year]: {
    //         ...next._avg,
    //         count: next._count._all,
    //       },
    //     };
    //   }, {}),
    // );
    return Ok(await redis_cache.programme_survey_aggregate.get(owner));
  },
};
