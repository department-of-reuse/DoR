import reuseJson from '../src/assets/data/reuse.json';
import previousWorksCacheJson from '../src/assets/data/works-cache.json';
import previousArxivCacheJson from '../src/assets/data/arxiv-cache.json';

import { ReuseFromJson } from '../src/backend/models/Reuse';
import { Configuration, WorksApi, Work, WorkMessage, WorkToJSON, WorkFromJSON } from '../src/clients/crossref';
import { QueryApi, Configuration as ArxivConfiguration, Feed, FeedFromJSON, FeedToJSON } from '../src/clients/arxiv';
import fetch from "node-fetch";
import * as fs from 'fs';
import pThrottle from 'p-throttle';

console.log("Prefilling CrossRef resolution cache.")

const previousWorksCache = ((previousWorksCacheJson as Array<any>).map(WorkFromJSON));
const previousArxivCache = ((previousArxivCacheJson as Array<any>).map(FeedFromJSON));

const reuseData = (reuseJson as Array<any>).map(ReuseFromJson);

const crossRef = new WorksApi(new Configuration({
    fetchApi: fetch
}));

const arxiv = new QueryApi(new ArxivConfiguration({
    fetchApi: fetch
}));

var worksCache: { doi: string, result: Work }[] = [];
var arxivCache: { id: string, result: Feed }[] = [];

previousWorksCache.forEach( currentWork => worksCache.push({doi: currentWork.dOI, result: currentWork}));
console.log(`Reusing ${previousWorksCache.length} previously cached CrossRef items.`);

function cleanArxivId(id : string) : string {
    return id.replace("http://arxiv.org/abs/", "");
}

previousArxivCache.forEach( (currentFeed : Feed) => arxivCache.push( {id : cleanArxivId(currentFeed.entry.id), result: currentFeed} ));
console.log(`Reusing ${previousArxivCache.length} previously cached arXiv items.`);

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

const dois = Array.from(new Set(reuseData
                .map(entry => entry.sourceDOI)
                .concat(reuseData.map(entry => entry.reusedDOI))
                .filter(doi => doi.trim() != "")))
                .filter(doi => worksCache.findIndex(item => item.doi.toLowerCase() == doi.toLowerCase()) == -1)

console.log(`Resolving ${dois.length} new DOI(s).`);

Promise.all(dois.map(throttledWorksApi)).then(entries => {
    entries.forEach(entry => {
        if (entry != null) {
            const currentMessage = (entry as WorkMessage).message;
            if (!worksCache.find(x => { x.doi == currentMessage.dOI }))
                worksCache.push({ doi: currentMessage.dOI, result: currentMessage })
        }
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