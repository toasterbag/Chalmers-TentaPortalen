import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { Body } from "node-fetch";
import * as z from "zod";

export default {
  method: Method.GET,
  path: "/course/:code/survey",

  handler: async (
    { params }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const code = params.code;
    const data = await prisma.survey.findMany({
      where: { course_code: code.toUpperCase() },
      orderBy: [{ academic_year: "asc" }, { start_period: "asc" }],
    });

    return Ok(data);
  },
};
