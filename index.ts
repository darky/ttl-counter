export interface TTLCounterOptions {
  /**
   * TTL in ms, when counter expired
   */
  ttl: number;
  /**
   * Count for `cb` call
   */
  countForCb: number;
  /**
   * Callback, which will be call after reach `countForCb`
   */
  cb: (counterId: string) => any;
}

export class TTLCounter {
  private counters = new Map<string, number>();
  private ttlTimers = new Map<string, number>();

  constructor(private options: TTLCounterOptions) {}

  /**
   * Increment counter with `counterId`
   */
  public count(counterId: string) {
    let countPerId = this.counters.get(counterId) || 0;
    if (countPerId === 0) {
      this.ttlTimers.set(
        counterId,
        setTimeout(() => {
          this.cleanCounter(counterId);
        }, this.options.ttl)
      );
    }
    countPerId++;
    if (countPerId >= this.options.countForCb) {
      this.cleanCounter(counterId);
      this.options.cb(counterId);
    } else {
      this.counters.set(counterId, countPerId);
    }
  }

  private cleanCounter(counterId: string) {
    clearTimeout(this.ttlTimers.get(counterId));
    this.ttlTimers.delete(counterId);
    this.counters.delete(counterId);
  }
}
