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
  method: Method.DELETE,
  auth: Some(new Set([Role.Admin])),
  params: z.object({
    id: z.string().transform(parseNumber),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { params: { id } }: Request<Schema>,
  { prisma }: Context,
) => {
  await prisma.common.examThesis.delete({
    where: {
      id,
    },
  });

  return Ok({});
};

export default new Endpoint(schema, handler);
