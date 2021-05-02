/* tslint:disable */
/* eslint-disable */
/**
 * ORCID Public
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: Latest
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    LastModifiedDateV30,
    LastModifiedDateV30FromJSON,
    LastModifiedDateV30FromJSONTyped,
    LastModifiedDateV30ToJSON,
    ResearchResourceGroupV30,
    ResearchResourceGroupV30FromJSON,
    ResearchResourceGroupV30FromJSONTyped,
    ResearchResourceGroupV30ToJSON,
} from './';

/**
 * 
 * @export
 * @interface ResearchResourcesV30
 */
export interface ResearchResourcesV30 {
    /**
     * 
     * @type {LastModifiedDateV30}
     * @memberof ResearchResourcesV30
     */
    lastModifiedDate?: LastModifiedDateV30;
    /**
     * 
     * @type {Array<ResearchResourceGroupV30>}
     * @memberof ResearchResourcesV30
     */
    group?: Array<ResearchResourceGroupV30>;
    /**
     * 
     * @type {string}
     * @memberof ResearchResourcesV30
     */
    path?: string;
}

export function ResearchResourcesV30FromJSON(json: any): ResearchResourcesV30 {
    return ResearchResourcesV30FromJSONTyped(json, false);
}

export function ResearchResourcesV30FromJSONTyped(json: any, ignoreDiscriminator: boolean): ResearchResourcesV30 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'lastModifiedDate': !exists(json, 'last-modified-date') ? undefined : LastModifiedDateV30FromJSON(json['last-modified-date']),
        'group': !exists(json, 'group') ? undefined : ((json['group'] as Array<any>).map(ResearchResourceGroupV30FromJSON)),
        'path': !exists(json, 'path') ? undefined : json['path'],
    };
}

export function ResearchResourcesV30ToJSON(value?: ResearchResourcesV30 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'last-modified-date': LastModifiedDateV30ToJSON(value.lastModifiedDate),
        'group': value.group === undefined ? undefined : ((value.group as Array<any>).map(ResearchResourceGroupV30ToJSON)),
        'path': value.path,
    };
}

