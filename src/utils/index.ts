import { getYear, getMonth, parseISO } from "date-fns";
import { readdir, stat } from "fs-extra";
import { join, resolve } from "path";

export { Queue } from "./queue";

// "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
export const USER_AGENTS = [
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/92.0.4515.119 Safari/537.36",
  "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
  "Mozilla/5.0 (compatible; Baiduspider-render/2.0; +http://www.baidu.com/search/spider.html)",
];

export const getUserAgent = () => USER_AGENTS.random();

const isAround = (start: number, end: number) => (date: string | Date) => {
  const d = date instanceof Date ? date : parseISO(date);
  const month = getMonth(d);
  return month >= start && month <= end;
};

export const aroundExamPeriod = (date: string | Date) => {
  if (isAround(10, 11)(date)) return 1;
  if (isAround(1, 1)(date)) return 2;
  if (isAround(3, 4)(date)) return 3;
  if (isAround(5, 6)(date)) return 4;
  return undefined;
};

export class AcademicYear {
  readonly start: number;

  readonly end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  static currentYear(): AcademicYear {
    const date = new Date();
    return AcademicYear.from_date(date);
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
  const pendingStats = items
    .map((p) => resolve(path, p))
    .map(async (p) => ((await stat(p)).isDirectory() ? find(p) : [p]));
  const stats = await Promise.all(pendingStats);

  const res = stats.reduce((a, f) => [...a, ...f], []);
  if (ext) {
    return res.filter((s) => s.endsWith(ext));
  }
  return res;
};

export const isDefined = <T>(item: T | undefined): item is T => {
  return item !== undefined;
};

export const isNotNull = <T>(item: T | null): item is T => {
  return item !== null;
};

export function isError(o: unknown): o is Error {
  return o instanceof Error;
}

export const isOk = <T>(item: T | Error): item is T => {
  return !(item instanceof Error);
};

export const importFolder = async (folder: string) => {
  const files = await find(join(__dirname, "../", folder), ".js");
  const modules = await Promise.all(files.map((f) => import(f)));
  return modules.reduce((exp, mod) => Object.assign(exp, mod), {});
};

export const toObject = <K extends string | number | symbol>(
  map: Map<K, any>,
) => {
  const obj: any = {};
  for (const [key, val] of map.entries()) {
    obj[key] = val;
  }
  return obj;
};

export const first = <T>(vals: [T, ...any]): T => vals[0];
export const second = <T>(vals: [unknown, T, ...any]): T => vals[1];
