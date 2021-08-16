"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = exports.Ok = exports.Method = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const multer_1 = __importDefault(require("multer"));
const chalk_1 = __importDefault(require("chalk"));
const cors_1 = __importDefault(require("cors"));
const types_1 = require("./types");
Object.defineProperty(exports, "Method", { enumerable: true, get: function () { return types_1.Method; } });
Object.defineProperty(exports, "Response", { enumerable: true, get: function () { return types_1.Response; } });
Object.defineProperty(exports, "Ok", { enumerable: true, get: function () { return types_1.Ok; } });
const logger_1 = require("../logger");
const table_1 = require("./table");
const utils_1 = require("../utils");
const Log = new logger_1.Logger({ label: "API" });
const color_method = (method) => {
    switch (method) {
        case "GET":
            return chalk_1.default.green;
        case "POST":
            return chalk_1.default.blue;
        case "DELETE":
            return chalk_1.default.red;
        case "PUT":
            return chalk_1.default.cyan;
        case "PATCH":
            return chalk_1.default.yellow;
        default:
            return chalk_1.default.white;
    }
};
const color_status = (method) => {
    switch ((method / 100).floor()) {
        case 2:
            return chalk_1.default.green;
        case 3:
            return chalk_1.default.blue;
        case 4:
            return chalk_1.default.yellow;
        case 5:
            return chalk_1.default.red;
        default:
            return chalk_1.default.white;
    }
};
const logger_middleware = (req, res, next) => {
    const method = `${color_method(req.method)(req.method.padEnd(5))}`;
    Log.info(`${method} <-  ${req.path}`);
    res.on("finish", function () {
        const status = color_status(res.statusCode)(res.statusCode);
        Log.info(`${method} ${status} ${req.path}`);
    });
    next();
};
class Server {
    constructor({ state, mount_path = "/" }) {
        this.endpoints = [];
        this.state = state;
        this.mount_path = mount_path;
        this.app = express_1.default();
        this.app.use(express_1.default.json());
        this.app.use(cors_1.default());
        this.app.use(logger_middleware);
    }
    wrap_endpoint(endpoint) {
        return async (req, res) => {
            if (endpoint.auth?.includes("admin")) {
                if (req.headers.authorization != this.state.config.admin_password &&
                    req.body.password != this.state.config.admin_password) {
                    res.status(401).send();
                    return;
                }
            }
            try {
                const response = await endpoint.handler(req, this.state);
                response.send(res);
            }
            catch (e) {
                if (e.http_code) {
                    console.error(e);
                    res.status(e.http_code).send(e.description);
                }
                else {
                    console.error(e);
                    res.status(500).send(e);
                }
            }
        };
    }
    register_route(endpoint) {
        this.endpoints.push(endpoint);
    }
    async import_routes() {
        const routes = (await utils_1.find(path_1.join(__dirname, "../routes"), ".js")).map((f) => Promise.resolve().then(() => __importStar(require(f))));
        const modules = (await Promise.all(routes))
            .flatMap((m) => Object.values(m))
            .filter((route) => route.method && route.path && route.handler);
        modules
            .filter((e) => !e.path.includes(":"))
            .sort((a, b) => {
            return a.path.localeCompare(b.path) || a.method.localeCompare(b.method);
        })
            .forEach((r) => this.register_route(r));
        modules
            .filter((e) => e.path.includes(":"))
            .sort((a, b) => {
            return a.path.localeCompare(b.path) || a.method.localeCompare(b.method);
        })
            .forEach((r) => this.register_route(r));
    }
    mount(http_server) {
        const uploads = multer_1.default({ dest: this.state.config.paths.uploads });
        const routes = [];
        for (const endpoint of this.endpoints) {
            const method = endpoint.method;
            const path = path_1.join(this.mount_path, endpoint.path);
            const handler = this.wrap_endpoint(endpoint);
            const callbacks = endpoint.middleware ?? [];
            // Add file upload middleware
            if (endpoint.uploads) {
                for (const [key, val] of Object.entries(endpoint.uploads)) {
                    switch (val) {
                        case "single":
                            callbacks.push(uploads.single(key));
                            break;
                        case "array":
                            callbacks.push(uploads.array(key));
                            break;
                    }
                }
            }
            callbacks.push(handler);
            switch (method) {
                case types_1.Method.GET:
                    this.app.get(path, ...callbacks);
                    break;
                case types_1.Method.POST:
                    this.app.post(path, ...callbacks);
                    break;
                case types_1.Method.DELETE:
                    this.app.delete(path, ...callbacks);
                    break;
                case types_1.Method.PUT:
                    this.app.put(path, ...callbacks);
                    break;
                case types_1.Method.PATCH:
                    this.app.patch(path, ...callbacks);
                    break;
            }
            const colored_path = path.replace(/:([a-zA-Z]*)/g, (e) => ":" + chalk_1.default.yellow(e.slice(1)));
            const colored_method = `${color_method(method)(method.padEnd(7))}`;
            routes.push({ method: colored_method, path: colored_path });
        }
        table_1.print_table("Registered endpoints", ["method", "path"], routes);
        http_server.addListener("request", this.app);
    }
}
exports.default = Server;
//# sourceMappingURL=index.js.map