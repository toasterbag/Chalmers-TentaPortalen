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

const schema = {
  method: Method.POST,
  path: "/exams/solution",
  files: { solution: 1 },
  auth: None,
  query: z.object({
    code: z.string(),
    date: z.string(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { query: { code, date }, files }: Request<Schema>,
  { prisma, config }: Context,
) => {
  const exam = await prisma.common.exam.findFirst({
    where: {
      course_code: code,
      date,
    },
    include: {
      thesis: true,
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

  if (exam?.solution_id || exam?.thesis?.includes_solution) {
    return Err(ErrorCode.Conflict, [
      {
        code: "Solution already uploaded",
        message: `The solution for '${code}' on '${date}' has already been uploaded`,
      },
    ]);
  }

  const filetype = files.solution.originalname.replace(/.*\./, "");
  const dir = `${config.paths.data}/courses/${code}/${date}`;
  await mkdir(dir, { recursive: true });
  await copyFile(files.solution.path, `${dir}/solution.${filetype}`);

  const solution = await prisma.common.examSolution.create({
    data: {
      filetype,
    },
  });
  await prisma.common.exam.update({
    data: {
      solution_id: solution.id,
    },
    where: {
      course_code_date: {
        course_code: exam.course_code,
        date: exam.date,
      },
    },
  });

  return Ok({});
};

export default new Endpoint(schema, handler);
