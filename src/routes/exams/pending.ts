import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/exams/pending",
  auth: ["admin"],

  handler: async (_: Request, { prisma }: Context): Promise<Response> => {
    const where = {
      OR: [
        {
          thesis: {
            verified: {
              equals: false,
            },
          },
        },
        {
          solution: {
            verified: {
              equals: false,
            },
          },
        },
      ],
    };
    const exams = await prisma.common.exam.findMany({
      where,
      include: {
        thesis: true,
        solution: true,
      },
    });

    const count = await prisma.common.exam.count({
      where,
    });

    return Ok({ count, exams });
  },
};
