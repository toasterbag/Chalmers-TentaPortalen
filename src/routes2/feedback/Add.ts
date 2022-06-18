import { z } from "zod";
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
  path: "/feedback",
  method: Method.POST,
  auth: None,
  body: z.object({
    email: z.string().email().optional(),
    message: z.string(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { body: { email, message } }: Request<Schema>,
  { prisma }: Context,
): Promise<Response> => {
  await prisma.restricted.feedback.create({
    data: {
      email: email ?? "Anonymous",
      message,
    },
  });
  return Ok([]);
};

export default new Endpoint(schema, handler);
