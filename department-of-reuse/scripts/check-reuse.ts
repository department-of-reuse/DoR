import reuseJson from '../src/assets/data/reuse.json';
import { ReuseFromJson } from '../src/backend/models/Reuse';
import { Configuration, WorksApi, Work, WorkMessage, WorkToJSON } from '../src/clients/crossref';
import { QueryApi, Configuration as ArxivConfiguration } from '../src/clients/arxiv';
import fetch from "node-fetch";
import pThrottle from 'p-throttle';

console.log("Checking DOIs...")

const reuseData = (reuseJson as Array<any>).map(ReuseFromJson);

const crossRef = new WorksApi(new Configuration({
    fetchApi: fetch
}));

const arxiv = new QueryApi(new ArxivConfiguration({
    fetchApi: fetch
}));

var cache: { doi: string, result: Work }[] = [];

const throttle = pThrottle({
    limit: 2,
    interval: 1000
})

const throttledWorksApi = throttle(currentDoi => {
    return crossRef
        .worksDoiGet({ doi: currentDoi as string })
        .catch(reason => {
            console.error("Could not resolve: " + currentDoi + " - Maybe is not a DOI?"); 
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
                .filter(doi => doi.trim() != "")));


let doiRegExp : RegExp = new RegExp('(?:^' + '(10[.][0-9]{4,}(?:[.][0-9]+)*/(?:(?![%"#? ])\\S)+)' + '$)');

let irregularDOIS = dois.filter(d => !d.match(doiRegExp)).concat(dois.filter(d => d.startsWith("10.5555/")));
let regularDOIS = dois.filter(d => d.match(doiRegExp));

if (irregularDOIS.length > 0) {
    console.log(`Found ${irregularDOIS.length} irregular DOI(s) listed below.`);
    irregularDOIS.forEach(d => console.warn(d));
} else {
    console.log(`Found no irregular DOIs. `);
}

console.log("Checking arxiv IDs...")

const arxivIds = Array.from(new Set(reuseData 
                                    .map(r => r.alternativeID)
                                    .filter(id => id.startsWith("arxiv:"))
                                    .map(id => id.replace("arxiv:", ""))));

let arxivRegEx = new RegExp('(^[0-9]{4}.[0-9]{4,5}|[a-z\-]+(\.[A-Z]{2})?\/[0-9]{7})(v[0-9]+)?$');

let irregularArxivIds = arxivIds.filter(id => !id.match(arxivRegEx));
let regularArxivIds = arxivIds.filter(id => id.match(arxivRegEx));

if (irregularArxivIds.length > 0) {
    console.log(`Found ${irregularArxivIds.length} irregular arXiv id(s) listed below.`);
    irregularArxivIds.forEach(d => console.warn(d));
} else {
    console.log(`Found no irregular arXiv IDs.`);
}




const doisInAlternateId = Array.from(new Set(reuseData
    .map(entry => entry.alternativeID)
    .filter(id => matchesDOI(id) || 
                    matchesRegularACM(id) || 
                    matchesSpringer(id) || 
                    matchesWiley(id) ||
                    matchesIEEE(id))));

if (doisInAlternateId.length > 0) {
    console.log(`Found ${doisInAlternateId.length} DOIs in alternative id column.`);
    doisInAlternateId.forEach(d => console.warn(d));
}



if (irregularArxivIds.length == 0) {
    console.log(`Trying to resolve ${regularArxivIds.length} regular arXiv ID(s).`);
    Promise.all(regularArxivIds.map(throttledArxivApi)).then(_ => console.log("ArXiv check complete. See errors above."));
}

if (irregularDOIS.length == 0) {
    console.log(`Trying to resolve ${regularDOIS.length} regular DOI(s).`);
    Promise.all(regularDOIS.map(throttledWorksApi)).then(_ => console.log("CrossRef check complete. See errors above."));
}

function matchesDOI(id: string): boolean {
    return (id.startsWith("http://doi.org/") || id.startsWith("https://doi.org/")) &&
            id.indexOf("10.7488") == -1 && // DataCite
            id.indexOf("10.5281") == -1 // Zenodo            
}

function matchesRegularACM(id : string) : boolean {
    return (id.startsWith("http://dl.acm.org/") || id.startsWith("https://dl.acm.org/")) &&
        id.indexOf("10.5555") == -1 // ACM Mirror DOIs
}

function matchesSpringer(id : string) : boolean {
    return id.indexOf("link.springer.com") > 0
}

function matchesWiley(id: string) : boolean {
    return id.indexOf("onlinelibrary.wiley.com") > 0
}

function matchesIEEE(id: string) : boolean {
    return id.indexOf("ieeexplore.ieee.org") > 0
}