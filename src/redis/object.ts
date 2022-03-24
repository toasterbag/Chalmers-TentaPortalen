import { JsonObject } from "@app/utils/json";
import { Redis } from "ioredis";

export class RedisObject<T extends JsonObject> {
  redis: Redis;

  index_key: string;

  constructor(redis: Redis, index_key: string) {
    this.redis = redis;
    this.index_key = index_key;
  }

  async get(): Promise<T | undefined> {
    const text = await this.redis.get(this.index_key);
    if (text == null) return undefined;
    return JSON.parse(text) as T;
  }

  set(val: T) {
    return this.redis.set(this.index_key, JSON.stringify(val));
  }
}
