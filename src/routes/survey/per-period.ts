import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/surveys/by-period",

  handler: async (
    req: Request,
    { redis_cache }: Context,
  ): Promise<Response> => {
    return Ok(await redis_cache.survey_by_period.get());
  },
};
