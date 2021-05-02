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
    CreditNameV20,
    CreditNameV20FromJSON,
    CreditNameV20FromJSONTyped,
    CreditNameV20ToJSON,
    FamilyNameV20,
    FamilyNameV20FromJSON,
    FamilyNameV20FromJSONTyped,
    FamilyNameV20ToJSON,
    GivenNamesV20,
    GivenNamesV20FromJSON,
    GivenNamesV20FromJSONTyped,
    GivenNamesV20ToJSON,
    LastModifiedDateV20,
    LastModifiedDateV20FromJSON,
    LastModifiedDateV20FromJSONTyped,
    LastModifiedDateV20ToJSON,
    SourceV20,
    SourceV20FromJSON,
    SourceV20FromJSONTyped,
    SourceV20ToJSON,
} from './';

/**
 * 
 * @export
 * @interface NameV20
 */
export interface NameV20 {
    /**
     * 
     * @type {CreatedDateV20}
     * @memberof NameV20
     */
    createdDate?: CreatedDateV20;
    /**
     * 
     * @type {LastModifiedDateV20}
     * @memberof NameV20
     */
    lastModifiedDate?: LastModifiedDateV20;
    /**
     * 
     * @type {GivenNamesV20}
     * @memberof NameV20
     */
    givenNames?: GivenNamesV20;
    /**
     * 
     * @type {FamilyNameV20}
     * @memberof NameV20
     */
    familyName?: FamilyNameV20;
    /**
     * 
     * @type {CreditNameV20}
     * @memberof NameV20
     */
    creditName?: CreditNameV20;
    /**
     * 
     * @type {SourceV20}
     * @memberof NameV20
     */
    source?: SourceV20;
    /**
     * 
     * @type {string}
     * @memberof NameV20
     */
    visibility?: NameV20VisibilityEnum;
    /**
     * 
     * @type {string}
     * @memberof NameV20
     */
    path?: string;
}

/**
* @export
* @enum {string}
*/
export enum NameV20VisibilityEnum {
    Limited = 'LIMITED',
    RegisteredOnly = 'REGISTERED_ONLY',
    Public = 'PUBLIC',
    Private = 'PRIVATE'
}

export function NameV20FromJSON(json: any): NameV20 {
    return NameV20FromJSONTyped(json, false);
}

export function NameV20FromJSONTyped(json: any, ignoreDiscriminator: boolean): NameV20 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'createdDate': !exists(json, 'created-date') ? undefined : CreatedDateV20FromJSON(json['created-date']),
        'lastModifiedDate': !exists(json, 'last-modified-date') ? undefined : LastModifiedDateV20FromJSON(json['last-modified-date']),
        'givenNames': !exists(json, 'given-names') ? undefined : GivenNamesV20FromJSON(json['given-names']),
        'familyName': !exists(json, 'family-name') ? undefined : FamilyNameV20FromJSON(json['family-name']),
        'creditName': !exists(json, 'credit-name') ? undefined : CreditNameV20FromJSON(json['credit-name']),
        'source': !exists(json, 'source') ? undefined : SourceV20FromJSON(json['source']),
        'visibility': !exists(json, 'visibility') ? undefined : json['visibility'],
        'path': !exists(json, 'path') ? undefined : json['path'],
    };
}

export function NameV20ToJSON(value?: NameV20 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'created-date': CreatedDateV20ToJSON(value.createdDate),
        'last-modified-date': LastModifiedDateV20ToJSON(value.lastModifiedDate),
        'given-names': GivenNamesV20ToJSON(value.givenNames),
        'family-name': FamilyNameV20ToJSON(value.familyName),
        'credit-name': CreditNameV20ToJSON(value.creditName),
        'source': SourceV20ToJSON(value.source),
        'visibility': value.visibility,
        'path': value.path,
    };
}

