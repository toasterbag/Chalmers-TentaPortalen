"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const logger_1 = require("../../logger");
const CacheLogger = new logger_1.Logger({ label: "Cache" });
const NS_PER_MS = 1e6;
/// A cached value.
class Cache {
    constructor(args) {
        this.title = args.title;
        this.updateHandler = args.updater;
        this.shouldUpdate = args.shouldUpdate;
        this._value = args.initial;
        this.timestamp = new Date();
        this.ctx = args.ctx;
    }
    // Get the cached value, updating the value before returning if the update predicate returns true.
    async get() {
        if (await this.shouldUpdate(this.timestamp)) {
            await this.update();
        }
        return this._value;
    }
    /// Force the cache to update.
    async update() {
        const start = process.hrtime();
        this._value = await this.updateHandler(this.ctx);
        this.timestamp = new Date();
        const diff = process.hrtime(start);
        CacheLogger.info(`Updating '${this.title}' took ${diff[0]}.${diff[1]
            .div(NS_PER_MS)
            .round()}s`);
    }
    /// Gets when the cache was last updated.
    async lastUpdated() {
        return this.timestamp;
    }
}
exports.Cache = Cache;
//# sourceMappingURL=index.js.map