import { Feed, FeedFromXml, QueryApi, QueryByIdRequest } from "@/clients/arxiv";
import { ArxivFeedCache } from "./ArxivFeedCache";

export class CachedArxivApi extends QueryApi {
    private apiCache = new ArxivFeedCache();

    async queryById(requestParameters : QueryByIdRequest) : Promise<Feed> {
        if (this.apiCache.recordExists(requestParameters.id)) {
            //console.debug("Cache hit")
            return new Promise(resolve => 
                resolve(this.apiCache.get(requestParameters.id)!)
            );
        }
        //console.debug("Cache miss")
        const response = await super.queryById(requestParameters)
        this.apiCache.set(requestParameters.id, response);
        return response;
    }
}