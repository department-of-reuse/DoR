export interface Category {
    term: string;
    scheme: string;
}

export function CategoryFromXml(xml: any): Category {
    return CategoryFromXmlTyped(xml, false);
}

export function CategoryFromXmlTyped(xml: any, ignoreDiscriminator: boolean) {
    if ((xml === undefined) || (xml === null)) {
        return xml;
    }
    return {
        term: xml.$.term,
        scheme: xml.$.scheme
    };
}

export function CategoryFromJSON(json: any): Category {
    return CategoryFromJSONTyped(json, false);
}

export function CategoryFromJSONTyped(json: any, ignoreDiscriminator: boolean): Category {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        term: json['term'],
        scheme: json['scheme']
    }
}

export function CategoryToJSON(value?: Category | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        term: value.term,
        scheme: value.scheme
    }
}