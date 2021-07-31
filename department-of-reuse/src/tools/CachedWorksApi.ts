import { WorksCache } from './WorksCache';
import { WorksApi, WorksDoiGetRequest,WorkMessage } from '@/clients/crossref';

export class CachedWorksApi extends WorksApi {
    private apiCache = new WorksCache();

    async worksDoiGet(requestParameters: WorksDoiGetRequest): Promise<WorkMessage> {
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
            //console.debug("Cache miss")
            /*
            const response = await super.worksDoiGet(requestParameters);
            this.apiCache.set(requestParameters.doi, response.message);
            return response;
            */
           throw new Error('Cache miss');
        }

    }
}