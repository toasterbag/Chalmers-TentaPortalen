import { Config } from "@app/config";
import { Logger } from "@app/log";
import RedisClient, { Redis } from "ioredis";
import { TaskQueue } from "@app/worker/task_queue";
import { RedisCache } from "@app/redis";

import prisma from "@app/prisma";
import { AuthenticationProvider } from "@app/auth";

export class Context {
  config: Config;

  cache: RedisCache;

  prisma = prisma;

  auth = new AuthenticationProvider(prisma.restricted);

  redis: Redis;

  tasks: TaskQueue;

  log: Logger;

  constructor(config: Config, logger: Logger) {
    this.log = logger;
    this.redis = new RedisClient({
      host: config.redis.host,
    });
    this.cache = new RedisCache(this.redis);
    this.tasks = new TaskQueue(this.redis);
    this.config = config;

    // this.status = status;
  }
}
