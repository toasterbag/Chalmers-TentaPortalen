import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/metrics/visitors",

  handler: async (req: Request, { prisma }: Context): Promise<Response> => {
    const data = await prisma.$queryRaw`
    SELECT timestamp::date AS date, COUNT(DISTINCT cookie) as count
    FROM log
    WHERE 
      timestamp BETWEEN 
      now() - interval '30 days' AND now()
    GROUP BY date
    ORDER BY date ASC;`;
    return Ok(data);
  },
};
