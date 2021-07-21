import { Entry, EntryFromXml, EntryFromJSON, EntryToJSON } from "./Entry";
import { ItemsPerPage, ItemsPerPageFromXml, ItemsPerPageFromJSON, ItemsPerPageToJSON } from "./ItemsPerPage";
import { Link, LinkFromXml, LinkFromJSON, LinkToJSON } from './Link';
import { Title, TitleFromXml, TitleFromJSON, TitleToJSON } from "./Title";

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

export function FeedFromJSON(json: any): Feed {
    return FeedFromJSONTyped(json, false);
}

export function FeedFromJSONTyped(json: any, ignoreDiscriminator: boolean): Feed {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        link: LinkFromJSON(json['link']),
        title: TitleFromJSON(json['title']),
        id: json['id'],
        updated: json['updated'],
        totalResults: ItemsPerPageFromJSON(json['totalResults']),
        startIndex: ItemsPerPageFromJSON(json['startIndex']),
        itemsPerPage: ItemsPerPageFromJSON(json['itemsPerPage']), 
        entry: EntryFromJSON(json['entry']),
        _xmlns: json['_xmlns']
    }
}


export function FeedToJSON(value?: Feed | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        link: LinkToJSON(value.link),
        title: TitleToJSON(value.title),
        id: value.id,
        updated: value.updated,
        totalResults: ItemsPerPageFromJSON(value.totalResults),
        startIndex: ItemsPerPageFromJSON(value.startIndex),
        itemsPerPage: ItemsPerPageFromJSON(value.itemsPerPage), 
        entry: EntryToJSON(value.entry),
        _xmlns: value._xmlns
    }
}

