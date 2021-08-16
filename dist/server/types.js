"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Method = exports.Response = exports.Ok = void 0;
var Method;
(function (Method) {
    Method["GET"] = "GET";
    Method["POST"] = "POST";
    Method["PUT"] = "PUT";
    Method["DELETE"] = "DELETE";
    Method["PATCH"] = "PATCH";
})(Method || (Method = {}));
exports.Method = Method;
class Response {
    constructor(status, body = {}) {
        this._status = status;
        this.body = body;
    }
    status(status) {
        this._status = status;
        return this;
    }
    json(obj) {
        this.body = obj;
        return this;
    }
    send(res) {
        res.status(this._status);
        res.json(this.body);
    }
}
exports.Response = Response;
function Ok(json = {}) {
    return new Response(200).json(json);
}
exports.Ok = Ok;
//# sourceMappingURL=types.js.map