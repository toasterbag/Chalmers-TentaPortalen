import { PrismaClient } from "@prisma/client";

class Config {
  ADMIN_PASSWORD: string;
  DATASHEET_TEMP_PATH: string;
  constructor() {
    if (process.env.ADMIN_PASSWORD === undefined) {
      throw new Error(`Missing env variable 'ADMIN_PASSWORD'`);
    }
    this.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (process.env.DATASHEET_TEMP_PATH === undefined) {
      throw new Error(`Missing env variable 'DATASHEET_TEMP_PATH'`);
    }
    this.DATASHEET_TEMP_PATH = process.env.DATASHEET_TEMP_PATH;
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
