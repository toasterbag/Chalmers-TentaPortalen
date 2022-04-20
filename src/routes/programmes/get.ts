import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/programme/:code",

  handler: async (
    { params }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const { code } = params;
    const data = await prisma.programme.findFirst({
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
        code: code.toUpperCase(),
      },
    });

    return Ok(data);
  },
};
