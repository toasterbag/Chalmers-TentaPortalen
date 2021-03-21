"use strict";
exports.__esModule = true;
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
var Response = /** @class */ (function () {
    function Response(status) {
        this._status = status;
    }
    Response.prototype.status = function (status) {
        this._status = status;
        return this;
    };
    Response.prototype.json = function (obj) {
        this._data = obj;
        return this;
    };
    Response.prototype.send = function (res) {
        res.status(this._status);
        res.json(this._data);
    };
    return Response;
}());
exports.Response = Response;
function Ok(json) {
    return new Response(200).json(json);
}
exports.Ok = Ok;
//# sourceMappingURL=types.js.map