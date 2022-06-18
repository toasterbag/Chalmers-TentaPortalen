import { z } from "zod";
import {
  Method,
  EndpointHandler,
  Request,
  Ok,
  Endpoint,
} from "@app/server/types";
import { Context } from "@app/context";
import { Some } from "@app/std/option";
import { parseNumber } from "@app/utils/validation";
import { Role } from "@app/prisma/clients/restricted";

const schema = {
  path: "/exams/thesis/:id",
  method: Method.PATCH,
  auth: Some(new Set([Role.Admin])),
  params: z.object({
    id: z.string().transform(parseNumber),
  }),
  body: z.object({
    includesSolution: z.boolean().optional(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { body: { includesSolution }, params: { id } }: Request<Schema>,
  { prisma }: Context,
) => {
  await prisma.common.examThesis.update({
    where: {
      id,
    },
    data: {
      includes_solution: includesSolution,
    },
  });

  return Ok({});
};

export default new Endpoint(schema, handler);
