import { PrismaClient } from "@prisma/client";

class Config {
  DATA_SOURCE_URL: string;
  constructor() {
    if (process.env.DATA_SOURCE_URL === undefined) {
      throw new Error(`Missing env variable 'DATA_SOURCE_URL'`);
    }
    this.DATA_SOURCE_URL = process.env.DATA_SOURCE_URL;
  }
}

export default class Context {
  config: Config;
  prisma: PrismaClient;
  constructor() {
    this.config = new Config();
    this.prisma = new PrismaClient();
  }
  static async initialize(): Promise<Context> {
    return new Context();
  }
}
