export default class CompoundSet<T> {
    private set: Map<string, T>;

    constructor(initial: T[] = []) {
      this.set = new Map(initial.map(val => [this.toKey(val), val]));
    }

    has(val: T): boolean {
      return this.set.has(this.toKey(val));
    }

    add(val: T): this {
      this.set.set(this.toKey(val), val);
      return this;
    }

    delete(val: T): this {
      this.set.delete(this.toKey(val));
      return this;
    }

    [Symbol.iterator]() {
      return this.set.values();
    }

    get size() {
      return this.set.size;
    }

    private toKey(val: T): string {
      return JSON.stringify(val);
    }
  }