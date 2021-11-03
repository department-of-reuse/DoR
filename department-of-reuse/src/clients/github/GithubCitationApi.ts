import axios from "axios"
/* tslint:disable */
/* eslint-disable */
export class GithubCitationApi {


    async queryCitationFile(repoOwner: string, repoName: string): Promise<string> {
        const citationUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/HEAD/CITATION.cff`


        return axios.get<Text>(citationUrl).then(async response => {
            
            if(response.status != 200){
                return Promise.reject(response.statusText);
            }

            return response.data.textContent!;
        })

        

    }

}