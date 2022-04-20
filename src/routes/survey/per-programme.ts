import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/survey/per-programme",

  handler: async (
    req: Request,
    { redis_cache }: Context,
  ): Promise<Response> => {
    const res = await redis_cache.programme_survey_aggregate.all();
    for (const key of Object.keys(res)) {
      res[key] = JSON.parse(res[key]);
    }
    return Ok(res);
  },
};
