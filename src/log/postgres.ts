import { LogCallback } from "winston";
import Transport, {
  TransportStreamOptions as TransportOptions,
} from "winston-transport";
import { PrismaClient } from "@app/prisma/clients/restricted";
import { JsonObject } from "@app/utils/json";

const FLUSH_INTERVAL = 10_000;

interface Entry {
  timestamp: Date;
  level: string;
  msg: string | null;
  meta: JsonObject;
}

export class PostgresLogger extends Transport {
  private queue: Array<Entry> = [];

  private prisma: PrismaClient;

  constructor(prisma: PrismaClient, options: TransportOptions = {}) {
    super(options);
    this.prisma = prisma;

    setInterval(() => this.flush(), FLUSH_INTERVAL);
  }

  private async flush() {
    if (this.queue.isEmpty()) {
      return;
    }
    await this.prisma.log.createMany({
      data: this.queue as any,
    });
    this.queue = [];
  }

  log(data: any, callback: LogCallback) {
    this.queue.push({
      timestamp: new Date(),
      level: data.level,
      msg: data.message,
      meta: data.metadata,
    });
    callback();
  }
}
