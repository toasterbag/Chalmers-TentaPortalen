import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/admin/status",
  auth: ["admin"],

  handler: async (
    { body }: Request,
    { status }: Context,
  ): Promise<Response> => {
    return Ok(status);
  },
};
