/* tslint:disable */
/* eslint-disable */
/**
 * Crossref Unified Resource API
 * ## Preamble  The Crossref REST API is one of [a variety of tools and APIs](https://www.crossref.org/services/metadata-retrieval/) that allow anybody to search and reuse our members\' metadata in sophisticated ways.  ## Meta  ### Frequency of indexing  Records typically appear in the REST API within 20 minutes of their having been successfully deposited with Crossref.  Summary information (e.g. counts, etc.) are processed in batch every 24 hours.  ### Learning about performance or availability problems  We record and report service issues on our [status page](http://status.crossref.org).  You might want to check this to see if we are already aware of a problem before you report it.  We also post notice of any ongoing performance problems with our services on our twitter feeds at [CrossrefOrg](https://twitter.com/CrossrefOrg) and [CrossrefSupport](https://twitter.com/@CrossrefSupport).  ### Reporting performance or availability problems  Report performance/availability at our [support site](https://www.crossref.org/contact/).  ### Reporting bugs, requesting features  Please report bugs with the API or the documentation on our [issue tracker](https://gitlab.com/crossref/issues).  ### Documentation License  <a rel=\"license\" href=\"http://creativecommons.org/licenses/by/4.0/\"><img alt=\"Creative Commons License\" style=\"border-width:0\" src=\"https://i.creativecommons.org/l/by/4.0/88x31.png\" /></a><br />This work is licensed under a <a rel=\"license\" href=\"http://creativecommons.org/licenses/by/4.0/\">Creative Commons Attribution 4.0 International License</a>.  ### Metadata License  Crossref asserts no claims of ownership to individual items of bibliographic metadata and associated Digital Object Identifiers (DOIs) acquired through the use of the Crossref Free Services. Individual items of bibliographic metadata and associated DOIs may be cached and incorporated into the user\'s content and systems.  ### Privacy  We also have a [privacy policy](https://www.crossref.org/privacy/).  ### Libraries  You might be able to avoid reading all this documentation if you instead use one of the several excellent libraries that have been written for the Crossref REST API. For example:  - [crossref-commons](https://gitlab.com/crossref/crossref_commons_py) (Python, developed by Crossref) - [habanero](https://github.com/sckott/habanero) (Python) - [serrano](https://github.com/sckott/serrano) (Ruby) - [rcrossref](https://github.com/ropensci/rcrossref) (R) - [crossrefapi](https://github.com/fabiobatalha/crossrefapi) (Python) - [crossref-rs](https://github.com/MattsSe/crossref-rs) (rust)  If you know of another library you would like to see listed here, please let us know about it via the [issue tracker](https://gitlab.com/crossref/issues).  ### Etiquette  We want to provide a public, open, and free API for all. And we don\'t want to unnecessarily burden developers (or ourselves) with cumbersome API tokens or registration processes in order to use the public REST API. For that to work, we ask that you be polite and try not to do anything that will take the public REST API down or otherwise make it unusable for others. Specifically, we encourage the following polite behaviour:  - Cache data so you don\'t request the same data over and over again. - Actively monitor API response times. If they start to go up, back-off for a while. For example, add pauses between requests and/or reduce the number of parallel requests. - Specify a `User-Agent` header that properly identifies your script or tool and that provides a means of contacting you via email using \"mailto:\". For example: `GroovyBib/1.1 (https://example.org/GroovyBib/; mailto:GroovyBib@example.org) BasedOnFunkyLib/1.4`. This way we can contact you if we see a problem. - report problems and/or ask questions on our [issue tracker](https://gitlab.com/crossref/issues).  Alas, not all people are polite. And for this reason we reserve the right to impose rate limits and/or to block clients that are disrupting the public service.  ### Good manners = more reliable service  But we prefer carrots to sticks. As of September 18th 2017 any API queries that **use HTTPS and have appropriate contact information** will be directed to a special pool of API machines that are reserved for polite users.  Why are are we doing this? Well- we don\'t want to force users to have to register with us. But this means that if some user of the public server writes a buggy script or ignores timeouts and errors- they can really bring the API service to its knees. What\'s more, it is very hard for us to identify these problem users because they tend to work off multiple parallel machines and use generic User-Agent headers. They are effectively anonymous. We\'re starting to have to spend a lot of time dealing with these problems and the degraded performance of the public API is affecting all the polite users as well.  So... we are keeping the public service as is. It will probably continue to fluctuate widely in performance. But now, if a client connects to the API using HTTPS and provides contact information either in their User-Agent header or as a parameter on their queries, then we will send them to a separate pool of machines. We expect to be able to better control the performance of these machines because, if a script starts causing problems, we can contact the people responsible for the script to ask them to fix it. Or, in extremis, we can block it.  How does it work? Simple. You can do one of two things to get directed to the \"polite pool\":  1) Include a \"mailto\" parameter in your query. For example: `https://api.crossref.org/works?filter=has-full-text:true&mailto=GroovyBib@example.org` 2) Include a \"mailto:\" in your User-Agent header. For example: `GroovyBib/1.1 (https://example.org/GroovyBib/; mailto:GroovyBib@example.org) BasedOnFunkyLib/1.4`.  Note that this only works if you query the API using HTTPS. You really should be doing that anyway (wags finger).  #### Frequently anticipated questions  **Q:** Will you spam me with marketing [bumf](https://en.oxforddictionaries.com/definition/bumf) once you have our contact info?  **A:** No. We will only use it to contact you about problems with your scripts.   **Q:** Is this a secret plot to kill public access to your API?  **A:** No. It is an attempt to keep the public API reliable.   **Q:** What if I provide fake or incorrect contact info?  **A:** That is not very polite. If there is a problem and you don\'t respond, we\'ll block you.   **Q:** Does the contact info have to be a real name?  **A:** No. As long as somebody actually receives and pays attention to email at the address, it can be pseudo-anonymous, or whatever.  #### Rate limits  From time to time Crossref needs to impose rate limits to ensure that the free API is usable by all. Any rate limits that are in effect will be advertised in the `X-Rate-Limit-Limit` and `X-Rate-Limit-Interval` HTTP headers.  For ease-of-parsing, the `X-Rate-Limit-Interval` will always be expressed in seconds. So, for example the following tells you that you should expect to be able to perform 50 requests a second:  ``` X-Rate-Limit-Limit: 50 X-Rate-Limit-Interval: 1s ```  Note that if we wanted to adjust the measurement window, we could specify:  ``` X-Rate-Limit-Limit: 3000 X-Rate-Limit-Interval: 60s ```  #### Blocking  This is always our last resort, and you can generally avoid it if you include contact information in the `User-Agent` header or `mailto` parameter as described above.  But seriously... this is a bummer. We really want you to use the API. If you are polite about it, you shouldn\'t have any problems.  ### Use for production services  What if you want to use our API for a production service that cannot depend on the performance uncertainties of the free and open public API? What if you don\'t want to be affected by impolite people who do not follow the API Etiquette guidelines? Well, if you’re interested in using these tools or APIs for production services, we [have a service-level offering](https://www.crossref.org/services/metadata-retrieval/metadata-plus/) called \"Plus\". This service provides you with access to all supported APIs and metadata, but with extra service and support guarantees.  #### Authorization token for Plus service  When you sign up for the Plus service, you will be issued an API token that you should put in the `Authorization` header of all your rest API requests. This token will ensure that said requests get directed to a pool of machines that are reserved for \"Plus\" SLA users. For example, with [curl](https://curl.haxx.se/):  ``` curl -X GET \\   https://api.crossref.org/works \\   -H \'Crossref-Plus-API-Token: Bearer yJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vY3Jvc3NyZWYub3JnLyIsImF1ZXYZImVuaGFuY2VkY21zIiwianRpIjoiN0M5ODlFNTItMTFEQS00QkY3LUJCRUUtODFCMUM3QzE0OTZEIn0.NYe3-O066sce9R1fjMzNEvP88VqSEaYdBY622FDiG8Uq\' \\   -H \'User-Agent: GroovyBib/1.1 (https://example.org/GroovyBib/; mailto:GroovyBib@example.org) BasedOnFunkyLib/1.4\' ```  Note that you can still be \"polite\" and identify yourself as well. And, of course, replace the fake token above with the real token.  ## API overview  The API is generally RESTFUL and returns results in JSON.  The API supports HTTP and HTTPS. Examples here are provided using HTTPS.  You should always url-encode DOIs and parameter values when using the API. DOIs are notorious for including characters that break URLs (e.g. semicolons, hashes, slashes, ampersands, question marks, etc.).  Note url-encoding applies to cursors as well since they too are likely to include characters that will break URLs (e.g. `+` symbol)  Note that, for the sake of clarity, the examples in this document do *not* url-encode DOIs or parameter values.  The API will only work for Crossref DOIs. You can test the registration agency for a DOI using the following route:  `https://api.crossref.org/works/{doi}/agency`  Testing the following Crossref DOI:  `10.1037/0003-066X.59.1.29`  Using the URL:  `https://api.crossref.org/works/10.1037/0003-066X.59.1.29/agency`  Will return the following result:      {       status: \"ok\",       message-type: \"work-agency\",       message-version: \"1.0.0\",       message: {         DOI: \"10.1037/0003-066x.59.1.29\",         agency: {           id: \"crossref\",           label: \"Crossref\"         }       }     }  If you use any of the API calls listed below with a non-Crossref DOI, you will get a `404` HTTP status response. Typical agency IDs include `crossref`, `datacite`, `medra` and also `public` for test DOIs.  ## Result types  All results are returned in JSON. There are three general types of results:  - Singletons - Headers-only - Lists  The mime-type for API results is `application/vnd.crossref-api-message+json`  ### Singletons  Singletons are single results. Retrieving metadata for a specific identifier (e.g. DOI, ISSN, funder identifier) typically returns a singleton result.  ### Headers only  You can use HTTP HEAD requests to quickly determine \"existence\" of a singleton. The advantage of this technique is that it is very fast because it does not return any metadata- it only returns headers and an HTTP status code (200=exists, 404=does not exist).  To determine if member ID `98` exists:  `curl --head \"http://api.crossref.org/members/98\"`  To determine if a journal with ISSN `1549-7712` exists:  `curl --head \"http://api.crossref.org/journals/1549-7712\"`  ### Lists  Lists results can contain multiple entries. Searching or filtering typically returns a list result. A list has two parts:  - Summary, which include the following information:      - status (e.g. \"ok\", error)     - message-type (e.g. \"work-list\" )     - message-version (e.g. 1.0.0 )  - Items, which will contain the items matching the query or filter.  Note that the \"message-type\" returned will differ from the mime-type:  - funder (singleton) - prefix (singleton) - member (singleton) - work (singleton) - work-list (list) - funder-list (list) - prefix-list (list) - member-list (list)  Normally, an API list result will return both the summary and the items. If you want to just retrieve the summary, you can do so by specifying that the number of rows returned should be zero.  #### Sort order  If the API call includes a query, then the sort order will be by the relevance score. If no query is included, then the sort order will be by DOI update date.  The API allows also for custom sorting. See the documentation for each endpoint to find the list of elements that you can sort by.  #### Pagination  Large result sets can be traversed one of two ways: offsets or deep paging with cursor. Offsets are available on all `list` endpoints. Offsets are easier to use, but can be slow for larger sets, and the total number of results available through offsets is limited. Deep paging is available on selected endpoints, has better performance for large data sets, and there is no limit on total number of available results.  See the documentation for each endpoint for available paging options. 
 *
 * The version of the OpenAPI document: 0.1
 * Contact: support@crossref.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    Author,
    AuthorFromJSON,
    AuthorFromJSONTyped,
    AuthorToJSON,
    DateParts,
    DatePartsFromJSON,
    DatePartsFromJSONTyped,
    DatePartsToJSON,
    ModelDate,
    ModelDateFromJSON,
    ModelDateFromJSONTyped,
    ModelDateToJSON,
    Reference,
    ReferenceFromJSON,
    ReferenceFromJSONTyped,
    ReferenceToJSON,
    WorkAssertion,
    WorkAssertionFromJSON,
    WorkAssertionFromJSONTyped,
    WorkAssertionToJSON,
    WorkClinicalTrial,
    WorkClinicalTrialFromJSON,
    WorkClinicalTrialFromJSONTyped,
    WorkClinicalTrialToJSON,
    WorkDomain,
    WorkDomainFromJSON,
    WorkDomainFromJSONTyped,
    WorkDomainToJSON,
    WorkFreeToRead,
    WorkFreeToReadFromJSON,
    WorkFreeToReadFromJSONTyped,
    WorkFreeToReadToJSON,
    WorkFunder,
    WorkFunderFromJSON,
    WorkFunderFromJSONTyped,
    WorkFunderToJSON,
    WorkISSNType,
    WorkISSNTypeFromJSON,
    WorkISSNTypeFromJSONTyped,
    WorkISSNTypeToJSON,
    WorkInstitution,
    WorkInstitutionFromJSON,
    WorkInstitutionFromJSONTyped,
    WorkInstitutionToJSON,
    WorkJournalIssue,
    WorkJournalIssueFromJSON,
    WorkJournalIssueFromJSONTyped,
    WorkJournalIssueToJSON,
    WorkLicense,
    WorkLicenseFromJSON,
    WorkLicenseFromJSONTyped,
    WorkLicenseToJSON,
    WorkLink,
    WorkLinkFromJSON,
    WorkLinkFromJSONTyped,
    WorkLinkToJSON,
    WorkReview,
    WorkReviewFromJSON,
    WorkReviewFromJSONTyped,
    WorkReviewToJSON,
    WorkStandardsBody,
    WorkStandardsBodyFromJSON,
    WorkStandardsBodyFromJSONTyped,
    WorkStandardsBodyToJSON,
    WorkUpdate,
    WorkUpdateFromJSON,
    WorkUpdateFromJSONTyped,
    WorkUpdateToJSON,
    WorksMessageMessageItemsRelationJavaLangString34985,
    WorksMessageMessageItemsRelationJavaLangString34985FromJSON,
    WorksMessageMessageItemsRelationJavaLangString34985FromJSONTyped,
    WorksMessageMessageItemsRelationJavaLangString34985ToJSON,
} from './';

/**
 * 
 * @export
 * @interface Work
 */
