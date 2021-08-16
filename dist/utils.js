"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.date_to_academic_year = exports.Queue = exports.sleep = exports.find = void 0;
const date_fns_1 = require("date-fns");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const sleep = async (t) => new Promise((resolve) => {
    setTimeout(resolve, t);
});
exports.sleep = sleep;
const date_to_academic_year = (date) => date_fns_1.getMonth(date) > 7
    ? `${date_fns_1.getYear(date)}/${date_fns_1.getYear(date) + 1}`
    : `${date_fns_1.getYear(date) - 1}/${date_fns_1.getYear(date)}`;
exports.date_to_academic_year = date_to_academic_year;
class Queue {
    constructor(items = []) {
        this.queue = [];
        this.output = [];
        this.queue = items;
    }
    steal() {
        if (this.queue.length == 0) {
            return undefined;
        }
        return this.queue.splice(-1)[0];
    }
    async start(fn, concurrency = 4) {
        const workers = Array(concurrency)
            .fill(0)
            .map(async () => this.spawn_worker(fn));
        return Promise.all(workers).then(() => this.output);
    }
    async spawn_worker(fn) {
        let item = undefined;
        while ((item = this.steal()) && item !== undefined) {
            const res = await fn(item);
            this.output.push(res);
        }
    }
}
exports.Queue = Queue;
const find = async (path, ext) => {
    const items = await fs_extra_1.readdir(path);
    const pending_stats = items
        .map((p) => path_1.resolve(path, p))
        .map(async (p) => ((await fs_extra_1.stat(p)).isDirectory() ? exports.find(p) : [p]));
    const stats = await Promise.all(pending_stats);
    const res = stats.reduce((a, f) => [...a, ...f], []);
    if (ext) {
        return res.filter((s) => s.endsWith(ext));
    }
    return res;
};
exports.find = find;
//# sourceMappingURL=utils.js.map