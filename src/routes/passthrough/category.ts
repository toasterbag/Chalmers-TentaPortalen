import { passthrough_for_category } from "@app/analysis/passthrough";
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
      grade: query.grade ? Number(query.grade) : undefined,
    };
    const res = await passthrough_for_category(prisma, 1, filter);
    return Ok(res);
  },
};
