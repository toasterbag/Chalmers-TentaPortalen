import { Logger } from "@app/logger";

const CacheLogger = new Logger({ label: "Cache" });

const NS_PER_MS = 1e6;

type CacheUpdateFn<T> = () => Promise<T>;
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

  private shouldUpdate: CacheUpdatePredicate = () => true;

  private updater: CacheUpdateFn<T> | undefined = undefined;

  // Default: 5 minutes
  private updateInterval: number = 1000 * 60 * 5;

  constructor(args: {
    /// The name used for logging.
    title: string;
    /// The initial value
    initial: T;
    /// The predicate for if the cached value needs updating
    shouldUpdate?: CacheUpdatePredicate;
    /// How often in seconds we will check if the cache needs updating in milliseconds
    updateInterval?: number;

    updater?: CacheUpdateFn<T> | undefined;
  }) {
    this.title = args.title;
    this.shouldUpdate = args.shouldUpdate ?? this.shouldUpdate;
    this.updateInterval = args.updateInterval ?? this.updateInterval;
    this._value = args.initial;
    this.timestamp = new Date();
    if (args.updater) {
      this.start(args.updater);
    }
  }

  async start(updater: CacheUpdateFn<T>): Promise<void> {
    if (this.updater !== undefined) return;

    this.updater = updater;
    return new Promise((resolve) => {
      setInterval(async () => {
        await this.update();
        resolve();
      }, this.updateInterval);
    });
  }

  // Get the cached value, updating the value before returning if the update predicate returns true.
  async get(): Promise<T> {
    // if (await this.shouldUpdate(this.timestamp)) {
    //   await this.update();
    // }
    return this._value;
  }

  async update(): Promise<void> {
    if (!this.updater) return;
    const start = process.hrtime();
    this._value = await this.updater();
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
