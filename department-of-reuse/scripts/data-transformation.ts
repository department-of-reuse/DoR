import Reuse, { ReuseToJson, ReuseType } from '../src/backend/models/Reuse';
import * as fs from 'fs';
import * as path from 'path';
import parse from 'csv-parse/lib/sync';

console.log("Transforming CSV data to JSON...");

const dataPath = "../workflow/done";

const csvContents = fs.readdirSync(dataPath)
    .filter(x => x.endsWith('.csv'))
    //.filter(x => !x.endsWith('-sample.csv'))
    .map(file => { 
        console.log(`Processing ${file}...`);
        return fs.readFileSync(path.join(dataPath, file), { encoding: 'utf-8' });
    })
    .flatMap(contents => {
        return parse(contents,
            {
                delimiter: ',',
                columns: true,
                skip_empty_lines: true,
                ltrim: true,
                bom: true
            }) as Array<any>;
    })
    .filter(data => data['reused_doi'].trim().length > 0 ||  data['alt_url'].trim().length > 0);


function ReuseFromCSVData(csvData: any): Reuse {
    if ((csvData === undefined) || (csvData === null)) {
        return csvData;
    }

    return {
        "sourceDOI": ProcessDOI(csvData['paper_doi']),
        "reusedDOI": ProcessDOI(csvData['reused_doi']),
        "type" : TransformType(csvData['reuse_type'], csvData),
        "comment": csvData['comment'],
        "sourceReference": csvData['citation_number'],
        "alternativeID": ProcessAlternativeId(csvData['alt_url']),
        "sourceReferenceDetail": csvData['page_num'],
        "contributor" : csvData['gh_id']
    };
}

function ProcessDOI(doi : string) : string {
    return doi.replace("https://doi.org/", "")
              .replace("https://dl.acm.org/doi/abs/", "")
              .replace("https://dl.acm.org/doi/pdf/", "")
              .replace("https://dl.acm.org/doi/", "")
              .replace("http://dx.doi.org/", "")
              .replace("https://dx.doi.org/", "")
              .trim();
}

function ProcessAlternativeId(altId : string) : string {
    return altId.replace("https://arxiv.org/abs/", "arxiv:");
}

function TransformType(csvType : string, csvData: any) : ReuseType {
    switch (csvType.toLowerCase().trim()) {
        case "method":
        case "theory":
            return ReuseType.METHODOLOGY;     
        case "tool": 
        case "algorithm":
            return ReuseType.TOOL;
        case "dataset":
        case "dataset reuse":
            return ReuseType.DATASET;
        case "statistics":
        case "statistical":
        case "statistical reuse":
        case "statistical method":
            return ReuseType.STATISTICS;     
        case "metric":
        case "metrics":
        case "metric reuse":
            return ReuseType.METRIC;
        case "stepping stone":
        case "stepping-stone":
        case "stepping stones":
            return ReuseType.STEPPINGSTONE;
        case "sanity check":
        case "sanity-check":
            return ReuseType.SANITYCHECK;
        case "replication":
            return ReuseType.REPLICATION;
        default: {
            // console.log(csvType.toLowerCase());
            // console.table(csvData)
            return ReuseType.UNKNOWN;
        }
            
    }
 }

const result: Array<Reuse> = csvContents.map(ReuseFromCSVData);

const outputObject =
    result
        .map(ReuseToJson)
        .map(o => JSON.stringify(o))
        .join(",")

fs.writeFileSync('./src/assets/data/reuse.json', "[" + outputObject + "]");

console.log("Transformation complete.");