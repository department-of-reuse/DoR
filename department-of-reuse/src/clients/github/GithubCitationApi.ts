import axios from "axios"
/* tslint:disable */
/* eslint-disable */
export class GithubCitationApi {


    async queryCitationFile(repoOwner: string, repoName: string): Promise<string> {
        const citationUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/HEAD/CITATION.cff`

        return axios.get<Text>(citationUrl).then(async response => {

            if(response.status != 200){
                return Promise.reject(response.status.toString);
            }

            return String(response.data);
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