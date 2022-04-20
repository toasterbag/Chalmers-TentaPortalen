import { validatePassword } from "@app/auth/password";
import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { isSome } from "@app/std/option";
import { Request } from "express";

export default {
  method: Method.POST,
  path: "/signup",

  handler: async ({ body }: Request, { auth }: Context): Promise<Response> => {
    const passwordErrors = validatePassword(body.password);
    if (!passwordErrors.isEmpty()) {
      return new Response(400, {
        kind: "INVALID_PASSWORD",
        message: passwordErrors,
      });
    }

    const profile = await auth.createUser(
      body.username,
      body.email,
      body.password,
    );

    if (isSome(profile)) return Ok(profile.val);
    return new Response(401, {});
  },
};
