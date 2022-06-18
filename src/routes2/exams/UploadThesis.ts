import { z } from "zod";
import {
  Method,
  EndpointHandler,
  Request,
  Ok,
  Endpoint,
  Err,
} from "@app/server/types";
import { ErrorCode } from "@app/server/codes";
import { Context } from "@app/context";
import { None } from "@app/std/option";
import { mkdir, copyFile } from "fs-extra";
import { zBoolean } from "@app/utils/validation";

const schema = {
  path: "/exams/thesis",
  method: Method.POST,
  auth: None,
  files: { thesis: 1 },
  query: z.object({
    withSolution: zBoolean,
    code: z.string(),
    date: z.string(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { query: { withSolution, code, date }, files }: Request<Schema>,
  { prisma, config }: Context,
) => {
  const exam = await prisma.common.exam.findFirst({
    where: {
      course_code: code,
      date,
    },
  });

  if (!exam) {
    return Err(404, [
      {
        code: "No such exam",
        message: `Could not find exam for '${code}' on '${date}'`,
      },
    ]);
  }

  if (exam.thesis_id) {
    return Err(ErrorCode.Conflict, [
      {
        code: "Thesis already uploaded",
        message: `The thesis for '${code}' on '${date}' has already been uploaded`,
      },
    ]);
  }

  const filetype = files.thesis.originalname.replace(/.*\./, "");
  const dir = `${config.paths.data}/courses/${code}/${date}`;
  await mkdir(dir, { recursive: true });
  await copyFile(files.thesis.path, `${dir}/exam.${filetype}`);

  const thesis = await prisma.common.examThesis.create({
    data: {
      filetype,
      includes_solution: withSolution,
    },
  });
  await prisma.common.exam.update({
    data: {
      thesis_id: thesis.id,
    },
    where: {
      course_code_date: {
        course_code: code,
        date,
      },
    },
  });

  return Ok({});
};

export default new Endpoint(schema, handler);
