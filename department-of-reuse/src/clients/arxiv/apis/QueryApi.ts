import * as runtime from '../runtime';
import { Feed, FeedFromXml } from '../models';

export class QueryApi extends runtime.BaseAPI {

    async queryByIdRaw(requestParameters : QueryByIdRequest) : Promise<runtime.ApiResponse<Feed>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling queryById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/query?id_list={id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.XMLApiResponse(response, (jsonValue) => FeedFromXml(jsonValue));
    }

    async queryById(requestParameters : QueryByIdRequest) : Promise<Feed> {
        const response = await this.queryByIdRaw(requestParameters);
        return await response.value();
    }
}



export interface QueryByIdRequest {
    id: string;
}
