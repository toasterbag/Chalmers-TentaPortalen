import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/feedback",
  auth: ["admin"],

  handler: async (_: Request, { prisma }: Context): Promise<Response> => {
    return Ok(await prisma.feedback.findMany({}));
  },
};
