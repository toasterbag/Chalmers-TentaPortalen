import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { Body } from "node-fetch";
import * as z from "zod";

export default {
  method: Method.POST,
  path: "/doit",

  handler: async (
    { headers, body }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    let ip: any = headers["x-forwarded-for"] ?? "anonymous";
    if (!body.token) {
      body.token = "anonymous";
      ip = "anonymous";
    }

    await prisma.log.create({
      data: {
        page: body.page ?? "unknown",
        event: body.event ?? "unknown",
        data: body.data ?? "None",
        cookie: body.token,
        ip,
      },
    });

    return Ok({});
  },
};
