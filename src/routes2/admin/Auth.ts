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
import { Context } from "@app/context";
import { isSome, None } from "@app/std/option";
import { ErrorCode } from "@app/server/codes";

const schema = {
  path: "/auth",
  method: Method.POST,
  auth: None,
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { body }: Request<Schema>,
  { auth }: Context,
): Promise<Response> => {
  const opt = await auth.authUserWithPassword(body.email, body.password);
  if (isSome(opt)) {
    const profile = opt.val;
    const tokenOption = await auth.issueToken(body.email, body.password);
    if (isSome(tokenOption)) {
      const token = tokenOption.val;
      return Ok({ ...profile, token: token.value });
    }
  }
  return Err(ErrorCode.NotFound, [
    { code: "Authentication error", message: "Invalid email or password" },
  ]);
};

export default new Endpoint(schema, handler);
