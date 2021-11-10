import reuseJson from '../src/assets/data/reuse.json';
import previousWorksCacheJson from '../src/assets/data/works-cache.json';
import previousArxivCacheJson from '../src/assets/data/arxiv-cache.json';
import previousGithubCacheJson from '../src/assets/data/github-cache.json'

import { ReuseFromJson } from '../src/backend/models/Reuse';
import { Configuration, WorksApi, Work, WorkMessage, WorkToJSON, WorkFromJSON, Author } from '../src/clients/crossref';
import { QueryApi, Configuration as ArxivConfiguration, Feed, FeedFromJSON, FeedToJSON, TitleFromJSON } from '../src/clients/arxiv';
import { GithubCitationApi } from '../src/clients/github/GithubCitationApi';
import { CffFileResponse, CffFileResponseToJSON } from '../src/clients/github/model/CffFileResponse';
import fetch from "node-fetch";
import * as fs from 'fs';
import pThrottle from 'p-throttle';

console.log("Prefilling CrossRef resolution cache.")

const previousWorksCache = ((previousWorksCacheJson as Array<any>).map(WorkFromJSON));
const previousArxivCache = ((previousArxivCacheJson as Array<any>).map(FeedFromJSON));
const previousGithubCache = ((previousGithubCacheJson as Array<any>).map(item => item as CffFileResponse))

const reuseData = (reuseJson as Array<any>).map(ReuseFromJson);

const crossRef = new WorksApi(new Configuration({
    fetchApi: fetch
}));

const arxiv = new QueryApi(new ArxivConfiguration({
    fetchApi: fetch
}));

const github = new GithubCitationApi();

var authorsCache: { id: string, result: Author }[] = [];

function authorId(author: Author): string {
    return (author.given || "") + " " + (author.family || "") + " " + (author.name || "")
}

function addOrUpdateAuthorsCache(author: Author): void {

    let authorExists = authorsCache.some(elem => {return elem.id == authorId(author)})

    if(!authorExists){
        let item = {id: authorId(author), result: author}
        authorsCache.push( item )
    } else {
        let currentAuthor = authorsCache.find(elem => {return elem.id == authorId(author)}).result

        // Add affiliation from new author object if no affiliation with that name is known for current author
        author.affiliation.forEach( affiliation => {
            if(! currentAuthor.affiliation.some( currentAffiliation => {return currentAffiliation.name == affiliation.name})){
                currentAuthor.affiliation.push(affiliation)
                console.log("Updating author affiliation information: " + authorId(author))
            }
        })

        // Add ORCID of new author if no ORCID is known for current author
        if(author.oRCID && !currentAuthor.oRCID){
            currentAuthor.oRCID = author.oRCID
            console.log("Updating author ORCID information: " + authorId(author))
        }
    }
}

var worksCache: { doi: string, result: Work }[] = [];
var arxivCache: { id: string, result: Feed }[] = [];
var githubCache: { id: string, result: CffFileResponse}[] = [];

previousWorksCache.forEach( currentWork => {
    worksCache.push({doi: currentWork.dOI, result: currentWork});

    currentWork.author.forEach( currentAuthor => { addOrUpdateAuthorsCache(currentAuthor) });
});

console.log(`Reusing ${previousWorksCache.length} previously cached CrossRef items.`);

function cleanArxivId(id : string) : string {
    return id.replace("http://arxiv.org/abs/", "");
}

previousArxivCache.forEach( (currentFeed : Feed) => arxivCache.push( {id : cleanArxivId(currentFeed.entry.id), result: currentFeed} ));
console.log(`Reusing ${previousArxivCache.length} previously cached arXiv items.`);

previousGithubCache.forEach( entry => {
    githubCache.push( { id: entry.repoId, result: entry} )
})
console.log(`Reusing ${previousGithubCache.length} previously cached GitHub items.`);

const throttle = pThrottle({
    limit: 2,
    interval: 1000
})

const throttledWorksApi = throttle(currentDoi => {
    console.log(`Resolving ${currentDoi} ...`);
    return crossRef
        .worksDoiGet({ doi: currentDoi as string })
        .catch(reason => {
            console.warn("Could not resolve: " + currentDoi + " - Maybe not a DOI?"); 
        });
})

const throttledArxivApi = throttle(id => {
    return arxiv
        .queryById({ id: id as string })
        .catch(reason => {
            console.error("Could not resolve: " + id + " - Maybe is not an arXiv id? " + reason); 
        });
})

