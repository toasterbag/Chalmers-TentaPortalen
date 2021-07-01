import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { Body } from "node-fetch";
import * as z from "zod";

const query_schema = z.object({
  programme: z
    .string()
    .optional()
    .transform((s) => (s == "" ? undefined : s)),
  academic_year: z.string(),
  min_responses: z
    .string()
    .optional()
    .transform(Number)
    .transform((n) => (isNaN(n) ? undefined : n)),
  max_responses: z
    .string()
    .optional()
    .transform(Number)
    .transform((n) => (isNaN(n) ? undefined : n)),
});

export default {
  method: Method.GET,
  path: "/courses/search",

  handler: async (
    { query: unparsed_query }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const {
      programme,
      academic_year,
      min_responses,
      max_responses,
    } = query_schema.parse(unparsed_query);

    const data = await prisma.survey.findMany({
      where: {
        AND: [
          {
            academic_year,
          },
          {
            course: {
              owner_code: programme,
            },
          },
          {
            responses: {
              gte: min_responses,
            },
          },
          {
            responses: {
              lte: max_responses,
            },
          },
        ],
      },
      orderBy: {
        total_impression_mean: "asc",
      },
    });

    return Ok(data);
  },
};
