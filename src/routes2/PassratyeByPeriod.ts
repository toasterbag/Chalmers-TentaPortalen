import {
  Method,
  EndpointHandler,
  Request,
  Ok,
  Endpoint,
  Response,
  Err,
} from "@app/server/types";
import { Context } from "@app/context";
import { None } from "@app/std/option";
import { ErrorCode } from "@app/server/codes";

const schema = {
  path: "/periods/passrate",
  method: Method.GET,
  auth: None,
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  req: Request<Schema>,
  { cache }: Context,
): Promise<Response> => {
  const res = await cache.passrate_by_period.get();
  if (res === null) {
    return Err(ErrorCode.NotFound, [
      {
        code: "Could not fetch cache",
        message:
          "Could not fetch cache entry for 'passrate_by_period', perhaps the server is still starting?",
      },
    ]);
  }
  return Ok(JSON.parse(res));
};

export default new Endpoint(schema, handler);
