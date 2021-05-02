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
/**
 * 
 * @export
 * @interface DayV30
 */
export interface DayV30 {
    /**
     * 
     * @type {string}
     * @memberof DayV30
     */
    value?: string;
}

export function DayV30FromJSON(json: any): DayV30 {
    return DayV30FromJSONTyped(json, false);
}

export function DayV30FromJSONTyped(json: any, ignoreDiscriminator: boolean): DayV30 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'value': !exists(json, 'value') ? undefined : json['value'],
    };
}

export function DayV30ToJSON(value?: DayV30 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'value': value.value,
    };
}

