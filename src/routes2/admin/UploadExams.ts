import {
  Method,
  EndpointHandler,
  Request,
  Endpoint,
  Response,
  Ok,
} from "@app/server/types";
import { Context } from "@app/context";
import { Role } from "@app/prisma/clients/restricted";
import { Some } from "@app/std/option";
import { copyFile } from "fs-extra";
import importData from "@app/import/exams_stats";

const schema = {
  path: "/datasheet",
  method: Method.PUT,
  auth: Some(new Set([Role.Admin])),
  files: {
    datasheet: 1,
  },
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { files }: Request<Schema>,
  ctx: Context,
): Promise<Response> => {
  await copyFile(files.datasheet.path, ctx.config.paths.exam_sheet_temp);
  importData(ctx);
  return Ok({});
};

export default new Endpoint(schema, handler);
