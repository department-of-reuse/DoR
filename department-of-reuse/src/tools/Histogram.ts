export interface HistogramEntry<T> {
    entry: T;
    frequency: number;
}

export class Histogram<T> {
    private set: Map<String, T>
    private histo: Map<String, number>
    private toKey: (value: T) => string; 

    constructor(toKey: (value : T) => string, initial: T[] = []) {
        this.set = new Map();
        this.histo = new Map();
        this.toKey = (toKey != null) ? toKey :  (value : T) => { return JSON.stringify(value)};

        initial.forEach(entry => this.add(entry));
    }

    add(value: T) {
        const key = this.toKey(value);
        if(this.set.has(key)) {
            this.histo.set(key, this.histo.get(key)! + 1);
        } else {
            this.set.set(key, value);
            this.histo.set(key, 1);
        }
    }

    subtract(value: T) {
        const key = this.toKey(value);
        if(this.set.has(key)) {
            const currentCount = this.histo.get(key)!;
            if (currentCount <= 1) {
                this.set.delete(key);
                this.histo.delete(key);
            } else {
                this.histo.set(key, currentCount - 1);
            }
        }
    }


    histogram() : Array<HistogramEntry<T>> {
       return Array.from(this.set.keys()).map(key => { return { entry: this.set.get(key)!, frequency: this.histo.get(key)!}}).sort((a,b) => { return b.frequency - a.frequency })
    }

}