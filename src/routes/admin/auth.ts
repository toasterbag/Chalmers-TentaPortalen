import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { isSome } from "@app/std/option";
import { Request } from "express";

export default {
  method: Method.POST,
  path: "/auth",

  handler: async ({ body }: Request, { auth }: Context): Promise<Response> => {
    const opt = await auth.authUserWithPassword(body.email, body.password);
    if (isSome(opt)) {
      const profile = opt.val;
      const tokenOption = await auth.issueToken(body.email, body.password);
      if (isSome(tokenOption)) {
        const token = tokenOption.val;
        return Ok({ ...profile, token: token.value });
      }
    }
    return new Response(400);
  },
};
