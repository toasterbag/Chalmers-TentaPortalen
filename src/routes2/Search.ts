import { z } from "zod";
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

const schema = {
  path: "/search",
  method: Method.GET,
  auth: None,
  query: z.object({
    term: z.string(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { query }: Request<Schema>,
  { prisma }: Context,
): Promise<Response> => {
  const { term } = query;
  const programmesPending = prisma.common.programme.findMany({
    where: {
      OR: [
        { code: { startsWith: term, mode: "insensitive" } },
        { name_sv: { contains: term, mode: "insensitive" } },
        { name_en: { contains: term, mode: "insensitive" } },
      ],
    },
    take: 4,
  });

  const coursesPending = prisma.common.course.findMany({
    where: {
      OR: [
        { course_code: { startsWith: term, mode: "insensitive" } },
        { owner_code: { startsWith: term, mode: "insensitive" } },
        { name_sv: { contains: term, mode: "insensitive" } },
        { name_en: { contains: term, mode: "insensitive" } },
      ],
    },
    include: {
      exams: false,
    },
    take: 12,
  });

  const departmentsPending = prisma.common.department.findMany({
    take: 6,
  });

  const [programmes, courses, departments] = await Promise.all([
    programmesPending,
    coursesPending,
    departmentsPending,
  ]);

  return Ok({ programmes, courses, departments });
};

export default new Endpoint(schema, handler);
