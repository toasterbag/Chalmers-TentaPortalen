import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/programme/:code/:admission_year",

  handler: async (
    { params }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const { code, admission_year } = params;
    const instance = await prisma.programmeInstance.findFirst({
      where: {
        admission_year,
        programme_code: code.toUpperCase(),
      },
    });
    if (instance === null) return new Response(404);
    const data = await prisma.programmePlanEntry.findMany({
      where: {
        programme_instance_id: instance.instance_id,
      },
    });

    return Ok(data);
  },
};
