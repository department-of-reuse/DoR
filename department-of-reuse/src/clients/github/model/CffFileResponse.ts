export interface CffAuthor {
    "family-names": string;
    "given-names": string;
    affiliation?: string;
    orcid?: string;
}

export interface CffFile {
    message: string;
    doi?: string;
    title: string;
    license?: string;
    authors: CffAuthor[];
    url?: string;
    version?: string;
    type?: string;
    abstract?: string;
    "date-released"?: string;
    "cff-version": string;
    "repository-code"?: string;
    // This is only a part of the CITATION.cff schema, for more information see
    //    https://github.com/citation-file-format/citation-file-format/blob/main/schema.json
}

export interface CffFileResponse {
    repoId: string;
    repoOwner: string;
    repoName: string;
    cffFile: CffFile;
}

export function IsValidGithubRepoUrl(value: string): boolean {
    if(value == null || !value.startsWith("https://github.com/")){
        return false;
    } else {
        const parts = value.replace("https://github.com/", "").split("/")

        return (parts.length == 2 && parts[0].trim().length > 0 && parts[1].trim().length > 0) ||
            (parts.length == 3 && parts[0].trim().length > 0 && parts[1].trim().length > 0 && parts[2].trim().length == 0)
    }
}

export function GetRepoOwnerAndNameFromUrl(url: string): [string, string] | undefined {
    if(!IsValidGithubRepoUrl(url)){
        return undefined
    } else {
        const parts = url.replace("https://github.com/", "").split("/")

        return [parts[0].trim(), parts[1].trim()]
    }
}

export function GetRepoIdFromUrl(url: string): string | undefined {
    if(!IsValidGithubRepoUrl(url)){
        return undefined
    } else {
        const ownerAndName = GetRepoOwnerAndNameFromUrl(url)!;
        return ownerAndName[0] + "/" + ownerAndName[1]
    }
}
 
export function CffFileResponseToJSON(value?: CffFileResponse | null):any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    return {
        "repoId": value.repoId,
        "repoOwner": value.repoOwner,
        "repoName": value.repoName,
        "cffFile": CffFileToJSON(value.cffFile)
    }
}

function CffFileToJSON(value: CffFile): any {
    return {
        "message": value.message,
        "doi": value.doi,
        "title": value.title,
        "license": value.license,
        "url": value.url,
        "version": value.version,
        "type": value.type,
        "abstract": value.abstract,
        "date-released": value["date-released"],
        "cff-version": value["cff-version"],
        "repository-code": value["repository-code"],
        "authors": value.authors.map(CffAuthorToJSON)
    }
}

function CffAuthorToJSON(value: CffAuthor): any{
    return {
        "family-names": value["family-names"],
        "given-names": value["given-names"],
        "affiliation": value.affiliation,
        "orcid": value.orcid
    }
}