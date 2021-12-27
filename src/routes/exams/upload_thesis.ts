import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import * as z from "zod";
import { mkdir, copyFile } from "fs-extra";

const query_schema = z.object({
  includes_solution: z.string(),
  course_code: z.string(),
  date: z.string(),
});

export default {
  method: Method.POST,
  path: "/exams/thesis",
  uploads: { thesis: "single" },

  handler: async (
    { query: unparsed_query, file }: Request,
    { prisma, config }: Context,
  ): Promise<Response> => {
    const { course_code, date, includes_solution } =
      query_schema.parse(unparsed_query);

    if (!(typeof course_code === "string") || course_code.includes(".")) {
      return new Response(400, { code: "Invalid course code" });
    }

    if (!(typeof date === "string") || date.includes(".")) {
      return new Response(400, { code: "Invalid date" });
    }

    if (!file) {
      return new Response(400, { code: "No file uploaded" });
    }

    const exam = await prisma.exam.findFirst({
      where: {
        course_code,
        date,
      },
    });

    if (!exam) {
      return new Response(404, { code: "No such exam" });
    }

    if (exam.thesis_id) {
      return Ok({ code: "This exam already has a thesis been uploaded" });
    }

    const filetype = file.originalname.replace(/.*\./, "");
    const dir = `${config.paths.data}/courses/${course_code}/${date}`;
    await mkdir(dir, { recursive: true });
    await copyFile(file.path, `${dir}/exam.${filetype}`);

    const thesis = await prisma.examThesis.create({
      data: {
        filetype,
        includes_solution: includes_solution === "true",
      },
    });
    await prisma.exam.update({
      data: {
        thesis_id: thesis.id,
      },
      where: {
        course_code_date: {
          course_code,
          date,
        },
      },
    });

    return Ok();
  },
};
