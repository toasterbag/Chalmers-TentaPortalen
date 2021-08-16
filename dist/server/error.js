"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestError = void 0;
class RequestError extends Error {
    constructor(code, description) {
        super();
        this.http_code = code;
        this.description = description;
    }
}
exports.RequestError = RequestError;
//# sourceMappingURL=error.js.map