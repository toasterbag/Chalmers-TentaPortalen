import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { Body } from "node-fetch";
import * as z from "zod";

export default {
  method: Method.GET,
  path: "/exams/pending",
  auth: ["admin"],

  handler: async (
    { params }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
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
    const exams = await prisma.exam.findMany({
      where,
      include: {
        thesis: true,
        solution: true,
      },
    });

    const count = await prisma.exam.count({
      where,
    });

    return Ok({ count, exams });
  },
};
