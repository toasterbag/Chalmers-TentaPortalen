import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/updated",

  handler: async (_: Request, { prisma }: Context): Promise<Response> => {
    const last_exam = await prisma.common.exam.findFirst({
      orderBy: {
        date: "desc",
      },
    });
    return Ok({ timestamp: last_exam?.date });
  },
};
