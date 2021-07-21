import { Author, AuthorFromXml } from "./Author";
import { Category, CategoryFromXml } from "./Category";
import { Comment, CommentFromXml } from "./Comment";
import { Link, LinkFromXml } from './Link';


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
