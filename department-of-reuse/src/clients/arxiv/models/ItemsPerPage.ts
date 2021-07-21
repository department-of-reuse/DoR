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

export function ItemsPerPageFromJSON(json: any): ItemsPerPage {
    return ItemsPerPageFromJSONTyped(json, false);
}

export function ItemsPerPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): ItemsPerPage {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        namespace: json['namespace'],
        value: json['value']
    }
}

export function ItemsPerPageToJSON(value?: ItemsPerPage | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        namespace: value.namespace,
        value: value.value
    }
}