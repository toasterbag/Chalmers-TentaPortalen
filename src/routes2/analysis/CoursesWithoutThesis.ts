import {
  Method,
  EndpointHandler,
  Request,
  Ok,
  Endpoint,
  Response,
} from "@app/server/types";
import { Context } from "@app/context";
import { None } from "@app/std/option";
import { z } from "zod";

const schema = {
  path: "/analysis/courses-without-thesis",
  method: Method.GET,
  auth: None,
  query: z.object({
    year: z.string().optional(),
    programme: z.string().optional(),
    departmentId: z.string().optional(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  req: Request<Schema>,
  { prisma }: Context,
): Promise<Response> => {
  const courses = await prisma.common.course.findMany({
    where: {
      programme_plan: {
        some: {
          programme_code: req.query.programme,
        },
      },
      department_id: req.query.departmentId
        ? Number(req.query.departmentId)
        : undefined,
      instances: {
        some: {
          academic_year: req.query.year,
        },
      },
      exams: {
        some: {
          academic_year: req.query.year,
        },
        every: {
          thesis_id: null,
        },
      },
    },
  });
  return Ok(courses);
};

export default new Endpoint(schema, handler);
