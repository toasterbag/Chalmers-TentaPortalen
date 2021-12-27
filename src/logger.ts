import Winston, { createLogger, format, transports } from "winston";
import chalk from "chalk";
import { th } from "date-fns/locale";

const { combine, timestamp, label: addLabel, printf } = format;

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

class Logger {
  private log: Winston.Logger;

  constructor(options: LoggerOptions) {
    this.log = Winston.createLogger({
      level: "info",
      // format: Winston.format.json(),
      // format: log_format,
      transports: [
        new Winston.transports.Console({
          format: combine(mkTerminalFormat(options)),
        }),
      ],
    });
  }

  error(message: string) {
    this.log.error(message);
  }

  warn(message: string) {
    this.log.warn(message);
  }

  info(message: string) {
    this.log.info(message);
  }

  debug(message: string) {
    this.log.debug(message);
  }

  success(message: string) {
    this.log.info(chalk.green(`✔ ${message}`));
  }
}

export { Logger };
