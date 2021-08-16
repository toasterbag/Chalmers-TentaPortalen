import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { Body } from "node-fetch";
import * as z from "zod";

export default {
  method: Method.GET,
  path: "/periods/passrate/:start/:end",

  handler: async (
    { params }: Request,
    { cache }: Context,
  ): Promise<Response> => {
    return Ok(
      (await cache.passrate_by_period_and_year.get()).get(
        `${params.start}/${params.end}`,
      ),
    );
  },
};
