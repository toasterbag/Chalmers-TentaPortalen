import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { Body } from "node-fetch";
import * as z from "zod";

export default {
  method: Method.GET,
  path: "/course/:code",

  handler: async (
    { params }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const code = params.code;
    const data = await prisma.course.findFirst({
      where: {
        course_code: code.toUpperCase(),
      },
    });

    return Ok(data);
  },
};
