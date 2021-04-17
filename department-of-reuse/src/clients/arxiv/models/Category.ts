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
