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

  public readonly programme_survey_aggregate: RedisMap;

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

    this.programme_survey_aggregate = new RedisMap(
      redis,
      PROGRAMME_SURVEY_AGGREGATE,
    );
  }
}
