import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { copyFile } from "fs-extra";
import * as z from "zod";

import importData from "@app/import/exams_stats";

export default {
  method: Method.PUT,
  path: "/datasheet",
  uploads: {
    datasheet: "single",
  },
  auth: ["admin"],

  handler: async (
    { headers, file }: Request,
    ctx: Context,
  ): Promise<Response> => {
    console.log(file);
    await copyFile(file.path, ctx.config.paths.exam_sheet_temp);
    importData(ctx);
    return Ok({});
  },
};
