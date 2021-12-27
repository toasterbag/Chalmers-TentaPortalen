import { Redis } from "ioredis";

export class RedisSet {
  redis: Redis;

  set_key: string;

  constructor(redis: Redis, set_key: string) {
    this.redis = redis;
    this.set_key = set_key;
  }

  has(key: string) {
    return this.redis.sismember(this.set_key, key);
  }

  add(key: string) {
    return this.redis.sadd(this.set_key, key);
  }

  remove(key: string) {
    return this.redis.srem(this.set_key, key);
  }
}
