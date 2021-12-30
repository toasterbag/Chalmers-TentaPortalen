import { readFileSync } from "fs";
import { PrismaClient } from ".prisma/client";

export const import_exams_json = async () => {
  const prisma = new PrismaClient();
  const data = readFileSync(0, "utf-8");
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
