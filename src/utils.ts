import { getYear, getMonth } from "date-fns";
import { readdir, stat } from "fs-extra";
import { resolve } from "path";

const sleep = async (t: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, t);
  });

const date_to_academic_year = (date: Date): string =>
  getMonth(date) > 7
    ? `${getYear(date)}/${getYear(date) + 1}`
    : `${getYear(date) - 1}/${getYear(date)}`;

type WorkerFn<I, O> = (arg: I) => Promise<O>;
class Queue<I, O> {
  queue: Array<I> = [];
  output: Array<O> = [];
  constructor(items = []) {
    this.queue = items;
  }

  steal(): I | undefined {
    if (this.queue.length == 0) {
      return undefined;
    }
    return this.queue.splice(-1)[0];
  }

  async start(fn: WorkerFn<I, O>, concurrency = 4): Promise<Array<O>> {
    const workers = Array(concurrency)
      .fill(0)
      .map(async () => this.spawn_worker(fn));
    return Promise.all(workers).then(() => this.output);
  }

  async spawn_worker(fn: WorkerFn<I, O>): Promise<void> {
    let item = undefined;
    while ((item = this.steal()) && item !== undefined) {
      const res = await fn(item);
      this.output.push(res);
    }
  }
}

export const find = async (
  path: string,
  ext?: string,
): Promise<Array<string>> => {
  const items = await readdir(path);
  const pending_stats = items
    .map((p) => resolve(path, p))
    .map(async (p) => ((await stat(p)).isDirectory() ? find(p) : [p]));
  const stats = await Promise.all(pending_stats);

  const res = stats.reduce((a, f) => [...a, ...f], []);
  if (ext) {
    return res.filter((s) => s.endsWith(ext));
  }
  return res;
};

export { sleep, Queue, date_to_academic_year };
