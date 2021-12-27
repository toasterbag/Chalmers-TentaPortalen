import { Redis } from "ioredis";

export class RedisString {
  redis: Redis;

  index_key: string;

  constructor(redis: Redis, index_key: string) {
    this.redis = redis;
    this.index_key = index_key;
  }

  get() {
    return this.redis.get(this.index_key);
  }

  set(val: string) {
    return this.redis.set(this.index_key, val);
  }
}
