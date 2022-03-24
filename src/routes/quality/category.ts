import { passrate_for_category } from "@app/analysis/passrate";
import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/passthrough/category",

  handler: async (
    { query }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const filter = {
      programmes: query.programmes
        ? JSON.parse(String(query.programmes))
        : undefined,
      programme_category: query.programme_category
        ? String(query.programme_category)
        : undefined,
      assessment_kind: query.assessment_kind
        ? String(query.assessment_kind)
        : undefined,

      start_period: query.start_period ? Number(query.start_period) : 1,

      end_period: query.end_period ? Number(query.end_period) : 1,

      grade: query.grade ? Number(query.grade) : 1,
    };
    const res = await passrate_for_category(prisma, filter);
    return Ok(res);
  },
};
