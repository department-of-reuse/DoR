import { exists } from '../runtime';


export interface Link {
    href: string;
    rel: string;
    type: string;
    title?: string;
}

export function LinkFromXml(xml: any): Link {
    return LinkFromXmlTyped(xml, false);
}

export function LinkFromXmlTyped(xml: any, ignoreDiscriminator: boolean): Link {
    if ((xml === undefined) || (xml === null)) {
        return xml;
    }
    return {
        href: xml.$.href,
        rel: xml.$.rel,
        type: xml.$.type,
        title: !exists(xml.$, 'title') ? undefined : xml.$.title
    };
}

export function LinkFromJSON(json: any): Link {
    return LinkFromJSONTyped(json, false);
}

export function LinkFromJSONTyped(json: any, ignoreDiscriminator: boolean): Link {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        href: json['href'],
        rel: json['rel'],
        type: json['type'],
        title: !exists(json, 'title') ? undefined : json['title']
    }
}

export function LinkToJSON(value?: Link | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        href: value.href,
        rel: value.rel,
        type: value.type,
        title: value.title === undefined ? undefined : value.title
    }
}
