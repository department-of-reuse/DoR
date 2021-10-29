import { Work, WorkFromJSON} from '@/clients/crossref';
import prefillData from '../assets/data/works-cache.json';
import { AuthorsCache } from './AuthorsCache'

type CacheResult = Work;

export class WorksCache {
    private static instance: WorksCache;
    private cache: { doi: string, result: Work }[] = [];
    private authorsCache = new AuthorsCache()

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
        
        // Prefill authors cache with data from works json
        const prefillAuthors = prefillWorks.flatMap(work => {return work.author})
        prefillAuthors.forEach( currentAuthor => this.authorsCache.set(currentAuthor))
    }

    public set = (doi: string, result: CacheResult): void => {
        if (!this.recordExists(doi)) {
            this.cache.push({
                doi,
                result
            });
            
            // Update authors cache with new author information
            result.author.forEach(author => this.authorsCache.set(author))
        }
    }

    public get = (doi: string): CacheResult | null => {
        const cacheRecord = this.cache.find(x => {
            return x.doi.toLowerCase() == doi.toLowerCase();
        });

        if (cacheRecord) {
            const hit = cacheRecord.result
            
            // Update work with latest author information from cache
            hit.author = hit.author.map(a => this.authorsCache.get(this.authorsCache.authorId(a))!)

            return hit;
        }

        return null;
    }

    public recordExists = (doi: string): boolean => {
        return this.get(doi) != null;
    }
}