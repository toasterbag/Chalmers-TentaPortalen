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
import { Context } from "@app/context";
import { ErrorCode } from "@app/server/codes";
import { isDefined } from "@app/utils";

const schema = {
  path: "/programmes/rankings",
  method: Method.GET,
  auth: None,
  query: z.object({
    academicYear: z.string(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { query: { academicYear } }: Request<Schema>,
  { cache }: Context,
): Promise<Response> => {
  const data = await cache.programme_survey_aggregate.get();
  if (data === undefined) {
    return Err(ErrorCode.NotFound, [
      {
        code: "Could not fetch cache",
        message:
          "Could not fetch cache entry for 'programme_survey_aggregate', perhaps the server is still starting?",
      },
    ]);
  }

  const res = Object.entries(data)
    .map(([code, years]) => {
      if (academicYear in years) return { ...years[academicYear], code };
      return undefined;
    })
    .filter(isDefined);
  return Ok(res);
};

export default new Endpoint(schema, handler);
