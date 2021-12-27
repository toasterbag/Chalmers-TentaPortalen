import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.POST,
  path: "/doit",

  handler: async (
    { headers, body }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const ip = headers["x-forwarded-for"] ?? "anonymous";
    const cookie = body.token ?? "anonymous";

    await prisma.pageViews.create({
      data: {
        page: body.page ?? "unknown",
        event: body.event ?? "unknown",
        data: body.data ?? "None",
        cookie,
        ip: Array.isArray(ip) ? ip[0] : ip,
      },
    });

    return Ok({});
  },
};
