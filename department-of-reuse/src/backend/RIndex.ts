import { Author, WorkMessage, Work } from "@/clients/crossref";
import { CachedWorksApi } from "@/tools/CachedWorksApi";
import { CachedGithubApi } from "@/tools/CachedGithubApi";
import CompoundSet from "@/tools/CompoundSet";
import { Histogram, HistogramEntry } from "@/tools/Histogram";
import Reuse from "./models/Reuse";
import { IsValidGithubRepoUrl } from "@/clients/github/model/CffFileResponse";

interface SimplifiedReuse {
    source: string, 
    dest: string,
    destIsDoi: boolean
}

export default class RIndex {
    reuseData : Array<Reuse>;
    uniqueReuse : CompoundSet<SimplifiedReuse>;
    
    constructor(reuseData : Array<Reuse>) {
        this.reuseData = reuseData;
        this.uniqueReuse = new CompoundSet(this.reuseData
            .filter(item => item.reusedDOI.trim().length > 0 || item.alternativeID.trim().length > 0)
            .map(item => {
                if(item.reusedDOI.trim().length > 0){
                    return {source: item.sourceDOI, dest: item.reusedDOI.trim(), destIsDoi: true }
                } else {
                    return {source: item.sourceDOI, dest: item.alternativeID.trim(), destIsDoi: false }
                }
                
            }));
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
        const ghCitationApi = new CachedGithubApi();
        
        return Promise.all(Array.from(this.uniqueReuse)
            .filter(item => item.dest.trim().length > 0)
            .filter(item => item.destIsDoi || IsValidGithubRepoUrl(item.dest)) // We are only able to handle either DOI or GitHub reuse here, not Arxiv
            .map(item => {
                if(item.destIsDoi){
                    console.log("DOI")
                    return crWorksApi.worksDoiGet({doi: item.dest}).then(work => work.message.author, reason => {
                        console.warn(`Could not resolve ${item.dest}.`)
                        return []
                    })
                } else {
                    
                    return ghCitationApi.queryCitationFileByUrl(item.dest.trim()).then(citationResponse => {
                        return citationResponse.cffFile.authors.map( cffAuthor => {
                            return {"given": cffAuthor["given-names"], "family": cffAuthor["family-names"], "oRCID": cffAuthor.orcid} as Author
                        })
                    }, () => {return []})
                }
            })).then(authors => {
                const allAuthors = authors.flatMap(a => a)
                const histogram = new Histogram<Author>((a) => `${a.given} ${a.family}`, allAuthors).histogram()
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
                .filter(item => item.destIsDoi) // We are only able to handle doi Reuse here, since there is (for now) no common interface between 'Work' and 'CffFile'
                .map(item => crWorksApi.worksDoiGet({doi: item.dest}).catch(reason => {console.warn(`Could not resolve ${item.dest}.`)})))
                .then(works => {
                    const validWorks = works.filter(w => w != null).map(w => (w as WorkMessage).message)
                    const histogram = new Histogram<Work>((w) => w.dOI, validWorks).histogram()
                    return histogram;
                })
    }

}