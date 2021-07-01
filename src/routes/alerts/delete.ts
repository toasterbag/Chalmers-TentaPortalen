import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { Body } from "node-fetch";
import * as z from "zod";

export default {
  method: Method.DELETE,
  path: "/alerts/:id",
  auth: ["admin"],

  handler: async (
    { params }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const alerts = await prisma.alerts.delete({
      where: {
        id: Number(params.id),
      },
    });
    return Ok(alerts);
  },
};
