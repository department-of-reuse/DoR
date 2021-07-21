
export interface Author {
    name: string;
}

export function AuthorFromXml(xml: any): Author {
    return AuthorFromXmlTyped(xml, false);
}

export function AuthorFromXmlTyped(xml: any, ignoreDiscriminator: boolean): Author {
    if ((xml === undefined) || (xml === null)) {
        return xml;
    }
    return {
        name: xml.name
    };
}

export function AuthorFromJSON(json: any): Author {
    return AuthorFromJSONTyped(json, false);
}

export function AuthorFromJSONTyped(json: any, ignoreDiscriminator: boolean): Author {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        name: json['name']
    }
}

export function AuthorToJSON(value?: Author | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        name: value.name
    }
}