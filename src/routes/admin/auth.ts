import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { copyFile } from "fs-extra";
import * as z from "zod";

export default {
  method: Method.POST,
  path: "/auth",
  auth: ["admin"],

  handler: async (
    { body }: Request,
    { config }: Context,
  ): Promise<Response> => {
    return Ok({});
  },
};
