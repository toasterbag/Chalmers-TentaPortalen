import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { Body } from "node-fetch";
import * as z from "zod";

export default {
  method: Method.GET,
  path: "/search/:term",

  handler: async (
    { params }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const { term } = params;
    const programmes_pending = prisma.programme.findMany({
      where: {
        OR: [
          { code: { startsWith: term, mode: "insensitive" } },
          { name_sv: { contains: term, mode: "insensitive" } },
          { name_en: { contains: term, mode: "insensitive" } },
        ],
      },
    });

    const courses_pending = prisma.course.findMany({
      where: {
        OR: [
          { course_code: { startsWith: term, mode: "insensitive" } },
          { owner_code: { startsWith: term, mode: "insensitive" } },
          { name_sv: { contains: term, mode: "insensitive" } },
          { name_en: { contains: term, mode: "insensitive" } },
        ],
      },
      include: {
        exams: false,
      },
    });

    const departments_pending = prisma.department.findMany({});

    const [programmes, courses, departments] = await Promise.all([
      programmes_pending,
      courses_pending,
      departments_pending,
    ]);

    return Ok({ programmes, courses, departments });
  },
};
