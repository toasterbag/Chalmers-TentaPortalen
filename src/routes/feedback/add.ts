import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import * as z from "zod";

const body_schema = z.object({
  email: z.string().optional(),
  message: z.string(),
});

export default {
  method: Method.POST,
  path: "/feedback",

  handler: async (
    { body: unparsed_body }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const body = body_schema.parse(unparsed_body);
    await prisma.feedback.create({
      data: {
        email: body.email ?? "anonymous",
        message: body.message,
      },
    });
    return Ok({});
  },
};
