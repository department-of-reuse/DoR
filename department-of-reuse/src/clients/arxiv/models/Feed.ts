import { Entry, EntryFromXml } from "./Entry";
import { ItemsPerPage, ItemsPerPageFromXml } from "./ItemsPerPage";
import { Link, LinkFromXml } from './Link';
import { Title, TitleFromXml } from "./Title";

export interface Feed {
    link:         Link;
    title:        Title;
    id:           string;
    updated:      Date;
    totalResults: ItemsPerPage;
    startIndex:   ItemsPerPage;
    itemsPerPage: ItemsPerPage;
    entry:        Entry;
    _xmlns:       string;
}

export function FeedFromXml(xml: any): Feed {
    return FeedFromXmlTyped(xml, false);
}

export function FeedFromXmlTyped(xml: any, ignoreDiscriminator: boolean): Feed {
    if ((xml === undefined) || (xml === null)) {
        return xml;
    }
    console.log(xml);
    return {
        link:         LinkFromXml(xml.feed.link),
        title:        TitleFromXml(xml.feed.title),
        id:           xml.feed.id,
        updated:      xml.feed.updated,
        totalResults: ItemsPerPageFromXml(xml.feed["opensearch:totalResults"]),
        startIndex:   ItemsPerPageFromXml(xml.feed["opensearch:startIndex"]),
        itemsPerPage: ItemsPerPageFromXml(xml.feed["opensearch:itemsPerPage"]),
        entry:        EntryFromXml(xml.feed.entry),
        _xmlns:       xml.feed.$.xmlns
    };
}


