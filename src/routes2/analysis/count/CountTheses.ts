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
  path: "/analysis/count/theses",
  method: Method.GET,
  auth: None,
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  req: Request<Schema>,
  { cache }: Context,
): Promise<Response> => {
  return Ok({ count: Number(await cache.entries.THESIS_COUNT.get()) });
};

export default new Endpoint(schema, handler);
