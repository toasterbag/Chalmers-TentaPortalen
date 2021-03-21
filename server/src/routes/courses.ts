import Context from "../context";
import { Endpoint, Method, Response, Ok } from "../server";
import { Request } from "express";

export class GetCourse implements Endpoint<Context> {
  method = Method.GET;
  path = "/api/course/:code";

  async handler({ params }: Request, { prisma }: Context): Promise<Response> {
    const code = params.code;
    const data = await prisma.course.findFirst({
      where: {
        code: code.toUpperCase(),
      },
      include: {
        exams: true,
      },
    });

    return Ok(data);
  }
}

export class Search implements Endpoint<Context> {
  method = Method.GET;
  path = "/api/course/search/:term";

  async handler({ params }: Request, { prisma }: Context): Promise<Response> {
    const term = params.term;
    const data = await prisma.course.findMany({
      where: {
        OR: [
          { code: { startsWith: term.toUpperCase() } },
          { owner: { startsWith: term.toLowerCase() } },
          { name: { startsWith: term.toLowerCase() } },
        ],
      },
      include: {
        exams: false,
      },
    });

    return Ok(data);
  }
}

export default [GetCourse, Search];
