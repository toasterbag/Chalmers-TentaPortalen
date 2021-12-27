import readline from "node:readline";

const SPINNER = ["🌑 ", "🌒 ", "🌓 ", "🌔 ", "🌕 ", "🌖 ", "🌗 ", "🌘 "];

const HISTORY_LENGTH = 30;

export class ProgressBar {
  private current = 0;

  private target: number;

  private frame = 0;

  private prefix: string;

  private timer: NodeJS.Timeout;

  private updates: Array<[number, number]> = [];

  private current_speed = 0;

  private completion_est: [number, number] = [0, 0];

  constructor({
    prefix = "",
    target,
    render_interval = 250,
  }: {
    prefix: string;
    target: number;
    render_interval?: number;
  }) {
    this.target = target;
    this.prefix = prefix;

    this.timer = setInterval(() => {
      this.render();
    }, render_interval);
  }

  update(current: number) {
    this.current = current;
    if (this.updates.length >= HISTORY_LENGTH) {
      this.updates.shift();
    }
    this.updates.push([Date.now(), current]);
    this.calculate_estimated_completion();
  }

  finish() {
    clearInterval(this.timer);
    this.clear_row();
    process.stdout.write(`${this.prefix}: Finished!\n`);
  }

  render() {
    this.clear_row();
    this.frame = this.frame.add(1).rem(SPINNER.length);
    const frame = SPINNER[this.frame];
    const target = this.target.toString();
    const current = this.current.toString().padStart(target.length);
    process.stdout.write(`${frame} ${this.prefix} ${current} / ${target}`);

    if (this.updates.length > 2) {
      const [minutes_remaining, seconds_remaining] = this.completion_est;
      process.stdout.write(`, ${this.current_speed}/s. Time remaining `);
      if (minutes_remaining > 0) {
        process.stdout.write(`${minutes_remaining}m `);
      }
      process.stdout.write(`${seconds_remaining}s `);
    }
  }

  private clear_row() {
    readline.cursorTo(process.stdout, 0);
    readline.clearLine(process.stdout, 1);
  }

  private calculate_speed() {
    const deltas = [];
    for (let i = 1; i < this.updates.length; i += 1) {
      const [prev_ts, prev_val] = this.updates[i - 1];
      const [next_ts, next_val] = this.updates[i];

      const delta_unit = prev_val - next_val;
      const delta_time = (prev_ts - next_ts) / 1000;
      deltas.push(delta_unit / delta_time);
    }

    this.current_speed = (deltas.average() as number).roundTo(2);
  }

  private calculate_estimated_completion() {
    this.calculate_speed();
    const seconds = (this.target - this.current) / this.current_speed;
    this.completion_est = [Math.floor(seconds / 60), Math.floor(seconds % 60)];
  }
}
