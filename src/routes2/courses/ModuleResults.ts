import { z } from "zod";
import {
  Method,
  EndpointHandler,
  Request,
  Ok,
  Endpoint,
} from "@app/server/types";
import { None } from "@app/std/option";
import { computePerformanceFields } from "@app/prisma/exam";
import { Context } from "@app/context";

const schema = {
  path: "/course/:code/module/:id",
  method: Method.GET,
  auth: None,
  params: z.object({
    code: z.string(),
    id: z.string(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { params }: Request<Schema>,
  { prisma }: Context,
) => {
  const { code, id } = params;
  const res = (
    await prisma.common.moduleResult.findMany({
      where: {
        course_code: code,
        module_id: id,
      },
    })
  ).map(computePerformanceFields);

  return Ok(res);
};

export default new Endpoint(schema, handler);
