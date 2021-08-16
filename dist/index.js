"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./global");
const config_1 = require("./config");
const context_1 = require("./context");
const server_1 = __importDefault(require("./server"));
const http_1 = __importDefault(require("http"));
const node_fs_1 = require("node:fs");
const commander_1 = require("commander");
const logger_1 = require("./logger");
const chalk_1 = __importDefault(require("chalk"));
const study_portal_1 = require("./import/study_portal");
const manifest_file = node_fs_1.readFileSync("./package.json");
const manifest = JSON.parse(manifest_file.toString());
const Log = new logger_1.Logger({ label: manifest.name });
commander_1.program
    .version(manifest.version)
    .option("-c, --config <path>", "config path", "./config.json")
    .option("-s, --scrape", "run the scraper before starting")
    .parse();
const main = async () => {
    const options = commander_1.program.opts();
    const config = await config_1.build_config(options.config);
    const ctx = await context_1.Context.initialize(config);
    const server = new server_1.default({
        state: ctx,
        mount_path: "/api/v1",
    });
    if (options.scrape) {
        await study_portal_1.scrape_everything(ctx);
    }
    // All routes found in .ts files in ./routes and subdirectories
    // are dynamically imported.
    await server.import_routes();
    const http_server = http_1.default.createServer();
    server.mount(http_server);
    http_server.listen({ host: ctx.config.host, port: ctx.config.port }, () => {
        Log.info(`Webserver listening on ${chalk_1.default.red("localhost")}:${chalk_1.default.yellow(ctx.config.port)}`);
    });
};
main().catch((e) => console.error(e));
//.then(() => process.exit(0));
//# sourceMappingURL=index.js.map