import winston, { Logger as WinstonLogger, transport, format } from "winston";
import { PrismaClient } from "@app/prisma/clients/restricted";
import { JsonObject } from "@app/utils/json";
import { PostgresLogger } from "./postgres";

interface LogConfig {
  disable_console: boolean;
  meta: LogMeta;
}

interface LogMeta {
  mode: string;
  version: string;
  node_version: string;
}

type Metadata = JsonObject;
export class Logger {
  private static logger: WinstonLogger;

  private static global_meta: LogMeta;

  readonly metadata: Metadata;

  static init(prisma: PrismaClient, config: LogConfig) {
    Logger.global_meta = config.meta;

    const transports: Array<transport> = [new PostgresLogger(prisma)];
    if (!config.disable_console)
      transports.push(
        new winston.transports.Console({
          format: format.json({ space: 2 }),
        }),
      );

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
      metadata: { ...this.metadata, ...meta, timestamp: new Date() },
    });
  }

  warn(message: string, meta: Metadata = {}) {
    Logger.logger.log({
      level: "warn",
      message,
      metadata: { ...this.metadata, ...meta, timestamp: new Date() },
    });
  }

  info(message: string, meta: Metadata = {}) {
    Logger.logger.log({
      level: "info",
      message,
      metadata: { ...this.metadata, ...meta, timestamp: new Date() },
    });
  }

  debug(message: string, meta: Metadata = {}) {
    Logger.logger.log({
      level: "debug",
      message,
      metadata: { ...this.metadata, ...meta, timestamp: new Date() },
    });
  }
}

export type LoggerType = typeof Logger;
