import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/programme/:code/:year_start/:year_end",

  handler: async (
    { params }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const { code, year_start, year_end } = params;
    const instance = await prisma.common.programmeInstance.findFirst({
      where: {
        admission_year: `${year_start}/${year_end}`,
        programme_code: code.toUpperCase(),
      },
    });
    if (instance === null) return new Response(404);
    const data = await prisma.common.programmePlanEntry.findMany({
      where: {
        programme_instance_id: instance.instance_id,
      },
      include: {
        course: true,
        course_instance: {
          include: {
            survey: true,
          },
        },
      },
    });

    return Ok(data);
  },
};
