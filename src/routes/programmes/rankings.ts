import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/programmes/rankings",

  handler: async (
    { query }: Request,
    { cache }: Context,
  ): Promise<Response> => {
    const academicYear = query.academic_year ?? "2020/2021";

    return Ok((await cache.programmes_by_year.get())[academicYear as any]);
  },
};
