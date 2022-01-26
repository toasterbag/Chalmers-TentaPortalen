import { readFileSync } from "fs";
import { PrismaClient } from "@prisma/client";

export const import_exams_json = async (path: string) => {
  const prisma = new PrismaClient();
  if ((await prisma.examThesis.count()) !== 0) {
    console.log(
      "There are already exams in the database, refusing to import exams",
    );
    return;
  }

  if ((await prisma.exam.count()) === 0) {
    console.log("Skipping importing exam materials, no exams found");
    return;
  }

  let data;
  try {
    data = readFileSync(path, "utf-8");
  } catch (e) {
    console.log("Could not read exam data", e);
    return;
  }

  const { theses, solutions } = JSON.parse(data);

  for (const {
    filetype,
    includes_solution,
    exams: [{ course_code, date }],
  } of theses.filter((e: any) => !e.exams.isEmpty())) {
    try {
      const { id } = await prisma.examThesis.create({
        data: {
          filetype,
          includes_solution,
        },
      });

      await prisma.exam.update({
        data: {
          thesis_id: id,
        },
        where: {
          course_code_date: {
            course_code,
            date,
          },
        },
      });
    } catch (e) {
      console.error(e);
      console.error("On data", { course_code, date });
    }
  }

  for (const {
    filetype,
    exams: [{ course_code, date }],
  } of solutions.filter((e: any) => !e.exams.isEmpty())) {
    try {
      const { id } = await prisma.examSolution.create({
        data: {
          filetype,
        },
      });

      await prisma.exam.update({
        data: {
          solution_id: id,
        },
        where: {
          course_code_date: {
            course_code,
            date,
          },
        },
      });
    } catch (e) {
      console.error(e);
      console.error("On data", { course_code, date });
    }
  }
};
