import {
  Method,
  EndpointHandler,
  Request,
  Ok,
  Endpoint,
  Response,
} from "@app/server/types";
import { Context } from "@app/context";
import { Role } from "@app/prisma/clients/restricted";
import { Some } from "@app/std/option";

const schema = {
  path: "/feedback",
  method: Method.GET,
  auth: Some(new Set([Role.Admin])),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  req: Request<Schema>,
  { prisma }: Context,
): Promise<Response> => {
  return Ok(await prisma.restricted.feedback.findMany({}));
};

export default new Endpoint(schema, handler);
