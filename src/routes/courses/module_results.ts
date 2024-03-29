import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/course/:code/module/:id",

  handler: async (
    { params }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const { code, id } = params;
    const res = await prisma.moduleResult.findMany({
      where: {
        course_code: code,
        module_id: id,
      },
    });

    return Ok(res);
  },
};
