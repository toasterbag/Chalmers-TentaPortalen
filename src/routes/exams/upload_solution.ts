import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { Body } from "node-fetch";
import * as z from "zod";
import { mkdir, copyFile } from "fs-extra";

const query_schema = z.object({
  course_code: z.string(),
  date: z.string(),
});

export default {
  method: Method.POST,
  path: "/exams/solution",
  uploads: { solution: "single" },

  handler: async (
    { query: unparsed_query, file }: Request,
    { prisma, config }: Context,
  ): Promise<Response> => {
    const { course_code, date } = query_schema.parse(unparsed_query);
    if (!(typeof course_code == "string") || course_code.includes(".")) {
      return new Response(400, { code: "Invalid course code" });
    }

    if (!(typeof date == "string") || date.includes(".")) {
      return new Response(400, { code: "Invalid date" });
    }

    const exam = await prisma.exam.findFirst({
      where: {
        course_code: String(course_code),
        date: String(date),
      },
      include: {
        thesis: true,
      },
    });

    if (!exam) {
      return new Response(404, { code: "No such exam" });
    }

    if (exam?.solution_id || exam?.thesis?.includes_solution) {
      return Ok({ code: "This exam has a solution already been uploaded" });
    }

    const filetype = file.originalname.replace(/.*\./, "");
    const dir = `${config.paths.data}/courses/${course_code}/${date}`;
    await mkdir(dir, { recursive: true });
    await copyFile(file.path, `${dir}/solution.${filetype}`);

    const solution = await prisma.examSolution.create({
      data: {
        filetype: filetype,
      },
    });
    await prisma.exam.update({
      data: {
        solution_id: solution.id,
      },
      where: {
        course_code_date: {
          course_code: exam.course_code,
          date: exam.date,
        },
      },
    });

    return Ok();
  },
};
