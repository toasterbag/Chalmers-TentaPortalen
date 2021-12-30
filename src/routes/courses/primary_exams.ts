import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/course/:code/exams/primary",

  handler: async (
    { params }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const { code } = params;
    const dates = await prisma.courseModule.findMany({
      where: {
        kind: "Tentamen",
        dates: {
          isNot: undefined,
        },
        course_instance: {
          course_code: code.toUpperCase(),
        },
      },
      select: {
        dates: {
          select: {
            primary_date: true,
          },
        },
      },
    });

    const primary_exams = await prisma.exam.findMany({
      where: {
        course_code: code.toUpperCase(),
        date: { in: dates.map((mod) => mod.dates?.primary_date ?? "") },
      },
      orderBy: {
        date: "asc",
      },
    });

    return Ok(primary_exams);
  },
};
