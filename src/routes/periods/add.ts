import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import * as z from "zod";

const body_schema = z.object({
  type: z.string(),
  study_period: z.number(),
  academic_year: z.string(),
  start: z.string().transform((e) => new Date(e)),
  end: z.string().transform((e) => new Date(e)),
});

export default {
  method: Method.POST,
  path: "/periods",
  auth: ["admin"],

  handler: async (
    { body: unparsed_body }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const body = body_schema.parse(unparsed_body);
    return Ok(
      await prisma.period.create({
        data: body,
      }),
    );
  },
};
