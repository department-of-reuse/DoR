import { GithubCitationApi } from '@/clients/github/GithubCitationApi';
import { GithubCitationsCache } from './GithubCitationsCache';
import { CffFileResponse } from '@/clients/github/model/CffFileResponse';

export class CachedGithubApi extends GithubCitationApi {

    private apiCache = new GithubCitationsCache();

    async queryCitationFileByRepo(repoOwner: string, repoName: string): Promise<CffFileResponse> {
        return this.queryCitationFileInternal(repoOwner, repoName, true)
    }

    async queryCitationFileInternal(repoOwner: string, repoName: string, requestOnCacheMiss: boolean): Promise<CffFileResponse> {
        const repoId = repoOwner + "/" + repoName

        if(!this.apiCache.recordExists(repoId) && requestOnCacheMiss){
            await super.queryCitationFileByRepo(repoOwner, repoName).then(response => {
                this.apiCache.set(response.repoId, response)
            }, () => {})
        }

        if(this.apiCache.recordExists(repoId)){
            return Promise.resolve(this.apiCache.get(repoId)!)
        } else {
            return Promise.reject("There is no citation file present for repository '" + repoId + "'")
        }
    }
}