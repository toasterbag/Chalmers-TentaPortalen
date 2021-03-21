import Winston from "winston";
import { createLogger, format, transports } from "winston";
const { combine, timestamp, label: addLabel, printf } = format;
import chalk from "chalk";

const mkTerminalFormat = (options: LoggerOptions) =>
  printf(({ level, message, label, timestamp }) => {
    if (level == "error") {
      const prefix = chalk.red(`✖ ${chalk.underline("Error")}`);
      message = chalk.red(`${prefix} ${message}`);
    }

    message = `[${chalk.blue(options.label)}] ${message}`;

    return `${message}`;
  });

interface LoggerOptions {
  label: string;
}

const makeLogger = (options: LoggerOptions) =>
  Winston.createLogger({
    level: "info",
    //format: Winston.format.json(),
    //format: log_format,
    transports: [
      new Winston.transports.Console({
        format: combine(mkTerminalFormat(options)),
      }),
    ],
  });

export { makeLogger };
