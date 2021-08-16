"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_2 = require("winston");
const { combine, timestamp, label: addLabel, printf } = winston_2.format;
const chalk_1 = __importDefault(require("chalk"));
const mkTerminalFormat = (options) => printf(({ level, message, label, timestamp }) => {
    if (level == "error") {
        const prefix = chalk_1.default.red(`✖ ${chalk_1.default.underline("Error")}`);
        message = chalk_1.default.red(`${prefix} ${message}`);
    }
    message = `[${chalk_1.default.blue(options.label)}] ${message}`;
    return `${message}`;
});
class Logger {
    constructor(options) {
        this.log = winston_1.default.createLogger({
            level: "info",
            //format: Winston.format.json(),
            //format: log_format,
            transports: [
                new winston_1.default.transports.Console({
                    format: combine(mkTerminalFormat(options)),
                }),
            ],
        });
    }
    error(message) {
        this.log.error(message);
    }
    warn(message) {
        this.log.warn(message);
    }
    info(message) {
        this.log.info(message);
    }
    debug(message) {
        this.log.debug(message);
    }
    success(message) {
        this.log.info(chalk_1.default.green(`✔ ${message}`));
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map