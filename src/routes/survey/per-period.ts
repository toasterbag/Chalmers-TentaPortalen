import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/surveys/by-period",

  handler: async (
    req: Request,
    { cache }: Context,
  ): Promise<Response> => {
    return Ok(await cache.survey_by_period.get());
  },
};
