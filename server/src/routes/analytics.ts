import Context from "../context";
import { Endpoint, Method, Response, Ok } from "../server";
import { Request } from "express";
import { Body } from "node-fetch";
import { isPostfixUnaryExpression } from "typescript";

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

    return Ok({});
  }
}

export class AddSuggestion implements Endpoint<Context> {
  method = Method.POST;
  path = "/api/feedback";

  async handler({ body }: Request, { prisma }: Context): Promise<Response> {
    await prisma.feedback.create({
      data: {
        id: undefined,
        timestamp: undefined,
        email: body.email ?? "anonymous",
        message: body.message,
      },
    });
    return Ok({});
  }
}

export class UniqueVisitorsLastMonth implements Endpoint<Context> {
  method = Method.GET;
  path = "/api/metrics/visitors";

  async handler({ params }: Request, { prisma }: Context): Promise<Response> {
    const data = await prisma.$queryRaw`
    SELECT timestamp::date AS date, COUNT(DISTINCT cookie) as count
    FROM log
    WHERE 
      timestamp BETWEEN 
      now() - interval '30 days' AND now()
    GROUP BY date
    ORDER BY date ASC;`;
    return Ok(data);
  }
}

export default [Log, AddSuggestion, UniqueVisitorsLastMonth];
