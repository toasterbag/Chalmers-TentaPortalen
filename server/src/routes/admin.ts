import Context from "../context";
import { Endpoint, Method, Response, Ok } from "../server";
import { Request } from "express";
import { promises as fs } from "fs";
import importData from "@app/import";

import multer from "multer";
const uploads = multer({ dest: process.env.UPLOAD_PATH })

export class Auth implements Endpoint<Context> {
  method = Method.POST;
  path = "/api/auth";

  async handler({ headers }: Request, { config }: Context): Promise<Response> {
    const pass = headers.authorization;
    if (pass == config.ADMIN_PASSWORD) {
      return Ok({})
    }

    return new Response(400);
  }
}


export class UploadDataSheet implements Endpoint<Context> {
  method = Method.PUT;
  path = "/api/datasheet";
  middleware = [uploads.single("datasheet")]

  async handler({ headers, file }: Request, context: Context): Promise<Response> {
    const pass = headers.authorization;
    if (pass == context.config.ADMIN_PASSWORD) {
      await fs.copyFile(file.path, context.config.DATASHEET_TEMP_PATH);
      importData(context);
      return Ok({})
    }

    return new Response(400);
  }
}

export default [Auth, UploadDataSheet];