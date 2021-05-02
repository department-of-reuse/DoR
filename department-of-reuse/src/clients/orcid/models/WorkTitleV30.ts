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
    SubtitleV30,
    SubtitleV30FromJSON,
    SubtitleV30FromJSONTyped,
    SubtitleV30ToJSON,
    TitleV30,
    TitleV30FromJSON,
    TitleV30FromJSONTyped,
    TitleV30ToJSON,
    TranslatedTitleV30,
    TranslatedTitleV30FromJSON,
    TranslatedTitleV30FromJSONTyped,
    TranslatedTitleV30ToJSON,
} from './';

/**
 * 
 * @export
 * @interface WorkTitleV30
 */
export interface WorkTitleV30 {
    /**
     * 
     * @type {TitleV30}
     * @memberof WorkTitleV30
     */
    title?: TitleV30;
    /**
     * 
     * @type {SubtitleV30}
     * @memberof WorkTitleV30
     */
    subtitle?: SubtitleV30;
    /**
     * 
     * @type {TranslatedTitleV30}
     * @memberof WorkTitleV30
     */
    translatedTitle?: TranslatedTitleV30;
}

export function WorkTitleV30FromJSON(json: any): WorkTitleV30 {
    return WorkTitleV30FromJSONTyped(json, false);
}

export function WorkTitleV30FromJSONTyped(json: any, ignoreDiscriminator: boolean): WorkTitleV30 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'title': !exists(json, 'title') ? undefined : TitleV30FromJSON(json['title']),
        'subtitle': !exists(json, 'subtitle') ? undefined : SubtitleV30FromJSON(json['subtitle']),
        'translatedTitle': !exists(json, 'translated-title') ? undefined : TranslatedTitleV30FromJSON(json['translated-title']),
    };
}

export function WorkTitleV30ToJSON(value?: WorkTitleV30 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'title': TitleV30ToJSON(value.title),
        'subtitle': SubtitleV30ToJSON(value.subtitle),
        'translated-title': TranslatedTitleV30ToJSON(value.translatedTitle),
    };
}

