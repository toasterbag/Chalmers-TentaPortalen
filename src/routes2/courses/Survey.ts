import { z } from "zod";
import {
  Method,
  EndpointHandler,
  Request,
  Ok,
  Endpoint,
} from "@app/server/types";
import { Context } from "@app/context";
import { None } from "@app/std/option";

const schema = {
  path: "/course/:code/surveys",
  method: Method.GET,
  auth: None,
  params: z.object({
    code: z.string(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { params }: Request<Schema>,
  { prisma }: Context,
) => {
  const { code } = params;
  const data = await prisma.common.survey.findMany({
    where: { course_code: code.toUpperCase() },
    include: {
      instance: {
        include: { examiner: true },
      },
    },
    orderBy: [{ academic_year: "asc" }, { start_period: "asc" }],
  });

  return Ok(data);
};

export default new Endpoint(schema, handler);
