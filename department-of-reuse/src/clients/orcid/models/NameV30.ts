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
    CreatedDateV30,
    CreatedDateV30FromJSON,
    CreatedDateV30FromJSONTyped,
    CreatedDateV30ToJSON,
    CreditNameV30,
    CreditNameV30FromJSON,
    CreditNameV30FromJSONTyped,
    CreditNameV30ToJSON,
    FamilyNameV30,
    FamilyNameV30FromJSON,
    FamilyNameV30FromJSONTyped,
    FamilyNameV30ToJSON,
    GivenNamesV30,
    GivenNamesV30FromJSON,
    GivenNamesV30FromJSONTyped,
    GivenNamesV30ToJSON,
    LastModifiedDateV30,
    LastModifiedDateV30FromJSON,
    LastModifiedDateV30FromJSONTyped,
    LastModifiedDateV30ToJSON,
    SourceV30,
    SourceV30FromJSON,
    SourceV30FromJSONTyped,
    SourceV30ToJSON,
} from './';

/**
 * 
 * @export
 * @interface NameV30
 */
export interface NameV30 {
    /**
     * 
     * @type {CreatedDateV30}
     * @memberof NameV30
     */
    createdDate?: CreatedDateV30;
    /**
     * 
     * @type {LastModifiedDateV30}
     * @memberof NameV30
     */
    lastModifiedDate?: LastModifiedDateV30;
    /**
     * 
     * @type {GivenNamesV30}
     * @memberof NameV30
     */
    givenNames?: GivenNamesV30;
    /**
     * 
     * @type {FamilyNameV30}
     * @memberof NameV30
     */
    familyName?: FamilyNameV30;
    /**
     * 
     * @type {CreditNameV30}
     * @memberof NameV30
     */
    creditName?: CreditNameV30;
    /**
     * 
     * @type {SourceV30}
     * @memberof NameV30
     */
    source?: SourceV30;
    /**
     * 
     * @type {string}
     * @memberof NameV30
     */
    visibility?: NameV30VisibilityEnum;
    /**
     * 
     * @type {string}
     * @memberof NameV30
     */
    path?: string;
}

/**
* @export
* @enum {string}
*/
export enum NameV30VisibilityEnum {
    Limited = 'LIMITED',
    RegisteredOnly = 'REGISTERED_ONLY',
    Public = 'PUBLIC',
    Private = 'PRIVATE'
}

export function NameV30FromJSON(json: any): NameV30 {
    return NameV30FromJSONTyped(json, false);
}

export function NameV30FromJSONTyped(json: any, ignoreDiscriminator: boolean): NameV30 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'createdDate': !exists(json, 'created-date') ? undefined : CreatedDateV30FromJSON(json['created-date']),
        'lastModifiedDate': !exists(json, 'last-modified-date') ? undefined : LastModifiedDateV30FromJSON(json['last-modified-date']),
        'givenNames': !exists(json, 'given-names') ? undefined : GivenNamesV30FromJSON(json['given-names']),
        'familyName': !exists(json, 'family-name') ? undefined : FamilyNameV30FromJSON(json['family-name']),
        'creditName': !exists(json, 'credit-name') ? undefined : CreditNameV30FromJSON(json['credit-name']),
        'source': !exists(json, 'source') ? undefined : SourceV30FromJSON(json['source']),
        'visibility': !exists(json, 'visibility') ? undefined : json['visibility'],
        'path': !exists(json, 'path') ? undefined : json['path'],
    };
}

export function NameV30ToJSON(value?: NameV30 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'created-date': CreatedDateV30ToJSON(value.createdDate),
        'last-modified-date': LastModifiedDateV30ToJSON(value.lastModifiedDate),
        'given-names': GivenNamesV30ToJSON(value.givenNames),
        'family-name': FamilyNameV30ToJSON(value.familyName),
        'credit-name': CreditNameV30ToJSON(value.creditName),
        'source': SourceV30ToJSON(value.source),
        'visibility': value.visibility,
        'path': value.path,
    };
}

