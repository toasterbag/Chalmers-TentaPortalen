import { z } from "zod";
import {
  Method,
  EndpointHandler,
  Request,
  Ok,
  Endpoint,
  Err,
} from "@app/server/types";
import { Context } from "@app/context";
import { None } from "@app/std/option";
import { withStudentBoard } from "@app/utils/boards";
import { ErrorCode } from "@app/server/codes";

const schema = {
  path: "/course/:code",
  method: Method.GET,
  auth: None,
  params: z.object({
    code: z.string(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { params }: Request<Schema>,
  { prisma }: Context,
) => {
  const { code } = params;
  const data = await prisma.common.course.findFirst({
    where: {
      course_code: code.toUpperCase(),
    },
    include: {
      department: true,
      owner: true,
      instances: {
        take: 1,
        orderBy: {
          academic_year: "desc",
        },
      },
    },
  });
  if (data) {
    return Ok(withStudentBoard(data));
  }
  return Err(ErrorCode.NotFound, [
    { code: "Not found", message: "Course not found" },
  ]);
};

export default new Endpoint(schema, handler);
