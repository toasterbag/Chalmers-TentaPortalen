import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/course/:code/surveys",

  handler: async (
    { params }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const { code } = params;
    const data = await prisma.survey.findMany({
      where: { course_code: code.toUpperCase() },
      include: {
        instance: {
          select: { examiner_cid: true },
        },
      },
      orderBy: [{ academic_year: "asc" }, { start_period: "asc" }],
    });

    return Ok(data);
  },
};
