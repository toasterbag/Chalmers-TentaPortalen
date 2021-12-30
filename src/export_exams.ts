import { PrismaClient } from ".prisma/client";

export const export_exams = async () => {
  const prisma = new PrismaClient();
  const theses = await prisma.examThesis.findMany({
    include: {
      exams: {
        select: {
          course_code: true,
          date: true,
        },
      },
    },
  });

  const solutions = await prisma.examSolution.findMany({
    include: {
      exams: {
        select: {
          course_code: true,
          date: true,
        },
      },
    },
  });

  const attachments = await prisma.examAttachment.findMany({
    include: {
      exams: {
        select: {
          course_code: true,
          date: true,
        },
      },
    },
  });

  console.log(
    JSON.stringify({
      theses,
      solutions,
      attachments,
    }),
  );
};
