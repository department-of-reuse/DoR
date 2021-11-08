import axios from "axios"
import { load } from "js-yaml"
/* tslint:disable */
/* eslint-disable */


export interface CffAuthor {
    "family-names": string;
    "given-names": string;
    affiliation?: string;
    orcid?: string;
}

export interface CffFile {
    message?: string;
    doi?: string;
    title?: string;
    license?: string;
    authors: CffAuthor[];
    "cff-version"?: string;
    "repository-code"?: string;
}

export class GithubCitationApi {


    async queryCitationFile(repoOwner: string, repoName: string): Promise<CffFile> {
        const citationUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/HEAD/CITATION.cff`

        return axios.get<Text>(citationUrl).then(async response => {

            if(response.status != 200){
                return Promise.reject(response.status.toString);
            }
            
            return load(String(response.data)) as CffFile;
        }, async reason  => {
            const strReason = String(reason)
            if(strReason.includes("404")){
                return Promise.reject("404")
            } else {
                return Promise.reject(strReason)
            }
        })

        

    }

}