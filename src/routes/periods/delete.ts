import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import * as z from "zod";

const query_schema = z.object({
  type: z.string(),
  academic_year: z.string(),
  study_period: z.number(),
});

export default {
  method: Method.DELETE,
  path: "/periods",
  auth: ["admin"],

  handler: async (
    { query: unparsed_query }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const query = query_schema.parse(unparsed_query);
    return Ok(
      await prisma.period.delete({
        where: {
          type_academic_year_study_period: query,
        },
      }),
    );
  },
};
