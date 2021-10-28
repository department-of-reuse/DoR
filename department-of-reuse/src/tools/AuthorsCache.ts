import { Author } from '@/clients/crossref';
import prefillData from '../assets/data/works-cache.json';

type CacheResult = Author;

export class AuthorsCache {
    private static instance: AuthorsCache;
    private cache: { id: string, result: Author }[] = [];

    constructor() {
        if (AuthorsCache.instance != null) {
            return AuthorsCache.instance;
        }

        AuthorsCache.instance = this;

        return this;
    }

    public set = (result: CacheResult): void => {
        this.setInternal(this.authorId(result), result)
    }

    public setInternal = (id: string, result: CacheResult): void => {
        if (!this.recordExists(id)) {
            this.cache.push({
                id,
                result
            });
        } else {
            const existingEntry = this.get(id)!

            // Add affiliation from new author object if no affiliation with that name is known for current author
            result.affiliation.forEach( affiliation => {
                if(! existingEntry.affiliation.some( currentAffiliation => {return currentAffiliation.name == affiliation.name})){
                    existingEntry.affiliation.push(affiliation)
                }
            })

            // Add ORCID of new author if no ORCID is known for current author
            if(result.oRCID && !existingEntry.oRCID){
                existingEntry.oRCID = result.oRCID
            }
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

    public authorExists = (author: Author): boolean => {
        return this.recordExists(this.authorId(author))
    }

    public authorId(author: Author): string {
        return (author.given || "") + " " + (author.family || "") + " " + (author.name || "")
    }
}