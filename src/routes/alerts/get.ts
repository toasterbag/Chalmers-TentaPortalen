import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { Body } from "node-fetch";
import * as z from "zod";

export default {
  method: Method.GET,
  path: "/alerts",

  handler: async (req: Request, { prisma }: Context): Promise<Response> => {
    const alerts = await prisma.alerts.findMany({
      where: {
        start: {
          gte: new Date(),
        },
        end: {
          lte: new Date(),
        },
      },
    });
    return Ok(alerts);
  },
};
