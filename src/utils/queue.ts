type WorkerFn<I, O> = (arg: I) => Promise<O>;
export class Queue<I, O> {
  queue: Array<I> = [];

  output: Array<O> = [];

  constructor(items: Array<I> = []) {
    this.queue = items;
  }

  steal(): I | undefined {
    if (this.queue.length === 0) {
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
    let item = this.steal();
    while (item !== undefined) {
      const res = await fn(item);
      this.output.push(res);
      item = this.steal();
    }
  }
}
