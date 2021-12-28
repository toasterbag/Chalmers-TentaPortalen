import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

import { scrape_everything } from "@app/import/study_portal";

export default {
  method: Method.GET,
  path: "/admin/material/scan",
  auth: ["admin"],

  handler: async (_: Request, ctx: Context): Promise<Response> => {
    scrape_everything(ctx);

    return Ok({});
  },
};
