import { Redis } from "ioredis";
import { RedisMap } from "./map";
import { RedisObject } from "./object";
import { RedisSet } from "./set";
import { RedisString } from "./string";

const VALID_PROGRAMME_CODES = "VALID_PROGRAMME_CODES";
const SCRAPED_PROGRAMME_INSTANCES = "SCRAPED_PROGRAMME_INSTANCES";
const PASSRATE_BY_PERIOD = "PASSRATE_BY_PERIOD";
const CHALMERS_SURVEY_AGGREGATE = "CHALMERS_SURVEY_AGGREGATE";
const PROGRAMME_SURVEY_AGGREGATE = "PROGRAMME_SURVEY_AGGREGATE";
const DEPARTMENT_SURVEY_AGGREGATE = "DEPARTMENT_SURVEY_AGGREGATE";
const SURVEY_BY_PERIOD = "SURVEY_BY_PERIOD";
const SURVEY_ANSWERS_BY_DIVISION = "SURVEY_ANSWERS_BY_DIVISION";

type SurveyAggregate = {
  answer_frequency: number;
  prerequisite_mean: number;
  goals_mean: number;
  structure_mean: number;
  teaching_mean: number;
  litterature_mean: number;
  assessment_mean: number;
  administration_mean: number;
  workload_mean: number;
  working_environment_mean: number | undefined;
  total_impression_mean: number;
};

export class RedisCache {
  public readonly valid_programme_codes: RedisSet;

  public readonly scraped_programme_instances: RedisSet;

  public readonly passrate_by_period: RedisString;

  public readonly chalmers_survey_aggregate: RedisObject<{
    [key in string]: SurveyAggregate;
  }>;

  public readonly survey_by_period: RedisObject<{
    [key in string]: {
      [key2 in string]: SurveyAggregate;
    };
  }>;

  public readonly programme_survey_aggregate: RedisObject<{
    // Programme code
    [key in string]: {
      // Academic year
      [key2 in string]: {
        count: number;
        answer_frequency: number;
        total_impression_mean: number;
        prerequisite_mean: number;
        goals_mean: number;
        structure_mean: number;
        teaching_mean: number;
        assessment_mean: number;
        litterature_mean: number;
        administration_mean: number;
        workload_mean: number;
      };
    };
  }>;

  public readonly surveyAnswersByDivision: RedisObject<{
    // Division
    [key in string]: {
      // Academic year
      [key2 in string]: number;
    };
  }>;

  public readonly department_survey_aggregate: RedisMap;

  constructor(redis: Redis) {
    this.valid_programme_codes = new RedisSet(redis, VALID_PROGRAMME_CODES);

    this.scraped_programme_instances = new RedisSet(
      redis,
      SCRAPED_PROGRAMME_INSTANCES,
    );

    this.passrate_by_period = new RedisString(redis, PASSRATE_BY_PERIOD);

    this.chalmers_survey_aggregate = new RedisObject(
      redis,
      CHALMERS_SURVEY_AGGREGATE,
    );

    this.programme_survey_aggregate = new RedisObject(
      redis,
      PROGRAMME_SURVEY_AGGREGATE,
    );

    this.department_survey_aggregate = new RedisMap(
      redis,
      DEPARTMENT_SURVEY_AGGREGATE,
    );

    this.survey_by_period = new RedisObject(redis, SURVEY_BY_PERIOD);

    this.surveyAnswersByDivision = new RedisObject(
      redis,
      SURVEY_ANSWERS_BY_DIVISION,
    );
  }
}