const throttledGithubApi = throttle(url => {
    let parts = (url as string).replace("https://github.com/", "").split("/")
    return github
        .queryCitationFile(parts[0].trim(), parts[1].trim())
        .catch(status => {
            if(status != '404'){
                console.error("Error retrieving citation file for repo " + (url as string) + ", got status code: " + status)
            }
        });
})

const githubArtefacts = Array.from(new Set(reuseData
    .map(entry => entry.alternativeID.trim())
    .filter(url => url.toLowerCase().startsWith("https://github.com/"))
    .filter(url => {
        let relPath = url.replace("https://github.com/", "")
        let parts = relPath.split("/")

        // Only keep links to valid github repos. Must be of form 'https://github.com/<owner>/<repo>[/]' (meaning the trailing slash is optional)
        if((parts.length == 2 && parts[0].trim().length > 0 && parts[1].trim().length > 0) ||
            (parts.length == 3 && parts[0].trim().length > 0 && parts[1].trim().length > 0 && parts[2].trim().length == 0)){
            // Valid link format, only keep this url if it is not already in the cache
            let id = parts[0].trim() + "/" + parts[1].trim()
            return githubCache.findIndex(item => item.id == id) == -1
        } else {
            // Invalid link format, ignore such urls
            return false
        }
    })))

console.log(`Resolving ${githubArtefacts.length} new github URL(s).`)

Promise.all(githubArtefacts.map(throttledGithubApi)).then( citations => {
    citations.forEach(response => {
        if(response != null && response != undefined){
            const  citation = response as CffFileResponse
            if(!githubCache.find(entry => entry.id == citation.repoId)){
                githubCache.push({id: citation.repoId, result: citation})
            }
        }
    })

    const outputObject = githubCache
        .map(entry => entry.result)
        .map(CffFileResponseToJSON)
        .map(o => JSON.stringify(o))
        .join(",");

    fs.writeFileSync('./src/assets/data/github-cache.json', "[" + outputObject + "]");
}).then(_ => console.log(`GitHub cache prefill complete. Wrote ${githubCache.length} item(s).`));

const dois = Array.from(new Set(reuseData
                .map(entry => entry.sourceDOI)
                .concat(reuseData.map(entry => entry.reusedDOI))
                .filter(doi => doi.trim() != "")))
                .filter(doi => worksCache.findIndex(item => {return item.doi.toLowerCase() == doi.toLowerCase()}) == -1)

console.log(`Resolving ${dois.length} new DOI(s).`);

Promise.all(dois.map(throttledWorksApi)).then(entries => {
    entries.forEach(entry => {
        if (entry != null) {
            const currentMessage = (entry as WorkMessage).message;
            if (!worksCache.find(x => (x.doi == currentMessage.dOI) )){
                worksCache.push({ doi: currentMessage.dOI, result: currentMessage })
                currentMessage.author.forEach(author => { addOrUpdateAuthorsCache(author) })
            }
               
        }
    })

    // Update all author information in worksCache using the authorsCache
    worksCache
        .map( entry => entry.result)
        .forEach( work => {
            work.author = work.author.map( author => {return authorsCache.find(elem => {return elem.id == authorId(author)}).result})
        })

    const outputObject = worksCache
        .map(entry => entry.result)
        .map(WorkToJSON)
        .map(o => JSON.stringify(o))
        .join(",");

    fs.writeFileSync('./src/assets/data/works-cache.json', "[" + outputObject + "]");

}).then(_ => console.log(`CrossRef cache prefill complete. Wrote ${worksCache.length} item(s).`));

const arxivIds = Array.from(new Set(reuseData
                                    .map(entry => entry.alternativeID)
                                    .filter(id => id.startsWith("arxiv:"))
                                    .map(id => id.replace("arxiv:", ""))
                                    .filter(id => arxivCache.findIndex(item => item.id.startsWith(id)) == -1)));

console.log(`Resolving ${arxivIds.length} new arXiv ID(s).`);           

arxivIds.forEach(x => console.log(x));

Promise.all(arxivIds.map(throttledArxivApi)).then(entries => {
    entries.forEach(feed => {
        if (feed != null) {
            const currentFeed = (feed as Feed);
            if (!arxivCache.find(x => { x.id == cleanArxivId(currentFeed.entry.id) }))
            arxivCache.push({ id: cleanArxivId(currentFeed.entry.id), result: currentFeed })
        }
    })

    const outputObject = arxivCache
        .map(entry => entry.result)
        .map(FeedToJSON)
        .map(o => JSON.stringify(o))
        .join(",");

    fs.writeFileSync('./src/assets/data/arxiv-cache.json', "[" + outputObject + "]");

}).then(_ => console.log(`ArXiv cache prefill complete. Wrote ${arxivCache.length} item(s).`));