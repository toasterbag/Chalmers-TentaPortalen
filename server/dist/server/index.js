"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Response = exports.Ok = exports.Method = void 0;
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var chalk_1 = __importDefault(require("chalk"));
var types_1 = require("./types");
exports.Method = types_1.Method;
exports.Response = types_1.Response;
exports.Ok = types_1.Ok;
var logger_1 = require("../logger");
var Log = logger_1.makeLogger({ label: "Server" });
var method_colors = {
    GET: chalk_1["default"].green,
    POST: chalk_1["default"].blue,
    DELETE: chalk_1["default"].red,
    PUT: chalk_1["default"].cyan,
    PATCH: chalk_1["default"].yellow
};
var Server = /** @class */ (function () {
    function Server(state) {
        this.endpoints = [];
        this.state = state;
        this.app = express_1["default"]();
        this.app.use(express_1["default"].json());
    }
    Server.prototype.wrap_endpoint = function (endpoint) {
        var _this = this;
        return function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Log.info("Http request: " + req.path);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, endpoint.handler(req, this.state)];
                    case 2:
                        response = _a.sent();
                        response.send(res);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        if (e_1.http_code) {
                            res.status(e_1.http_code).send(e_1.description);
                        }
                        else {
                            res.status(500).send(e_1);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    };
    Server.prototype.route = function (endpoint) {
        this.endpoints.push(endpoint);
    };
    Server.prototype.serve = function (port) {
        Log.info(chalk_1["default"].yellow("Registering endpoints"));
        for (var _i = 0, _a = this.endpoints; _i < _a.length; _i++) {
            var endpoint = _a[_i];
            var method = endpoint.method;
            var path = endpoint.path;
            var handler = this.wrap_endpoint(endpoint);
            switch (method) {
                case types_1.Method.GET:
                    this.app.get(path, handler);
                case types_1.Method.POST:
                    this.app.post(path, handler);
                case types_1.Method.DELETE:
                    this.app["delete"](path, handler);
                case types_1.Method.PUT:
                    this.app.put(path, handler);
                case types_1.Method.PATCH:
                    this.app.patch(path, handler);
            }
            var colored_path = path.replace(/:([a-zA-Z]*)/g, function (e) { return ":" + chalk_1["default"].yellow(e.slice(1)); });
            var colored_method = Log.info("" + method_colors[method](method.padEnd(7)) + colored_path);
        }
        http_1["default"].createServer(this.app).listen(port, function () {
            Log.info("Webserver running on port " + port);
        });
    };
    return Server;
}());
exports["default"] = Server;
//# sourceMappingURL=index.js.map