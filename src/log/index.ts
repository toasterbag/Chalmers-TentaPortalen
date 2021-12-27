import winston, { Logger as WinstonLogger, transport } from "winston";
import { PrismaClient } from "@prisma/client";
import { PostgresLogger } from "./postgres";

interface LogConfig {
  disable_console: boolean;
  meta: LogMeta;
}

interface LogMeta {
  env: string;
  version: string;
  node_version: string;
}

type Metadata = { [key: string]: string | number | boolean | Date };

export class Logger {
  private static logger: WinstonLogger;

  private static global_meta: LogMeta;

  readonly metadata: Metadata;

  static init(prisma: PrismaClient, config: LogConfig) {
    Logger.global_meta = config.meta;

    const transports: Array<transport> = [new PostgresLogger(prisma)];
    if (!config.disable_console)
      transports.push(new winston.transports.Console());

    Logger.logger = winston.createLogger({
      transports,
    });
  }

  constructor(meta: Metadata = {}) {
    if (Logger.logger === undefined) {
      throw Error(
        "Logger has not ben initialized yet, have you called 'Logger.init()'?",
      );
    }

    this.metadata = { ...Logger.global_meta, ...meta };
  }

  extend(meta: Metadata = {}) {
    return new Logger({ ...this.metadata, ...meta });
  }

  error(message: string, meta: Metadata = {}) {
    Logger.logger.log({
      level: "error",
      message,
      metadata: { ...this.metadata, ...meta },
    });
  }

  warn(message: string, meta: Metadata = {}) {
    Logger.logger.log({
      level: "warn",
      message,
      metadata: { ...this.metadata, ...meta },
    });
  }

  info(message: string, meta: Metadata = {}) {
    Logger.logger.log({
      level: "info",
      message,
      metadata: { ...this.metadata, ...meta },
    });
  }

  debug(message: string, meta: Metadata = {}) {
    Logger.logger.log({
      level: "debug",
      message,
      metadata: { ...this.metadata, ...meta },
    });
  }
}
