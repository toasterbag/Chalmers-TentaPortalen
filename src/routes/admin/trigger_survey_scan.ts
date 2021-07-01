import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { Body } from "node-fetch";
import * as z from "zod";

import { scrape_everything } from "@app/import/study_portal";

export default {
  method: Method.GET,
  path: "/admin/material/scan",

  handler: async ({ params }: Request, ctx: Context): Promise<Response> => {
    await scrape_everything(ctx);

    return Ok({});
  },
};
