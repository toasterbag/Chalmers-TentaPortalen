import { join } from "path";
import { readFile } from "fs-extra";

const merge = (target: any, source: any) => {
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object)
      Object.assign(source[key], merge(target[key], source[key]));
  }

  // Join `target` and modified `source`
  Object.assign(target || {}, source);
  return target;
};

const assure_no_undefined = (obj: any, path: Array<string> = []) => {
  for (const [key, val] of Object.entries(obj)) {
    if (val === undefined) {
      throw new Error(
        `Missing config variable '${[...path, key].join(
          ".",
        )}'. Look at your config file.`,
      );
    } else if (Object.prototype.toString.call(val) === "[object Object]") {
      assure_no_undefined(val, [...path, key]);
    }
  }
};

export interface Config {
  readonly paths: {
    readonly data: string;
    readonly uploads: string;
    readonly exam_sheet_temp: string;
  };
  readonly redis: {
    readonly host: string;
  };
  readonly host: string;
  readonly port: number;
  readonly admin_password: string;
}

// Values with a default (not undefined) are optional in the config
const _default = {
  paths: {
    data: undefined,
    uploads: undefined,
    exam_sheet_temp: "/tmp/course_portal_exams.xlsx",
  },
  redis: {
    host: undefined,
  },
  host: "localhost",
  port: 8855,
  admin_password: undefined,
};

export const build_config = async (path: string): Promise<Config> => {
  const file = await readFile(join(process.cwd(), path));
  const json = JSON.parse(file.toString());
  const config = merge(_default, json);
  assure_no_undefined(config);
  return config;
};
