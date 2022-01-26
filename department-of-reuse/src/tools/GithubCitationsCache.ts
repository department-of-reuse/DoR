import { Work, WorkFromJSON} from '@/clients/crossref';
import { CffFile, CffFileResponse } from '@/clients/github/model/CffFileResponse';
import prefillData from '../assets/data/github-cache.json';
import { AuthorsCache } from './AuthorsCache'

type CacheResult = CffFileResponse;

export class GithubCitationsCache {
    private static instance: GithubCitationsCache;
    private cache: { id: string, result: CffFileResponse }[] = [];

    constructor() {
        if (GithubCitationsCache.instance != null) {
            return GithubCitationsCache.instance;
        }

        this.prefill();
        GithubCitationsCache.instance = this;

        return this;
    }

    private prefill() {
        const prefillCitations = ((prefillData as Array<any>).map(entry => entry as CffFileResponse));
        prefillCitations.forEach( currentCitation => this.set(currentCitation.repoId, currentCitation));
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
            return x.id.toLowerCase() == id.toLowerCase();
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