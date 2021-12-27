import { Redis } from "ioredis";

export class RedisMap {
  redis: Redis;

  index_key: string;

  constructor(redis: Redis, index_key: string) {
    this.redis = redis;
    this.index_key = index_key;
  }

  has(key: string) {
    return this.redis.hexists(this.index_key, key);
  }

  set(key: string, val: string) {
    return this.redis.hset(this.index_key, key, val);
  }

  remove(key: string) {
    return this.redis.hdel(this.index_key, key);
  }

  all() {
    return this.redis.hgetall(this.index_key);
  }
}
