
export interface Comment {
    text: string;
}

export function CommentFromXml(xml: any): Comment {
    return CommentFromXmlTyped(xml, false);
}

export function CommentFromXmlTyped(xml: any, ignoreDiscriminator: boolean): Comment {
    if ((xml === undefined) || (xml === null)) {
        return xml;
    }
    return {
        text: xml._
    };
}

export function CommentFromJSON(json: any): Comment {
    return CommentFromJSONTyped(json, false);
}

export function CommentFromJSONTyped(json: any, ignoreDiscriminator: boolean): Comment {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        text: json['text']
    }
}

export function CommentToJSON(value?: Comment | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        text: value.text
    }
}