import { Context } from "@app/context";
import { Method, Response, Ok } from "@app/server";
import { Request } from "express";

export default {
  method: Method.GET,
  path: "/programme/:code/exams",

  handler: async (
    { params }: Request,
    { prisma }: Context,
  ): Promise<Response> => {
    const { code } = params;
    const data = await prisma.$queryRaw`
    SELECT 
      academic_year, 
      SUM(failed) as failed,
      SUM(three) as three,
      SUM(four) as four,
      SUM(five) as five,
      SUM(failed + three + four + five) as total
    FROM exams
    WHERE course_code IN 
      (SELECT course_code FROM courses WHERE owner_code=${code.toUpperCase()})
    GROUP BY academic_year
    ORDER BY academic_year;`;

    return Ok(data);
  },
};
