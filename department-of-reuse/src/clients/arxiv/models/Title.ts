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
