import {
  Method,
  EndpointHandler,
  Request,
  Ok,
  Endpoint,
} from "@app/server/types";
import { Context } from "@app/context";
import { None } from "@app/std/option";
import parsePdf from "pdf-parse";
import { readFile } from "fs-extra";

const schema = {
  path: "/exams/thesis/parse",
  method: Method.POST,
  auth: None,
  files: { thesis: 1 },
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async ({ files }: Request<Schema>) => {
  const buf = await readFile(files.thesis.path);
  const pdf = await parsePdf(buf);

  const possibleCourseCodes = pdf.text.match(/[A-Z]{3}[0-9]{3}/g);
  const possibleDates = pdf.text.match("20[0-9]{2}-[0-9]{2}-[0-9]{2}");

  return Ok({
    possibleCourseCodes,
    possibleDates,
  });
};

export default new Endpoint(schema, handler);
