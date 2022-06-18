import { Context } from "@app/context";
import { z } from "zod";
import {
  Method,
  EndpointHandler,
  Request,
  Ok,
  Endpoint,
  Response,
  Err,
} from "@app/server/types";
import { None } from "@app/std/option";
import { ErrorCode } from "@app/server/codes";

const schema = {
  path: "/programme/:code/surveys",
  method: Method.GET,
  auth: None,
  params: z.object({
    code: z.string(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { params: { code } }: Request<Schema>,
  { cache }: Context,
): Promise<Response> => {
  const res = await cache.programme_survey_aggregate.get();
  if (res === undefined) {
    return Err(ErrorCode.NotFound, [
      {
        code: "Could not fetch cache",
        message:
          "Could not fetch cache entry for 'programme_survey_aggregate', perhaps the server is still starting?",
      },
    ]);
  }

  if (!(code in res))
    return Err(ErrorCode.NotFound, [
      {
        code: "No such programme",
        message: `Could not find any program with code '${code}'`,
      },
    ]);
  return Ok(res[code]);
};

export default new Endpoint(schema, handler);
