import { GithubCitationApi } from '@/clients/github/GithubCitationApi';
import { GithubCitationsCache } from './GithubCitationsCache';
import { CffFileResponse } from '@/clients/github/model/CffFileResponse';

export class CachedGithubApi extends GithubCitationApi {

    private apiCache = new GithubCitationsCache();

    async queryCitationFileByRepo(repoOwner: string, repoName: string): Promise<CffFileResponse> {
        return this.queryCitationFileInternal(repoOwner, repoName, true)
    }

    async queryCitationFileInternal(repoOwner: string, repoName: string, requestOnCacheMiss: boolean): Promise<CffFileResponse> {
        let repoId = repoOwner + "/" + repoName

        if(!this.apiCache.recordExists(repoId) && requestOnCacheMiss){
            console.debug("Cache miss")
            await super.queryCitationFileByRepo(repoOwner, repoName).then(response => {
                this.apiCache.set(response.repoId, response)
            }, reason => {
                console.warn("No GitHub citation file for repo " + repoId)
            })
        }

        if(this.apiCache.recordExists(repoId)){
            return Promise.resolve(this.apiCache.get(repoId)!)
        } else {
            return Promise.reject("There is no citation file present for repository '" + repoId + "'")
        }
    }
}