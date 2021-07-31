import { Work, WorkFromJSON} from '@/clients/crossref';
import prefillData from '../assets/data/works-cache.json';

type CacheResult = Work;

export class WorksCache {
    private static instance: WorksCache;
    private cache: { doi: string, result: Work }[] = [];

    constructor() {
        if (WorksCache.instance != null) {
            return WorksCache.instance;
        }

        this.prefill();
        WorksCache.instance = this;

        return this;
    }

    private prefill() {
        const prefillWorks = ((prefillData as Array<any>).map(WorkFromJSON));
        prefillWorks.forEach( currentWork => this.set(currentWork.dOI, currentWork));
    }

    public set = (doi: string, result: CacheResult): void => {
        if (!this.recordExists(doi)) {
            this.cache.push({
                doi,
                result
            });
        }
    }

    public get = (doi: string): CacheResult | null => {
        const cacheRecord = this.cache.find(x => {
            return x.doi.toLowerCase() == doi.toLowerCase();
        });

        if (cacheRecord) {
            return cacheRecord.result;
        }

        return null;
    }

    public recordExists = (doi: string): boolean => {
        return this.get(doi) != null;
    }
}