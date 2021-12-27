import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/course/:code",

  handler: async (
    { params }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const { code } = params;
    const data = await prisma.course.findFirst({
      where: {
        course_code: code.toUpperCase(),
      },
      include: {
        department: true,
        owner: true,
        instances: {
          take: 1,
          orderBy: {
            academic_year: "desc",
          },
        },
      },
    });

    return Ok(data);
  },
};
