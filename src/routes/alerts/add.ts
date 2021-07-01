import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { Body } from "node-fetch";
import * as z from "zod";

const body_schema = z.object({
  start: z.date(),
  end: z.date(),
  message: z.string(),
  color: z.string(),
});

export default {
  method: Method.POST,
  path: "/alerts",
  auth: ["admin"],

  handler: async (
    { headers, body: unparsed_body }: Request,
    { prisma, config }: Context,
  ): Promise<Response> => {
    const body = body_schema.parse(unparsed_body);
    await prisma.alerts.create({
      data: {
        start: body.start,
        end: body.end,
        message: body.message,
        color: body.color,
      },
    });
    return Ok({});
  },
};
