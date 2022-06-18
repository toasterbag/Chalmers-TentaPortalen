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
import { ErrorCode } from "@app/server/codes";
import { None } from "@app/std/option";

const schema = {
  path: "/programme/:code",
  method: Method.GET,
  auth: None,
  params: z.object({
    code: z.string().transform((c) => c.toUpperCase()),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { params: { code } }: Request<Schema>,
  { prisma }: Context,
): Promise<Response> => {
  const data = await prisma.common.programme.findFirst({
    select: {
      code: true,
      name_en: true,
      name_sv: true,
      // instances: {
      //   orderBy: {
      //     admission_year: "desc",
      //   },
      // },
    },
    where: {
      code,
    },
  });

  if (data === null)
    return Err(ErrorCode.NotFound, [
      {
        code: "No such programme",
        message: `Could not find any program with code '${code}'`,
      },
    ]);

  return Ok(data);
};

export default new Endpoint(schema, handler);
