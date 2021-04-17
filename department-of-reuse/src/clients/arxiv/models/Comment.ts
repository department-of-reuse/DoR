
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
