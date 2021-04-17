export interface ItemsPerPage {
    namespace: string;
    value: string;
}

export function ItemsPerPageFromXml(xml: any): ItemsPerPage {
    return ItemsPerPageFromXmlTyped(xml, false);
}

export function ItemsPerPageFromXmlTyped(xml: any, ignoreDiscriminator: boolean): ItemsPerPage {
    if ((xml === undefined) || (xml === null)) {
        return xml;
    }
    return {
        namespace: xml.$["xmlns:opensearch"],
        value: xml._
    };
}
