import { WorksCache } from './WorksCache';
import { WorksApi, WorksDoiGetRequest,WorkMessage } from '@/clients/crossref';

export class CachedWorksApi extends WorksApi {
    private apiCache = new WorksCache();

    async worksDoiGet(requestParameters: WorksDoiGetRequest): Promise<WorkMessage> {
        return this.worksDoiGetInteral(requestParameters, false);
    }

    async worksDoiGetInteral(requestParameters: WorksDoiGetRequest, requestOnCacheMiss : boolean): Promise<WorkMessage> {
        if (this.apiCache.recordExists(requestParameters.doi)) {
            //console.debug("Cache hit")
            return new Promise(resolve => 
                resolve({
                    "status" : "",
                    "messageType" : "",
                    "messageVersion" : "",
                    "message" : this.apiCache.get(requestParameters.doi)!
                }
                )
            );
        } else {
            if(requestOnCacheMiss) {
                console.debug("Cache miss")
                const response = await super.worksDoiGet(requestParameters);
                this.apiCache.set(requestParameters.doi, response.message);
                return response;
            } else {
                throw new Error('Cache miss');   
            }
        
        }

    }
}