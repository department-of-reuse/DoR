import { exists } from '../runtime';


export interface Link {
    href: string;
    rel: string;
    type: string;
    title?: string;
}

export function LinkFromXml(xml: any): Link {
    return LinkFromXmlTyped(xml, false);
}

export function LinkFromXmlTyped(xml: any, ignoreDiscriminator: boolean): Link {
    if ((xml === undefined) || (xml === null)) {
        return xml;
    }
    return {
        href: xml.$.href,
        rel: xml.$.rel,
        type: xml.$.type,
        title: !exists(xml.$, 'title') ? undefined : xml.$.title
    };
}