export interface Work {
    /**
     * 
     * @type {WorkInstitution}
     * @memberof Work
     */
    institution?: WorkInstitution;
    /**
     * 
     * @type {ModelDate}
     * @memberof Work
     */
    indexed: ModelDate;
    /**
     * 
     * @type {DateParts}
     * @memberof Work
     */
    posted?: DateParts;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    publisherLocation?: string;
    /**
     * 
     * @type {Array<WorkUpdate>}
     * @memberof Work
     */
    updateTo?: Array<WorkUpdate>;
    /**
     * 
     * @type {Array<WorkStandardsBody>}
     * @memberof Work
     */
    standardsBody?: Array<WorkStandardsBody>;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    editionNumber?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof Work
     */
    groupTitle?: Array<string>;
    /**
     * 
     * @type {number}
     * @memberof Work
     */
    referenceCount: number;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    publisher: string;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    issue?: string;
    /**
     * 
     * @type {Array<WorkISSNType>}
     * @memberof Work
     */
    isbnType?: Array<WorkISSNType>;
    /**
     * 
     * @type {Array<WorkLicense>}
     * @memberof Work
     */
    license?: Array<WorkLicense>;
    /**
     * 
     * @type {Array<WorkFunder>}
     * @memberof Work
     */
    funder?: Array<WorkFunder>;
    /**
     * 
     * @type {WorkDomain}
     * @memberof Work
     */
    contentDomain: WorkDomain;
    /**
     * 
     * @type {Array<Author>}
     * @memberof Work
     */
    chair?: Array<Author>;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    shortContainerTitle?: string;
    /**
     * 
     * @type {DateParts}
     * @memberof Work
     */
    accepted?: DateParts;
    /**
     * 
     * @type {DateParts}
     * @memberof Work
     */
    contentUpdated?: DateParts;
    /**
     * 
     * @type {DateParts}
     * @memberof Work
     */
    publishedPrint?: DateParts;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    _abstract?: string;
    /**
     * The DOI identifier associated with the work
     * @type {string}
     * @memberof Work
     */
    dOI: string;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    type: string;
    /**
     * 
     * @type {ModelDate}
     * @memberof Work
     */
    created: ModelDate;
    /**
     * 
     * @type {DateParts}
     * @memberof Work
     */
    approved?: DateParts;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    page?: string;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    updatePolicy?: string;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    source: string;
    /**
     * 
     * @type {number}
     * @memberof Work
     */
    isReferencedByCount: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof Work
     */
    title: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    prefix: string;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    volume?: string;
    /**
     * 
     * @type {Array<WorkClinicalTrial>}
     * @memberof Work
     */
    clinicalTrialNumber?: Array<WorkClinicalTrial>;
    /**
     * 
     * @type {Array<Author>}
     * @memberof Work
     */
    author: Array<Author>;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    member: string;
    /**
     * 
     * @type {DateParts}
     * @memberof Work
     */
    contentCreated?: DateParts;
    /**
     * 
     * @type {DateParts}
     * @memberof Work
     */
    publishedOnline?: DateParts;
    /**
     * 
     * @type {Reference}
     * @memberof Work
     */
    reference?: Reference;
    /**
     * 
     * @type {Array<string>}
     * @memberof Work
     */
    containerTitle?: Array<string>;
    /**
     * 
     * @type {WorkReview}
     * @memberof Work
     */
    review?: WorkReview;
    /**
     * 
     * @type {Array<string>}
     * @memberof Work
     */
    originalTitle?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    language?: string;
    /**
     * 
     * @type {Array<WorkLink>}
     * @memberof Work
     */
    link?: Array<WorkLink>;
    /**
     * 
     * @type {ModelDate}
     * @memberof Work
     */
    deposited: ModelDate;
    /**
     * 
     * @type {number}
     * @memberof Work
     */
    score: number;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    degree?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof Work
     */
    subtitle?: Array<string>;
    /**
     * 
     * @type {Array<Author>}
     * @memberof Work
     */
    translator?: Array<Author>;
    /**
     * 
     * @type {WorkFreeToRead}
     * @memberof Work
     */
    freeToRead?: WorkFreeToRead;
    /**
     * 
     * @type {Array<Author>}
     * @memberof Work
     */
    editor?: Array<Author>;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    componentNumber?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof Work
     */
    shortTitle?: Array<string>;
    /**
     * 
     * @type {DateParts}
     * @memberof Work
     */
    issued: DateParts;
    /**
     * 
     * @type {Array<string>}
     * @memberof Work
     */
    iSBN?: Array<string>;
    /**
     * 
     * @type {number}
     * @memberof Work
     */
    referencesCount: number;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    partNumber?: string;
    /**
     * 
     * @type {WorkJournalIssue}
     * @memberof Work
     */
    journalIssue?: WorkJournalIssue;
    /**
     * 
     * @type {Array<string>}
     * @memberof Work
     */
    alternativeId?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    uRL: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof Work
     */
    archive?: Array<string>;
    /**
     * 
     * @type {{ [key: string]: WorksMessageMessageItemsRelationJavaLangString34985; }}
     * @memberof Work
     */
    relation?: { [key: string]: WorksMessageMessageItemsRelationJavaLangString34985; };
    /**
     * 
     * @type {Array<string>}
     * @memberof Work
     */
    iSSN?: Array<string>;
    /**
     * 
     * @type {Array<WorkISSNType>}
     * @memberof Work
     */
    issnType?: Array<WorkISSNType>;
    /**
     * 
     * @type {Array<string>}
     * @memberof Work
     */
    subject?: Array<string>;
    /**
     * 
     * @type {DateParts}
     * @memberof Work
     */
    publishedOther?: DateParts;
    /**
     * 
     * @type {DateParts}
     * @memberof Work
     */
    published?: DateParts;
    /**
     * 
     * @type {Array<WorkAssertion>}
     * @memberof Work
     */
    assertion?: Array<WorkAssertion>;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    subtype?: string;
    /**
     * 
     * @type {string}
     * @memberof Work
     */
    articleNumber?: string;
}

