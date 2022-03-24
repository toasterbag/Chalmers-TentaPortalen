import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/course/:code/modules",

  handler: async (
    { params }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const { code } = params;
    const res = await prisma.moduleResult.findMany({
      where: {
        course_code: code,
      },
      distinct: ["module_id"],
      orderBy: {
        module_id: "asc",
      },
    });

    return Ok(res);
  },
};
