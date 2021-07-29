export interface Title {
    type: string;
    text: string;
}

export function TitleFromXml(xml: any): Title {
    return TitleFromXmlTyped(xml, false);
}
export function TitleFromXmlTyped(xml: any, ignoreDiscriminator: boolean): Title {
    if ((xml === undefined) || (xml === null)) {
        return xml;
    }
    return {
        type: xml.$.type,
        text: xml._
    };
}

export function TitleFromJSON(json: any): Title {
    return TitleFromJSONTyped(json, false);
}

export function TitleFromJSONTyped(json: any, ignoreDiscriminator: boolean): Title {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        type: json['type'],
        text: json['text']
    }
}

export function TitleToJSON(value?: Title | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        type: value.type,
        text: value.text
    }
}