export function WorkFromJSON(json: any): Work {
    return WorkFromJSONTyped(json, false);
}

export function WorkFromJSONTyped(json: any, ignoreDiscriminator: boolean): Work {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'institution': !exists(json, 'institution') ? undefined : WorkInstitutionFromJSON(json['institution']),
        'indexed': ModelDateFromJSON(json['indexed']),
        'posted': !exists(json, 'posted') ? undefined : DatePartsFromJSON(json['posted']),
        'publisherLocation': !exists(json, 'publisher-location') ? undefined : json['publisher-location'],
        'updateTo': !exists(json, 'update-to') ? undefined : ((json['update-to'] as Array<any>).map(WorkUpdateFromJSON)),
        'standardsBody': !exists(json, 'standards-body') ? undefined : ((json['standards-body'] as Array<any>).map(WorkStandardsBodyFromJSON)),
        'editionNumber': !exists(json, 'edition-number') ? undefined : json['edition-number'],
        'groupTitle': !exists(json, 'group-title') ? undefined : json['group-title'],
        'referenceCount': json['reference-count'],
        'publisher': json['publisher'],
        'issue': !exists(json, 'issue') ? undefined : json['issue'],
        'isbnType': !exists(json, 'isbn-type') ? undefined : ((json['isbn-type'] as Array<any>).map(WorkISSNTypeFromJSON)),
        'license': !exists(json, 'license') ? undefined : ((json['license'] as Array<any>).map(WorkLicenseFromJSON)),
        'funder': !exists(json, 'funder') ? undefined : ((json['funder'] as Array<any>).map(WorkFunderFromJSON)),
        'contentDomain': WorkDomainFromJSON(json['content-domain']),
        'chair': !exists(json, 'chair') ? undefined : ((json['chair'] as Array<any>).map(AuthorFromJSON)),
        'shortContainerTitle': !exists(json, 'short-container-title') ? undefined : json['short-container-title'],
        'accepted': !exists(json, 'accepted') ? undefined : DatePartsFromJSON(json['accepted']),
        'contentUpdated': !exists(json, 'content-updated') ? undefined : DatePartsFromJSON(json['content-updated']),
        'publishedPrint': !exists(json, 'published-print') ? undefined : DatePartsFromJSON(json['published-print']),
        '_abstract': !exists(json, 'abstract') ? undefined : json['abstract'],
        'dOI': json['DOI'],
        'type': json['type'],
        'created': ModelDateFromJSON(json['created']),
        'approved': !exists(json, 'approved') ? undefined : DatePartsFromJSON(json['approved']),
        'page': !exists(json, 'page') ? undefined : json['page'],
        'updatePolicy': !exists(json, 'update-policy') ? undefined : json['update-policy'],
        'source': json['source'],
        'isReferencedByCount': json['is-referenced-by-count'],
        'title': json['title'],
        'prefix': json['prefix'],
        'volume': !exists(json, 'volume') ? undefined : json['volume'],
        'clinicalTrialNumber': !exists(json, 'clinical-trial-number') ? undefined : ((json['clinical-trial-number'] as Array<any>).map(WorkClinicalTrialFromJSON)),
        'author': ((json['author'] as Array<any>).map(AuthorFromJSON)),
        'member': json['member'],
        'contentCreated': !exists(json, 'content-created') ? undefined : DatePartsFromJSON(json['content-created']),
        'publishedOnline': !exists(json, 'published-online') ? undefined : DatePartsFromJSON(json['published-online']),
        'reference': !exists(json, 'reference') ? undefined : ReferenceFromJSON(json['reference']),
        'containerTitle': !exists(json, 'container-title') ? undefined : json['container-title'],
        'review': !exists(json, 'review') ? undefined : WorkReviewFromJSON(json['review']),
        'originalTitle': !exists(json, 'original-title') ? undefined : json['original-title'],
        'language': !exists(json, 'language') ? undefined : json['language'],
        'link': !exists(json, 'link') ? undefined : ((json['link'] as Array<any>).map(WorkLinkFromJSON)),
        'deposited': ModelDateFromJSON(json['deposited']),
        'score': json['score'],
        'degree': !exists(json, 'degree') ? undefined : json['degree'],
        'subtitle': !exists(json, 'subtitle') ? undefined : json['subtitle'],
        'translator': !exists(json, 'translator') ? undefined : ((json['translator'] as Array<any>).map(AuthorFromJSON)),
        'freeToRead': !exists(json, 'free-to-read') ? undefined : WorkFreeToReadFromJSON(json['free-to-read']),
        'editor': !exists(json, 'editor') ? undefined : ((json['editor'] as Array<any>).map(AuthorFromJSON)),
        'componentNumber': !exists(json, 'component-number') ? undefined : json['component-number'],
        'shortTitle': !exists(json, 'short-title') ? undefined : json['short-title'],
        'issued': DatePartsFromJSON(json['issued']),
        'iSBN': !exists(json, 'ISBN') ? undefined : json['ISBN'],
        'referencesCount': json['references-count'],
        'partNumber': !exists(json, 'part-number') ? undefined : json['part-number'],
        'journalIssue': !exists(json, 'journal-issue') ? undefined : WorkJournalIssueFromJSON(json['journal-issue']),
        'alternativeId': !exists(json, 'alternative-id') ? undefined : json['alternative-id'],
        'uRL': json['URL'],
        'archive': !exists(json, 'archive') ? undefined : json['archive'],
        'relation': !exists(json, 'relation') ? undefined : (mapValues(json['relation'], WorksMessageMessageItemsRelationJavaLangString34985FromJSON)),
        'iSSN': !exists(json, 'ISSN') ? undefined : json['ISSN'],
        'issnType': !exists(json, 'issn-type') ? undefined : ((json['issn-type'] as Array<any>).map(WorkISSNTypeFromJSON)),
        'subject': !exists(json, 'subject') ? undefined : json['subject'],
        'publishedOther': !exists(json, 'published-other') ? undefined : DatePartsFromJSON(json['published-other']),
        'published': !exists(json, 'published') ? undefined : DatePartsFromJSON(json['published']),
        'assertion': !exists(json, 'assertion') ? undefined : ((json['assertion'] as Array<any>).map(WorkAssertionFromJSON)),
        'subtype': !exists(json, 'subtype') ? undefined : json['subtype'],
        'articleNumber': !exists(json, 'article-number') ? undefined : json['article-number'],
    };
}

