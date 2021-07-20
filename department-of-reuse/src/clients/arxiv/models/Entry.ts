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
    return {
        id: xml.id,
        updated: xml.updated,
        published: xml.published,
        title: xml.title,
        summary: xml.summary,
        author: ((xml.author as Array<any>).map(AuthorFromXml)),
        comment: CommentFromXml(xml['arxiv:comment']),
        link: ((xml.link as Array<any>).map(LinkFromXml)),
        primary_category: CategoryFromXml(xml['arxiv:primary_category']),
        category: (xml.category == null) ? new Array() : ((xml.category as Array<any>).map(CategoryFromXml))
    };
}
