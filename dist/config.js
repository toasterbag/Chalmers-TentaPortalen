"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build_config = void 0;
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const merge = (target, source) => {
    // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object)
            Object.assign(source[key], merge(target[key], source[key]));
    }
    // Join `target` and modified `source`
    Object.assign(target || {}, source);
    return target;
};
const assure_no_undefined = (obj, path = []) => {
    for (const [key, val] of Object.entries(obj)) {
        if (val === undefined) {
            throw new Error(`Missing config variable '${[...path, key].join(".")}'. Look at your config file.`);
        }
        else if (Object.prototype.toString.call(val) === "[object Object]") {
            assure_no_undefined(val, [...path, key]);
        }
    }
};
// Values with a default (not undefined) are optional in the config
const _default = {
    paths: {
        data: undefined,
        uploads: undefined,
        exam_sheet_temp: undefined,
    },
    postgres: {
        url: undefined,
    },
    host: "localhost",
    port: 8855,
    admin_password: undefined,
};
const build_config = async (path) => {
    const file = await fs_extra_1.readFile(path_1.join(process.cwd(), path));
    const json = JSON.parse(file.toString());
    const config = merge(_default, json);
    assure_no_undefined(config);
    return config;
};
exports.build_config = build_config;
//# sourceMappingURL=config.js.map