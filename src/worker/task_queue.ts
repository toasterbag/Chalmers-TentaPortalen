import { Redis } from "ioredis";

const QUEUE_KEY = "TASK_QUEUE";

type Task = {
  kind: "FetchCourseInstance";
  data: {
    course_code: string;
    instance_id: string;
  };
};

export class TaskQueue {
  private redis: Redis;

  constructor(redis: Redis) {
    this.redis = redis;
  }

  async push_task(task: Task) {
    return this.redis.lpush(QUEUE_KEY, JSON.stringify(task));
  }

  async pop_queue(): Promise<Task | undefined> {
    const res = await this.redis.rpop(QUEUE_KEY);
    if (res) {
      return JSON.parse(res);
    }
    return undefined;
  }

  async clear_queue() {
    return this.redis.del(QUEUE_KEY);
  }

  async queue_len() {
    return this.redis.llen(QUEUE_KEY);
  }
}
