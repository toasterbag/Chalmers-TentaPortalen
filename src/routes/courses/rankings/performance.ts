import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import * as z from "zod";
import { Electivity } from "@prisma/client";

const query_schema = z.object({
  programme: z
    .string()
    .optional()
    .transform((s) => (s === "" ? undefined : s)),
  academic_year: z.string(),
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
  path: "/courses/rankings/performance",

  handler: async (
    { query: unparsed_query }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const { programme, academic_year, programme_plan, electivity } =
      query_schema.parse(unparsed_query);

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

    const data = (
      await prisma.exam.findMany({
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

            ...wheres,
          ],
        },
        orderBy: {
          date: "asc",
        },
      })
    )
      .groupBy((e) => e.course_code)
      .map(([, exams]) =>
        exams.sortBy((a, b) => b.date.localeCompare(a.date)).first(),
      );

    return Ok(data);
  },
};
