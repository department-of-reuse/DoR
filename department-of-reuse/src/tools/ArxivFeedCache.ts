import { Feed, FeedFromJSON } from "@/clients/arxiv";
import prefillData from '../assets/data/arxiv-cache.json';

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

    
    private prefill() {
        const prefillWorks = ((prefillData as Array<any>).map(FeedFromJSON));
        prefillWorks.forEach( currentFeed => this.set(currentFeed.entry.id, currentFeed));
    }
    
   
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
            return x.id.startsWith(id);
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