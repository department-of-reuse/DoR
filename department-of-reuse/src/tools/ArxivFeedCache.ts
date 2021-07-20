import { Feed } from "@/clients/arxiv";

type CacheResult = Feed;

export class ArxivFeedCache {
    private static instance: ArxivFeedCache;
    private cache: { id: string, result: CacheResult }[] = [];

    constructor() {
        if (ArxivFeedCache.instance != null) {
            return ArxivFeedCache.instance;
        }

        //this.prefill();
        ArxivFeedCache.instance = this;

        return this;
    }

    /*
    private prefill() {
        const prefillWorks = ((prefillData as Array<any>).map(WorkFromJSON));
        prefillWorks.forEach( currentWork => this.set(currentWork.dOI, currentWork));
    }
    */
   
    public set = (id: string, result: CacheResult): void => {
        if (!this.recordExists(id)) {
            this.cache.push({
                id,
                result
            });
        }
    }

    public get = (id: string): CacheResult | null => {
        const cacheRecord = this.cache.find(x => {
            return x.id == id;
        });

        if (cacheRecord) {
            return cacheRecord.result;
        }

        return null;
    }

    public recordExists = (id: string): boolean => {
        return this.get(id) != null;
    }
}