import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { Body } from "node-fetch";
import * as z from "zod";

export default {
  method: Method.GET,
  path: "/periods",

  handler: async (
    { params }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    return Ok(await prisma.period.findMany({}));
  },
};
