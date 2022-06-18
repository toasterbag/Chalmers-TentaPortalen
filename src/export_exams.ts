import prisma from "@app/prisma";

export const export_exams = async () => {
  const theses = await prisma.common.examThesis.findMany({
    include: {
      exams: {
        select: {
          course_code: true,
          date: true,
        },
      },
    },
  });

  const solutions = await prisma.common.examSolution.findMany({
    include: {
      exams: {
        select: {
          course_code: true,
          date: true,
        },
      },
    },
  });

  const attachments = await prisma.common.examAttachment.findMany({
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
