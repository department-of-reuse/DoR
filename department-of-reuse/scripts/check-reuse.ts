import reuseJson from '../src/assets/data/reuse.json';
import { ReuseFromJson } from '../src/backend/models/Reuse';
import { Configuration, WorksApi, Work, WorkMessage, WorkToJSON } from '../src/clients/crossref';
import fetch from "node-fetch";
import * as fs from 'fs';
import pThrottle from 'p-throttle';

console.log("Checking DOIs...")

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
    return crossRef
        .worksDoiGet({ doi: currentDoi as string })
        .catch(reason => {
            console.error("Could not resolve: " + currentDoi + " - Maybe is not a DOI?"); 
        });
})

const dois = Array.from(new Set(reuseData
                .map(entry => entry.sourceDOI)
                .concat(reuseData.map(entry => entry.reusedDOI))
                .filter(doi => doi.trim() != "")));


let doiRegExp : RegExp = new RegExp('(?:^' + '(10[.][0-9]{4,}(?:[.][0-9]+)*/(?:(?![%"#? ])\\S)+)' + '$)');

let irregularDOIS = dois.filter(d => !d.match(doiRegExp));
let regularDOIS = dois.filter(d => d.match(doiRegExp));

console.log(`Found ${irregularDOIS.length} irregular DOI(s) listed below.`);
irregularDOIS.forEach(d => console.warn(d));

console.log(`Trying to resolve ${regularDOIS.length} regular DOI(s).`);
Promise.all(regularDOIS.map(throttled)).then(_ => console.log("Check complete. See errors above."));