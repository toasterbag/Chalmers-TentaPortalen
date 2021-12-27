import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";
import { join } from "node:path";
import * as z from "zod";
import { mkdir, copyFile, unlink } from "fs-extra";

const common_schema = z.object({
  thesis_id: z.number(),
  verified: z.boolean(),
});

const approve_schema = z.object({
  courses: z.array(z.string()),
  uploaded_for: z.string(),
  verified: z.boolean(),
  includes_solution: z.boolean(),
  thesis_id: z.number(),
  date: z.string(),
});

export default {
  method: Method.PUT,
  path: "/exams/thesis",
  auth: ["admin"],

  handler: async (
    { body: unparsed_body }: Request,
    { prisma, config }: Context,
  ): Promise<Response> => {
    const body = common_schema.parse(unparsed_body);

    if (body.verified === false) {
      const thesis = await prisma.examThesis.delete({
        where: {
          id: body.thesis_id,
        },
        include: {
          exams: true,
        },
      });
      for (const exam of thesis.exams) {
        const file = join(
          config.paths.data,
          "courses",
          exam.course_code,
          `exam.${thesis.filetype}`,
        );
        await unlink(file);
      }
    } else {
      const approve = approve_schema.parse(unparsed_body);
      const thesis = await prisma.examThesis.update({
        data: {
          includes_solution: approve.includes_solution,
          verified: true,
        },
        where: {
          id: approve.thesis_id,
        },
      });

      for (const course_code of approve.courses) {
        await prisma.exam.update({
          data: {
            thesis_id: null,
          },
          where: {
            course_code_date: {
              course_code,
              date: approve.date,
            },
          },
        });

        await prisma.exam.update({
          data: {
            thesis_id: approve.thesis_id,
          },
          where: {
            course_code_date: {
              course_code,
              date: approve.date,
            },
          },
        });
        const filename = `exam.${thesis.filetype}`;
        const src = join(
          config.paths.data,
          "courses",
          approve.uploaded_for,
          approve.date,
        );
        const dest = join(
          config.paths.data,
          "courses",
          course_code,
          approve.date,
        );
        await mkdir(dest, { recursive: true });
        copyFile(join(src, filename), join(dest, filename));
      }
    }

    return Ok();
  },
};
