import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/programmes/search",

  handler: async (_: Request, { cache }: Context): Promise<Response> => {
    const academic_year = "2020/2021";

    return Ok((await cache.programmes_by_year.get())[academic_year]);
  },
};
