import reuseJson from '../src/assets/data/reuse.json';
import { ReuseFromJson } from '../src/backend/models/Reuse';
import { Configuration, WorksApi, Work, WorkMessage, WorkToJSON } from '../src/clients/crossref';
import fetch from "node-fetch";
import * as fs from 'fs';
const reuseData = (reuseJson as Array<any>).map(ReuseFromJson);

const crossRef = new WorksApi(new Configuration({
    fetchApi: fetch
}));
var cache: { doi: string, result: Work }[] = [];

const dois = reuseData.map(entry => entry.sourceDOI).concat(reuseData.map(entry => entry.reusedDOI))

Promise.all(dois.map(currentDoi => {
    return crossRef
        .worksDoiGet({ doi: currentDoi })
        .catch(reason => console.warn(reason));
})).then(entries => {
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

});