export function WorkToJSON(value?: Work | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'institution': WorkInstitutionToJSON(value.institution),
        'indexed': ModelDateToJSON(value.indexed),
        'posted': DatePartsToJSON(value.posted),
        'publisher-location': value.publisherLocation,
        'update-to': value.updateTo === undefined ? undefined : ((value.updateTo as Array<any>).map(WorkUpdateToJSON)),
        'standards-body': value.standardsBody === undefined ? undefined : ((value.standardsBody as Array<any>).map(WorkStandardsBodyToJSON)),
        'edition-number': value.editionNumber,
        'group-title': value.groupTitle,
        'reference-count': value.referenceCount,
        'publisher': value.publisher,
        'issue': value.issue,
        'isbn-type': value.isbnType === undefined ? undefined : ((value.isbnType as Array<any>).map(WorkISSNTypeToJSON)),
        'license': value.license === undefined ? undefined : ((value.license as Array<any>).map(WorkLicenseToJSON)),
        'funder': value.funder === undefined ? undefined : ((value.funder as Array<any>).map(WorkFunderToJSON)),
        'content-domain': WorkDomainToJSON(value.contentDomain),
        'chair': value.chair === undefined ? undefined : ((value.chair as Array<any>).map(AuthorToJSON)),
        'short-container-title': value.shortContainerTitle,
        'accepted': DatePartsToJSON(value.accepted),
        'content-updated': DatePartsToJSON(value.contentUpdated),
        'published-print': DatePartsToJSON(value.publishedPrint),
        'abstract': value._abstract,
        'DOI': value.dOI,
        'type': value.type,
        'created': ModelDateToJSON(value.created),
        'approved': DatePartsToJSON(value.approved),
        'page': value.page,
        'update-policy': value.updatePolicy,
        'source': value.source,
        'is-referenced-by-count': value.isReferencedByCount,
        'title': value.title,
        'prefix': value.prefix,
        'volume': value.volume,
        'clinical-trial-number': value.clinicalTrialNumber === undefined ? undefined : ((value.clinicalTrialNumber as Array<any>).map(WorkClinicalTrialToJSON)),
        'author': ((value.author as Array<any>).map(AuthorToJSON)),
        'member': value.member,
        'content-created': DatePartsToJSON(value.contentCreated),
        'published-online': DatePartsToJSON(value.publishedOnline),
        'reference': ReferenceToJSON(value.reference),
        'container-title': value.containerTitle,
        'review': WorkReviewToJSON(value.review),
        'original-title': value.originalTitle,
        'language': value.language,
        'link': value.link === undefined ? undefined : ((value.link as Array<any>).map(WorkLinkToJSON)),
        'deposited': ModelDateToJSON(value.deposited),
        'score': value.score,
        'degree': value.degree,
        'subtitle': value.subtitle,
        'translator': value.translator === undefined ? undefined : ((value.translator as Array<any>).map(AuthorToJSON)),
        'free-to-read': WorkFreeToReadToJSON(value.freeToRead),
        'editor': value.editor === undefined ? undefined : ((value.editor as Array<any>).map(AuthorToJSON)),
        'component-number': value.componentNumber,
        'short-title': value.shortTitle,
        'issued': DatePartsToJSON(value.issued),
        'ISBN': value.iSBN,
        'references-count': value.referencesCount,
        'part-number': value.partNumber,
        'journal-issue': WorkJournalIssueToJSON(value.journalIssue),
        'alternative-id': value.alternativeId,
        'URL': value.uRL,
        'archive': value.archive,
        'relation': value.relation === undefined ? undefined : (mapValues(value.relation, WorksMessageMessageItemsRelationJavaLangString34985ToJSON)),
        'ISSN': value.iSSN,
        'issn-type': value.issnType === undefined ? undefined : ((value.issnType as Array<any>).map(WorkISSNTypeToJSON)),
        'subject': value.subject,
        'published-other': DatePartsToJSON(value.publishedOther),
        'published': DatePartsToJSON(value.published),
        'assertion': value.assertion === undefined ? undefined : ((value.assertion as Array<any>).map(WorkAssertionToJSON)),
        'subtype': value.subtype,
        'article-number': value.articleNumber,
    };
}


