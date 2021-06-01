import reuseJson from '../src/assets/data/reuse.json';
import { ReuseFromJson } from '../src/backend/models/Reuse';
import { Configuration, WorksApi, Work, WorkMessage, WorkToJSON } from '../src/clients/crossref';
import fetch from "node-fetch";
import * as fs from 'fs';
import pThrottle from 'p-throttle';

console.log("Prefilling CrossRef resolution cache.")

const reuseData = (reuseJson as Array<any>).map(ReuseFromJson);

const crossRef = new WorksApi(new Configuration({
    fetchApi: fetch
}));
var cache: { doi: string, result: Work }[] = [];

const throttle = pThrottle({
    limit: 2,
    interval: 1000
})

const throttled = throttle(currentDoi => {
    console.log(`Resolving ${currentDoi} ...`);
    return crossRef
        .worksDoiGet({ doi: currentDoi as string })
        .catch(reason => {
            console.warn("Could not resolve: " + currentDoi); 
            console.debug(reason);
        });
})

const dois = Array.from(new Set(reuseData
                .map(entry => entry.sourceDOI)
                .concat(reuseData.map(entry => entry.reusedDOI))
                .filter(doi => doi.trim() != "")));

console.log(`Resolving ${dois.length} DOI(s).`);

Promise.all(dois.map(throttled)).then(entries => {
    entries.forEach(entry => {
        if (entry != null) {
            const currentMessage = (entry as WorkMessage).message;
            if (!cache.find(x => { x.doi == currentMessage.dOI }))
                cache.push({ doi: currentMessage.dOI, result: currentMessage })
        }
    })

    const outputObject = cache
        .map(entry => entry.result)
        .map(WorkToJSON)
        .map(o => JSON.stringify(o))
        .join(",");

    fs.writeFileSync('./src/assets/data/works-cache.json', "[" + outputObject + "]");

}).then(_ => console.log("CrossRef cache prefill complete."));