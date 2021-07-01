import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { Body } from "node-fetch";
import * as z from "zod";

export default {
  method: Method.GET,
  path: "/updated",

  handler: async (
    { params }: Request,
    { cache }: Context,
  ): Promise<Response> => {
    return Ok({ timestamp: await cache.last_updated.get() });
  },
};
