import { getYear, getMonth } from "date-fns";
import { readdir, stat } from "fs-extra";
import { resolve } from "path";

export { Queue } from "./queue";

// "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
export const USER_AGENTS = [
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/92.0.4515.119 Safari/537.36",
  "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
  "Mozilla/5.0 (compatible; Baiduspider-render/2.0; +http://www.baidu.com/search/spider.html)",
];

export const get_user_agent = () => USER_AGENTS.random();

export class AcademicYear {
  readonly start: number;

  readonly end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  static from_date(date: Date): AcademicYear {
    return getMonth(date) > 7
      ? new AcademicYear(getYear(date), getYear(date) + 1)
      : new AcademicYear(getYear(date) - 1, getYear(date));
  }

  toString(): string {
    return `${this.start}/${this.end}`;
  }

  is_same(other: AcademicYear) {
    return this.start === other.start && this.end === other.end;
  }
}

export const sleep = async (t: number): Promise<void> =>
  new Promise((then) => {
    setTimeout(then, t);
  });

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

export const is_defined = <T>(item: T | undefined): item is T => {
  return item !== undefined;
};

export const is_not_null = <T>(item: T | null): item is T => {
  return item !== null;
};

export function is_error(o: any): o is Error {
  return o instanceof Error;
}

export const is_ok = <T>(item: T | Error): item is T => {
  return !(item instanceof Error);
};
