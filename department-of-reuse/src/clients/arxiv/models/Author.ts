
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
