import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { copyFile } from "fs-extra";

import importData from "@app/import/exams_stats";
import { Role } from "@prisma/client";

export default {
  method: Method.PUT,
  path: "/datasheet",
  uploads: {
    datasheet: "single",
  },
  auth: [Role.Admin],

  handler: async ({ file }: Request, ctx: Context): Promise<Response> => {
    if (file) {
      await copyFile(file.path, ctx.config.paths.exam_sheet_temp);
      importData(ctx);
    }

    return Ok({});
  },
};
