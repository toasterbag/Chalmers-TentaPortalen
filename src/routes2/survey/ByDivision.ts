import {
  Method,
  EndpointHandler,
  Request,
  Ok,
  Endpoint,
} from "@app/server/types";
import { Context } from "@app/context";
import { None } from "@app/std/option";
import { z } from "zod";
import { parseNumber } from "@app/utils/validation";
import { studentBoards } from "@app/utils/boards";
import { second } from "@app/utils";

const schema = {
  path: "/survey/by-division",
  method: Method.GET,
  auth: None,
  query: z.object({
    academicYear: z.string(),
    studyPeriod: z.string().optional().transform(parseNumber),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { query }: Request<Schema>,
  { prisma }: Context,
) => {
  const surveys = await prisma.common.survey.findMany({
    where: {
      academic_year: query.academicYear,
      start_period: query.studyPeriod,
      end_period: query.studyPeriod,
    },
    include: {
      course: true,
    },
  });

  const surveyByProgramme = surveys.groupBy((s) => s.course.owner_code);

  const answersByDivision = studentBoards
    .filter((e) => e.division !== "Basår")
    .map(({ division, programmes }) => {
      const bachelorsProgrammes = programmes.filter((p) => !p.startsWith("MP"));
      const { responses, respondents } = surveyByProgramme
        .filter((key) => bachelorsProgrammes.includes(key))
        .toArray()
        .flatMap(second)
        .reduce(
          (all, next): { responses: number; respondents: number } => ({
            responses: all.responses + next.responses,
            respondents: all.respondents + next.respondents,
          }),
          {
            responses: 0,
            respondents: 0,
          },
        );
      return {
        division,
        responses,
        respondents,
        answerFrequency: responses / respondents,
      };
    })
    .sortBy((a, b) => {
      if (a.answerFrequency === undefined) return -1;
      if (b.answerFrequency === undefined) return 1;
      return b.answerFrequency - a.answerFrequency;
    });

  return Ok(answersByDivision);
};

export default new Endpoint(schema, handler);
