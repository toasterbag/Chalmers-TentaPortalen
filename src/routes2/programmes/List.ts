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
  path: "/programmes",
  method: Method.GET,
  auth: None,
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  req: Request<Schema>,
  { prisma }: Context,
): Promise<Response> => {
  const data = await prisma.common.programme.findMany({});

  return Ok(data);
};

export default new Endpoint(schema, handler);
