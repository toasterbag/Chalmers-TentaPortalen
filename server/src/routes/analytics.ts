import Context from "../context";
import { Endpoint, Method, Response, Ok } from "../server";
import { Request } from "express";
import { Body } from "node-fetch";

export class Log implements Endpoint<Context> {
  method = Method.POST;
  path = "/api/doit";

  async handler(
    { headers, body }: Request,
    { prisma }: Context
  ): Promise<Response> {
    let ip: any = headers["x-forwarded-for"] ?? "anonymous";
    if (!body.cookie) {
      body.cookie = "anonymous";
      ip = "anonymous";
    }
    await prisma.log.create({
      data: {
        timestamp: undefined,
        page: body.page ?? "unknown",
        event: body.event ?? "unknown",
        data: body.data ?? "None",
        cookie: body.cookie,
        ip,
      },
    });

    return Ok("");
  }
}

export default [Log];
