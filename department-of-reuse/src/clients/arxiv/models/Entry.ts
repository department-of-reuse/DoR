import { Author, AuthorFromXml, AuthorFromJSON, AuthorToJSON } from "./Author";
import { Category, CategoryFromXml, CategoryFromJSON, CategoryToJSON } from "./Category";
import { Comment, CommentFromXml, CommentFromJSON, CommentToJSON } from "./Comment";
import { Link, LinkFromXml, LinkFromJSON, LinkToJSON } from './Link';

import { exists } from '../runtime';

export interface Entry {
    id: string;
    updated: Date;
    published: Date;
    title: string;
    summary: string;
    author: Author[];
    comment: Comment;
    link: Link[];
    primary_category: Category;
    category: Category[];
}

export function EntryFromXml(xml: any): Entry {
    return EntryFromXmlTyped(xml, false);
}

export function EntryFromXmlTyped(xml: any, ignoreDiscriminator: boolean) {
    if ((xml === undefined) || (xml === null)) {
        return xml;
    }
    
    // Bugfix: Category, Link, and Author may either be an array or single category. Normalizing to arrays here.
    if (xml.author != null && !Array.isArray(xml.author))
        xml.author = new Array(xml.author);

    if (xml.link != null && !Array.isArray(xml.link))
        xml.link = new Array(xml.link);

    if (xml.category != null && !Array.isArray(xml.category))
        xml.category = new Array(xml.category);

    
    return {
        id: xml.id,
        updated: xml.updated,
        published: xml.published,
        title: xml.title,
        summary: xml.summary,
        author: (xml.author == null) ? new Array() : ((xml.author as Array<any>).map(AuthorFromXml)),
        comment: CommentFromXml(xml['arxiv:comment']),
        link: (xml.link == null) ? new Array() : ((xml.link as Array<any>).map(LinkFromXml)),
        primary_category: CategoryFromXml(xml['arxiv:primary_category']),
        category: (xml.category == null) ? new Array() : ((xml.category as Array<any>).map(CategoryFromXml))
    };
}

export function EntryFromJSON(json: any): Entry {
    return EntryFromJSONTyped(json, false);
}

export function EntryFromJSONTyped(json: any, ignoreDiscriminator: boolean): Entry {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        id: json['id'],
        updated: json['updated'],
        published: json['published'],
        title: json['title'],
        summary: json['title'],
        author: !exists(json, 'author') ? new Array() : ((json['author'] as Array<any>).map(AuthorFromJSON)),
        comment: CommentFromJSON(json['comment']),
        link: !exists(json, 'link') ? new Array() : ((json['link'] as Array<any>).map(LinkFromJSON)),
        primary_category: CategoryFromJSON(json['primary_category']),
        category: !exists(json, 'category') ? new Array() : ((json['category'] as Array<any>).map(CategoryFromJSON))
    }
}

export function EntryToJSON(value?: Entry | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        id: value.id,
        updated: value.updated,
        published: value.published,
        title: value.title,
        summary: value.summary,
        author: value.author.map(AuthorToJSON),
        comment: CommentToJSON(value.comment),
        link: value.link.map(LinkToJSON),
        primary_category: CategoryToJSON(value.primary_category),
        category: value.category.map(CategoryToJSON)
    }
}