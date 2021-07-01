import { Context } from "@app/context";
import { Logger } from "@app/logger";
const CacheLogger = new Logger({ label: "Cache" });

const NS_PER_MS = 1e6;

type CacheUpdateFn<T> = (ctx: Context) => Promise<T>;
type AsyncCacheUpdatePredicate = (t: Date) => Promise<boolean>;
type SyncCacheUpdatePredicate = (t: Date) => boolean;
type CacheUpdatePredicate =
  | AsyncCacheUpdatePredicate
  | SyncCacheUpdatePredicate;

/// A cached value.
export class Cache<T> {
  private title: string;
  private _value: T;
  private timestamp: Date;
  private updateHandler: CacheUpdateFn<T>;
  private shouldUpdate: CacheUpdatePredicate;
  private ctx: Context;

  constructor(args: {
    /// The name used for logging.
    title: string;
    /// The initial value
    initial: T;
    /// The value update function
    updater: CacheUpdateFn<T>;
    /// The predicate for if the cached value needs updating
    shouldUpdate: CacheUpdatePredicate;
    /// The application context.
    ctx: Context;
  }) {
    this.title = args.title;
    this.updateHandler = args.updater;
    this.shouldUpdate = args.shouldUpdate;
    this._value = args.initial;
    this.timestamp = new Date();
    this.ctx = args.ctx;
  }

  // Get the cached value, updating the value before returning if the update predicate returns true.
  async get(): Promise<T> {
    if (await this.shouldUpdate(this.timestamp)) {
      await this.update();
    }
    return this._value;
  }

  /// Force the cache to update.
  async update(): Promise<void> {
    const start = process.hrtime();
    CacheLogger.info(`Updating '${this.title}'`);
    this._value = await this.updateHandler(this.ctx);
    this.timestamp = new Date();
    const diff = process.hrtime(start);
    CacheLogger.info(
      `Updating '${this.title}' took ${diff[0]}.${diff[1]
        .div(NS_PER_MS)
        .round()}s`,
    );
  }

  /// Gets when the cache was last updated.
  async lastUpdated(): Promise<Date> {
    return this.timestamp;
  }
}
