import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import * as z from "zod";
import { Electivity } from "@prisma/client";

const querySchema = z.object({
  owner: z
    .string()
    .optional()
    .transform((s) => (s === "" ? undefined : s)),
  academic_year: z.string(),
  min_responses: z
    .string()
    .optional()
    .transform(Number)
    .transform((n) => (Number.isNaN(n) ? undefined : n)),
  max_responses: z
    .string()
    .optional()
    .transform(Number)
    .transform((n) => (Number.isNaN(n) ? undefined : n)),
  programme_plan: z
    .string()
    .optional()
    .transform((s) => (s === "" ? undefined : s)),
  electivity: z
    .string()
    .optional()
    .transform((s) => (s === "" ? undefined : s))
    .transform((s) => {
      switch (s) {
        case "Elective":
          return Electivity.Elective;
        case "ElectiveCompulsory":
          return Electivity.ElectiveCompulsory;
        case "Compulsory":
          return Electivity.Compulsory;
      }
      return undefined;
    }),
});

export default {
  method: Method.GET,
  path: "/courses/rankings/survey",

  handler: async (
    { query: unparsed_query }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const {
      owner,
      academic_year,
      min_responses,
      max_responses,
      programme_plan,
      electivity,
    } = querySchema.parse(unparsed_query);

    const wheres = [];
    if (programme_plan) {
      const courses_in_plan = await prisma.programmePlanEntry.findMany({
        select: {
          course_code: true,
        },
        where: {
          programme_code: programme_plan,
          electivity,
        },
      });
      wheres.push({
        course_code: {
          in: courses_in_plan.map((e) => e.course_code),
        },
      });
    }

    const data = await prisma.survey.findMany({
      where: {
        AND: [
          {
            academic_year,
          },
          {
            course: {
              owner_code: owner,
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

          ...wheres,
        ],
      },
      orderBy: {
        total_impression_mean: "asc",
      },
    });

    return Ok(data);
  },
};
