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
import { ErrorCode } from "@app/server/codes";

const schema = {
  path: "/survey/chalmers",
  method: Method.GET,
  auth: None,
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (req: Request<Schema>, { cache }: Context) => {
  const res = await cache.chalmers_survey_aggregate.get();
  if (res === undefined) {
    return Err(ErrorCode.NotFound, [
      {
        code: "Could not fetch cache",
        message:
          "Could not fetch cache entry for 'chalmers_survey_aggregate', perhaps the server is still starting?",
      },
    ]);
  }
  return Ok(res);
};

export default new Endpoint(schema, handler);
