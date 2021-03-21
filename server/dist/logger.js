"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.makeLogger = void 0;
var winston_1 = __importDefault(require("winston"));
var winston_2 = require("winston");
var combine = winston_2.format.combine, timestamp = winston_2.format.timestamp, addLabel = winston_2.format.label, printf = winston_2.format.printf;
var chalk_1 = __importDefault(require("chalk"));
var mkTerminalFormat = function (options) {
    return printf(function (_a) {
        var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp;
        if (level == "error") {
            var prefix = chalk_1["default"].red("\u2716 " + chalk_1["default"].underline("Error"));
            message = chalk_1["default"].red(prefix + " " + message);
        }
        message = "[" + chalk_1["default"].blue(options.label) + "] " + message;
        return "" + message;
    });
};
var makeLogger = function (options) {
    return winston_1["default"].createLogger({
        level: "info",
        //format: Winston.format.json(),
        //format: log_format,
        transports: [
            new winston_1["default"].transports.Console({
                format: combine(mkTerminalFormat(options))
            }),
        ]
    });
};
exports.makeLogger = makeLogger;
//# sourceMappingURL=logger.js.map