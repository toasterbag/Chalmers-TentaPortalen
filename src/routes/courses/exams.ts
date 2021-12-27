import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/course/:code/exams",

  handler: async (
    { params }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const { code } = params;
    const data = await prisma.exam.findMany({
      where: {
        course_code: code.toUpperCase(),
      },
      include: {
        thesis: true,
        solution: true,
      },
      orderBy: { date: "desc" },
    });

    return Ok(data);
  },
};
