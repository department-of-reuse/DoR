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
    CreatedDateV20,
    CreatedDateV20FromJSON,
    CreatedDateV20FromJSONTyped,
    CreatedDateV20ToJSON,
    ExternalIDsV20,
    ExternalIDsV20FromJSON,
    ExternalIDsV20FromJSONTyped,
    ExternalIDsV20ToJSON,
    FundingTitleV20,
    FundingTitleV20FromJSON,
    FundingTitleV20FromJSONTyped,
    FundingTitleV20ToJSON,
    FuzzyDateV20,
    FuzzyDateV20FromJSON,
    FuzzyDateV20FromJSONTyped,
    FuzzyDateV20ToJSON,
    LastModifiedDateV20,
    LastModifiedDateV20FromJSON,
    LastModifiedDateV20FromJSONTyped,
    LastModifiedDateV20ToJSON,
    OrganizationV20,
    OrganizationV20FromJSON,
    OrganizationV20FromJSONTyped,
    OrganizationV20ToJSON,
    SourceV20,
    SourceV20FromJSON,
    SourceV20FromJSONTyped,
    SourceV20ToJSON,
} from './';

/**
 * 
 * @export
 * @interface FundingSummaryV20
 */
export interface FundingSummaryV20 {
    /**
     * 
     * @type {CreatedDateV20}
     * @memberof FundingSummaryV20
     */
    createdDate?: CreatedDateV20;
    /**
     * 
     * @type {LastModifiedDateV20}
     * @memberof FundingSummaryV20
     */
    lastModifiedDate?: LastModifiedDateV20;
    /**
     * 
     * @type {SourceV20}
     * @memberof FundingSummaryV20
     */
    source?: SourceV20;
    /**
     * 
     * @type {FundingTitleV20}
     * @memberof FundingSummaryV20
     */
    title: FundingTitleV20;
    /**
     * 
     * @type {ExternalIDsV20}
     * @memberof FundingSummaryV20
     */
    externalIds?: ExternalIDsV20;
    /**
     * 
     * @type {string}
     * @memberof FundingSummaryV20
     */
    type: FundingSummaryV20TypeEnum;
    /**
     * 
     * @type {FuzzyDateV20}
     * @memberof FundingSummaryV20
     */
    startDate?: FuzzyDateV20;
    /**
     * 
     * @type {FuzzyDateV20}
     * @memberof FundingSummaryV20
     */
    endDate?: FuzzyDateV20;
    /**
     * 
     * @type {OrganizationV20}
     * @memberof FundingSummaryV20
     */
    organization: OrganizationV20;
    /**
     * 
     * @type {string}
     * @memberof FundingSummaryV20
     */
    visibility?: FundingSummaryV20VisibilityEnum;
    /**
     * 
     * @type {number}
     * @memberof FundingSummaryV20
     */
    putCode?: number;
    /**
     * 
     * @type {string}
     * @memberof FundingSummaryV20
     */
    path?: string;
    /**
     * 
     * @type {string}
     * @memberof FundingSummaryV20
     */
    displayIndex?: string;
}

/**
* @export
* @enum {string}
*/
export enum FundingSummaryV20TypeEnum {
    Grant = 'GRANT',
    Contract = 'CONTRACT',
    Award = 'AWARD',
    SalaryAward = 'SALARY_AWARD'
}/**
* @export
* @enum {string}
*/
export enum FundingSummaryV20VisibilityEnum {
    Limited = 'LIMITED',
    RegisteredOnly = 'REGISTERED_ONLY',
    Public = 'PUBLIC',
    Private = 'PRIVATE'
}

export function FundingSummaryV20FromJSON(json: any): FundingSummaryV20 {
    return FundingSummaryV20FromJSONTyped(json, false);
}

export function FundingSummaryV20FromJSONTyped(json: any, ignoreDiscriminator: boolean): FundingSummaryV20 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'createdDate': !exists(json, 'created-date') ? undefined : CreatedDateV20FromJSON(json['created-date']),
        'lastModifiedDate': !exists(json, 'last-modified-date') ? undefined : LastModifiedDateV20FromJSON(json['last-modified-date']),
        'source': !exists(json, 'source') ? undefined : SourceV20FromJSON(json['source']),
        'title': FundingTitleV20FromJSON(json['title']),
        'externalIds': !exists(json, 'external-ids') ? undefined : ExternalIDsV20FromJSON(json['external-ids']),
        'type': json['type'],
        'startDate': !exists(json, 'start-date') ? undefined : FuzzyDateV20FromJSON(json['start-date']),
        'endDate': !exists(json, 'end-date') ? undefined : FuzzyDateV20FromJSON(json['end-date']),
        'organization': OrganizationV20FromJSON(json['organization']),
        'visibility': !exists(json, 'visibility') ? undefined : json['visibility'],
        'putCode': !exists(json, 'put-code') ? undefined : json['put-code'],
        'path': !exists(json, 'path') ? undefined : json['path'],
        'displayIndex': !exists(json, 'display-index') ? undefined : json['display-index'],
    };
}

export function FundingSummaryV20ToJSON(value?: FundingSummaryV20 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'created-date': CreatedDateV20ToJSON(value.createdDate),
        'last-modified-date': LastModifiedDateV20ToJSON(value.lastModifiedDate),
        'source': SourceV20ToJSON(value.source),
        'title': FundingTitleV20ToJSON(value.title),
        'external-ids': ExternalIDsV20ToJSON(value.externalIds),
        'type': value.type,
        'start-date': FuzzyDateV20ToJSON(value.startDate),
        'end-date': FuzzyDateV20ToJSON(value.endDate),
        'organization': OrganizationV20ToJSON(value.organization),
        'visibility': value.visibility,
        'put-code': value.putCode,
        'path': value.path,
        'display-index': value.displayIndex,
    };
}

