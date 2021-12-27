import { Redis } from "ioredis";
import { RedisSet } from "./set";
import { RedisString } from "./string";

const VALID_PROGRAMME_CODES = "VALID_PROGRAMME_CODES";
const SCRAPED_PROGRAMME_INSTANCES = "SCRAPED_PROGRAMME_INSTANCES";
const PASSRATE_BY_PERIOD = "PASSRATE_BY_PERIOD";

export class RedisCache {
  public readonly valid_programme_codes: RedisSet;

  public readonly scraped_programme_instances: RedisSet;

  public readonly passrate_by_period: RedisString;

  constructor(redis: Redis) {
    this.valid_programme_codes = new RedisSet(redis, VALID_PROGRAMME_CODES);

    this.scraped_programme_instances = new RedisSet(
      redis,
      SCRAPED_PROGRAMME_INSTANCES,
    );

    this.passrate_by_period = new RedisString(redis, PASSRATE_BY_PERIOD);
  }
}
