import axios from "axios"
import { load } from "js-yaml"
import { CffFile, CffFileResponse } from "./model/CffFileResponse";

export class GithubCitationApi {


    async queryCitationFile(repoOwner: string, repoName: string): Promise<CffFileResponse> {
        const citationUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/HEAD/CITATION.cff`

        return axios.get<Text>(citationUrl).then(async response => {

            if(response.status != 200){
                return Promise.reject(response.status.toString);
            }
            
            let repoId = repoOwner + "/" + repoName
            let cffFile = load(String(response.data)) as CffFile;
            let cffResponse: CffFileResponse = {repoId: repoId, repoOwner: repoOwner, repoName: repoName, cffFile: cffFile}
            return cffResponse;
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