import { Author, WorkMessage, Work } from "@/clients/crossref";
import { CachedWorksApi } from "@/tools/CachedWorksApi";
import CompoundSet from "@/tools/CompoundSet";
import { Histogram, HistogramEntry } from "@/tools/Histogram";
import Reuse from "./models/Reuse";

interface SimplifiedReuse {
    source: string, 
    dest: string
}

export default class RIndex {
    reuseData : Array<Reuse>;
    uniqueReuse : CompoundSet<SimplifiedReuse>;
    
    constructor(reuseData : Array<Reuse>) {
        this.reuseData = reuseData;
        this.uniqueReuse = new CompoundSet(this.reuseData
            .filter(item => item.reusedDOI.trim().length > 0)
            .map(item => {
                return {source: item.sourceDOI, dest: item.reusedDOI ? item.reusedDOI : item.alternativeID }
            }));
    }

    async computeCitationCountForWork(sourceDoi: string) : Promise<any> {
        const crWorksApi = new CachedWorksApi();

        const work = await crWorksApi.worksDoiGet({ doi: sourceDoi });
        return work.message.isReferencedByCount;
    }

    async computeAuthorsReusing() : Promise<Array<HistogramEntry<Author>>> {
        const crWorksApi = new CachedWorksApi();
        
        return Promise.all(Array.from(this.uniqueReuse).map(item => crWorksApi.worksDoiGet({doi: item.source})))
                .then(works => {
                    const authors = works.flatMap(w => w.message.author);
                    const histogram = new Histogram<Author>((a) => `${a.given} ${a.family}`, authors).histogram()
                    return histogram;
                })         
    }

    async computeAuthorsReused() : Promise<Array<HistogramEntry<Author>>> {
        const crWorksApi = new CachedWorksApi();
        
        return Promise.all(Array.from(this.uniqueReuse)
            .filter(item => item.dest.trim().length > 0)
            .map(item => crWorksApi.worksDoiGet({doi: item.dest}).catch(reason => {console.warn(`Could not resolve ${item.dest}.`)})))
                .then(works => {
                    const authors = works.filter(w => w != null).flatMap(w => (w as WorkMessage).message.author);
                    const histogram = new Histogram<Author>((a) => `${a.given} ${a.family}`, authors).histogram()
                    return histogram;
                })         
    }

    async computeWorksReusing() : Promise<Array<HistogramEntry<Work>>> {
        const crWorksApi = new CachedWorksApi();

        return Promise.all(Array.from(this.uniqueReuse)
                .map(item => crWorksApi.worksDoiGet({doi: item.source}).catch(reason => {console.warn(`Could not resolve ${item.dest}.`)})))
                .then(works => {
                    const validWorks = works.filter(w => w != null).map(w => (w as WorkMessage).message)
                    const histogram = new Histogram<Work>((w) => w.dOI, validWorks).histogram()
                    return histogram;
                })
    }

    async computeWorksReused() : Promise<Array<HistogramEntry<Work>>> {
        const crWorksApi = new CachedWorksApi();

        return Promise.all(Array.from(this.uniqueReuse)
                .map(item => crWorksApi.worksDoiGet({doi: item.dest}).catch(reason => {console.warn(`Could not resolve ${item.dest}.`)})))
                .then(works => {
                    const validWorks = works.filter(w => w != null).map(w => (w as WorkMessage).message)
                    const histogram = new Histogram<Work>((w) => w.dOI, validWorks).histogram()
                    return histogram;
                })
    }

}