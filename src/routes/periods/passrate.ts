import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/periods/passrate",

  handler: async (
    req: Request,
    { redis_cache }: Context,
  ): Promise<Response> => {
    const res = await redis_cache.passrate_by_period.get();
    return Ok(res).set_content_type("application/json");
  },
};
