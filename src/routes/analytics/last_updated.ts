import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/updated",

  handler: async (_: Request, { cache }: Context): Promise<Response> => {
    return Ok({ timestamp: await cache.last_updated.get() });
  },
};
