declare module OrcidResponse {

    export interface OrcidIdentifier {
        uri: string;
        path: string;
        host: string;
    }

    export interface Preferences {
        locale: string;
    }

    export interface CompletionDate {
        value: Date;
    }

    export interface SubmissionDate {
        value: Date;
    }

    export interface LastModifiedDate {
        value: Date;
    }

    export interface SourceOrcid {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName {
        value: string;
    }

    export interface AssertionOriginOrcid {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName {
        value: string;
    }

    export interface Source {
        source-orcid: SourceOrcid;
        source-client-id: SourceClientId;
        source-name: SourceName;
        assertion-origin-orcid: AssertionOriginOrcid;
        assertion-origin-client-id: AssertionOriginClientId;
        assertion-origin-name: AssertionOriginName;
    }

    export interface DeactivationDate {
        value: Date;
    }

    export interface History {
        creation-method: string;
        completion-date: CompletionDate;
        submission-date: SubmissionDate;
        last-modified-date: LastModifiedDate;
        claimed: boolean;
        source: Source;
        deactivation-date: DeactivationDate;
        verified-email: boolean;
        verified-primary-email: boolean;
    }

    export interface LastModifiedDate2 {
        value: Date;
    }

    export interface CreatedDate {
        value: Date;
    }

    export interface LastModifiedDate3 {
        value: Date;
    }

    export interface GivenNames {
        value: string;
    }

    export interface FamilyName {
        value: string;
    }

    export interface CreditName {
        value: string;
    }

    export interface SourceOrcid2 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId2 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName2 {
        value: string;
    }

    export interface AssertionOriginOrcid2 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId2 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName2 {
        value: string;
    }

    export interface Source2 {
        source-orcid: SourceOrcid2;
        source-client-id: SourceClientId2;
        source-name: SourceName2;
        assertion-origin-orcid: AssertionOriginOrcid2;
        assertion-origin-client-id: AssertionOriginClientId2;
        assertion-origin-name: AssertionOriginName2;
    }

    export interface Name {
        created-date: CreatedDate;
        last-modified-date: LastModifiedDate3;
        given-names: GivenNames;
        family-name: FamilyName;
        credit-name: CreditName;
        source: Source2;
        visibility: string;
        path: string;
    }

    export interface LastModifiedDate4 {
        value: Date;
    }

    export interface CreatedDate2 {
        value: Date;
    }

    export interface LastModifiedDate5 {
        value: Date;
    }

    export interface SourceOrcid3 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId3 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName3 {
        value: string;
    }

    export interface AssertionOriginOrcid3 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId3 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName3 {
        value: string;
    }

    export interface Source3 {
        source-orcid: SourceOrcid3;
        source-client-id: SourceClientId3;
        source-name: SourceName3;
        assertion-origin-orcid: AssertionOriginOrcid3;
        assertion-origin-client-id: AssertionOriginClientId3;
        assertion-origin-name: AssertionOriginName3;
    }

    export interface OtherName {
        created-date: CreatedDate2;
        last-modified-date: LastModifiedDate5;
        source: Source3;
        content: string;
        visibility: string;
        path: string;
        put-code: number;
        display-index: number;
    }

    export interface OtherNames {
        last-modified-date: LastModifiedDate4;
        other-name: OtherName[];
        path: string;
    }

    export interface CreatedDate3 {
        value: Date;
    }

    export interface LastModifiedDate6 {
        value: Date;
    }

    export interface Biography {
        created-date: CreatedDate3;
        last-modified-date: LastModifiedDate6;
        content: string;
        visibility: string;
        path: string;
    }

    export interface LastModifiedDate7 {
        value: Date;
    }

    export interface CreatedDate4 {
        value: Date;
    }

    export interface LastModifiedDate8 {
        value: Date;
    }

    export interface SourceOrcid4 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId4 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName4 {
        value: string;
    }

    export interface AssertionOriginOrcid4 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId4 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName4 {
        value: string;
    }

    export interface Source4 {
        source-orcid: SourceOrcid4;
        source-client-id: SourceClientId4;
        source-name: SourceName4;
        assertion-origin-orcid: AssertionOriginOrcid4;
        assertion-origin-client-id: AssertionOriginClientId4;
        assertion-origin-name: AssertionOriginName4;
    }

    export interface Url {
        value: string;
    }

    export interface ResearcherUrl {
        created-date: CreatedDate4;
        last-modified-date: LastModifiedDate8;
        source: Source4;
        url-name: string;
        url: Url;
        visibility: string;
        path: string;
        put-code: number;
        display-index: number;
    }

    export interface ResearcherUrls {
        last-modified-date: LastModifiedDate7;
        researcher-url: ResearcherUrl[];
        path: string;
    }

    export interface LastModifiedDate9 {
        value: Date;
    }

    export interface CreatedDate5 {
        value: Date;
    }

    export interface LastModifiedDate10 {
        value: Date;
    }

    export interface SourceOrcid5 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId5 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName5 {
        value: string;
    }

    export interface AssertionOriginOrcid5 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId5 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName5 {
        value: string;
    }

    export interface Source5 {
        source-orcid: SourceOrcid5;
        source-client-id: SourceClientId5;
        source-name: SourceName5;
        assertion-origin-orcid: AssertionOriginOrcid5;
        assertion-origin-client-id: AssertionOriginClientId5;
        assertion-origin-name: AssertionOriginName5;
    }

    export interface Email {
        created-date: CreatedDate5;
        last-modified-date: LastModifiedDate10;
        source: Source5;
        email: string;
        path: string;
        visibility: string;
        verified: boolean;
        primary: boolean;
        put-code: number;
    }

    export interface Emails {
        last-modified-date: LastModifiedDate9;
        email: Email[];
        path: string;
    }

    export interface LastModifiedDate11 {
        value: Date;
    }

    export interface CreatedDate6 {
        value: Date;
    }

    export interface LastModifiedDate12 {
        value: Date;
    }

    export interface SourceOrcid6 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId6 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName6 {
        value: string;
    }

    export interface AssertionOriginOrcid6 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId6 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName6 {
        value: string;
    }

    export interface Source6 {
        source-orcid: SourceOrcid6;
        source-client-id: SourceClientId6;
        source-name: SourceName6;
        assertion-origin-orcid: AssertionOriginOrcid6;
        assertion-origin-client-id: AssertionOriginClientId6;
        assertion-origin-name: AssertionOriginName6;
    }

    export interface Country {
        value: string;
    }

    export interface Address {
        created-date: CreatedDate6;
        last-modified-date: LastModifiedDate12;
        source: Source6;
        country: Country;
        visibility: string;
        path: string;
        put-code: number;
        display-index: number;
    }

    export interface Addresses {
        last-modified-date: LastModifiedDate11;
        address: Address[];
        path: string;
    }

    export interface LastModifiedDate13 {
        value: Date;
    }

    export interface CreatedDate7 {
        value: Date;
    }

    export interface LastModifiedDate14 {
        value: Date;
    }

    export interface SourceOrcid7 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId7 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName7 {
        value: string;
    }

    export interface AssertionOriginOrcid7 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId7 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName7 {
        value: string;
    }

    export interface Source7 {
        source-orcid: SourceOrcid7;
        source-client-id: SourceClientId7;
        source-name: SourceName7;
        assertion-origin-orcid: AssertionOriginOrcid7;
        assertion-origin-client-id: AssertionOriginClientId7;
        assertion-origin-name: AssertionOriginName7;
    }

    export interface Keyword {
        created-date: CreatedDate7;
        last-modified-date: LastModifiedDate14;
        source: Source7;
        content: string;
        visibility: string;
        path: string;
        put-code: number;
        display-index: number;
    }

    export interface Keywords {
        last-modified-date: LastModifiedDate13;
        keyword: Keyword[];
        path: string;
    }

    export interface LastModifiedDate15 {
        value: Date;
    }

    export interface CreatedDate8 {
        value: Date;
    }

    export interface LastModifiedDate16 {
        value: Date;
    }

    export interface SourceOrcid8 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId8 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName8 {
        value: string;
    }

    export interface AssertionOriginOrcid8 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId8 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName8 {
        value: string;
    }

    export interface Source8 {
        source-orcid: SourceOrcid8;
        source-client-id: SourceClientId8;
        source-name: SourceName8;
        assertion-origin-orcid: AssertionOriginOrcid8;
        assertion-origin-client-id: AssertionOriginClientId8;
        assertion-origin-name: AssertionOriginName8;
    }

    export interface ExternalIdUrl {
        value: string;
    }

    export interface ExternalIdentifier {
        created-date: CreatedDate8;
        last-modified-date: LastModifiedDate16;
        source: Source8;
        external-id-type: string;
        external-id-value: string;
        external-id-url: ExternalIdUrl;
        external-id-relationship: string;
        visibility: string;
        path: string;
        put-code: number;
        display-index: number;
    }

    export interface ExternalIdentifiers {
        last-modified-date: LastModifiedDate15;
        external-identifier: ExternalIdentifier[];
        path: string;
    }

    export interface OrcidPerson {
        lastModifiedDate: LastModifiedDate2;
        name: Name,
        "other-names": OtherNames;
        biography: Biography;
        "researcher-urls": ResearcherUrls;
        emails: Emails,
        addresses: Addresses;
        keywords: Keywords;
        "external-identifiers": ExternalIdentifiers;
        path: string;
    }

    export interface LastModifiedDate17 {
        value: Date;
    }

    export interface LastModifiedDate18 {
        value: Date;
    }

    export interface LastModifiedDate19 {
        value: Date;
    }

    export interface ExternalIdNormalized {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl2 {
        value: string;
    }

    export interface ExternalId {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized;
        external-id-normalized-error: ExternalIdNormalizedError;
        external-id-url: ExternalIdUrl2;
        external-id-relationship: string;
    }

    export interface ExternalIds {
        external-id: ExternalId[];
    }

    export interface CreatedDate9 {
        value: Date;
    }

    export interface LastModifiedDate20 {
        value: Date;
    }

    export interface SourceOrcid9 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId9 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName9 {
        value: string;
    }

    export interface AssertionOriginOrcid9 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId9 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName9 {
        value: string;
    }

    export interface Source9 {
        source-orcid: SourceOrcid9;
        source-client-id: SourceClientId9;
        source-name: SourceName9;
        assertion-origin-orcid: AssertionOriginOrcid9;
        assertion-origin-client-id: AssertionOriginClientId9;
        assertion-origin-name: AssertionOriginName9;
    }

    export interface Year {
        value: string;
    }

    export interface Month {
        value: string;
    }

    export interface Day {
        value: string;
    }

    export interface StartDate {
        year: Year;
        month: Month;
        day: Day;
    }

    export interface Year2 {
        value: string;
    }

    export interface Month2 {
        value: string;
    }

    export interface Day2 {
        value: string;
    }

    export interface EndDate {
        year: Year2;
        month: Month2;
        day: Day2;
    }

    export interface Address2 {
        city: string;
        region: string;
        country: string;
    }

    export interface DisambiguatedOrganization {
        disambiguated-organization-identifier: string;
        disambiguation-source: string;
    }

    export interface Organization {
        name: string;
        address: Address2;
        disambiguated-organization: DisambiguatedOrganization;
    }

    export interface Url2 {
        value: string;
    }

    export interface ExternalIdNormalized2 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError2 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl3 {
        value: string;
    }

    export interface ExternalId2 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized2;
        external-id-normalized-error: ExternalIdNormalizedError2;
        external-id-url: ExternalIdUrl3;
        external-id-relationship: string;
    }

    export interface ExternalIds2 {
        external-id: ExternalId2[];
    }

    export interface Summary {
        created-date: CreatedDate9;
        last-modified-date: LastModifiedDate20;
        source: Source9;
        put-code: number;
        department-name: string;
        role-title: string;
        start-date: StartDate;
        end-date: EndDate;
        organization: Organization;
        url: Url2;
        external-ids: ExternalIds2;
        display-index: string;
        visibility: string;
        path: string;
    }

    export interface AffiliationGroup {
        last-modified-date: LastModifiedDate19;
        external-ids: ExternalIds;
        summaries: Summary[];
    }

    export interface Distinctions {
        last-modified-date: LastModifiedDate18;
        affiliation-group: AffiliationGroup[];
        path: string;
    }

    export interface LastModifiedDate21 {
        value: Date;
    }

    export interface LastModifiedDate22 {
        value: Date;
    }

    export interface ExternalIdNormalized3 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError3 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl4 {
        value: string;
    }

    export interface ExternalId3 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized3;
        external-id-normalized-error: ExternalIdNormalizedError3;
        external-id-url: ExternalIdUrl4;
        external-id-relationship: string;
    }

    export interface ExternalIds3 {
        external-id: ExternalId3[];
    }

    export interface CreatedDate10 {
        value: Date;
    }

    export interface LastModifiedDate23 {
        value: Date;
    }

    export interface SourceOrcid10 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId10 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName10 {
        value: string;
    }

    export interface AssertionOriginOrcid10 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId10 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName10 {
        value: string;
    }

    export interface Source10 {
        source-orcid: SourceOrcid10;
        source-client-id: SourceClientId10;
        source-name: SourceName10;
        assertion-origin-orcid: AssertionOriginOrcid10;
        assertion-origin-client-id: AssertionOriginClientId10;
        assertion-origin-name: AssertionOriginName10;
    }

    export interface Year3 {
        value: string;
    }

    export interface Month3 {
        value: string;
    }

    export interface Day3 {
        value: string;
    }

    export interface StartDate2 {
        year: Year3;
        month: Month3;
        day: Day3;
    }

    export interface Year4 {
        value: string;
    }

    export interface Month4 {
        value: string;
    }

    export interface Day4 {
        value: string;
    }

    export interface EndDate2 {
        year: Year4;
        month: Month4;
        day: Day4;
    }

    export interface Address3 {
        city: string;
        region: string;
        country: string;
    }

    export interface DisambiguatedOrganization2 {
        disambiguated-organization-identifier: string;
        disambiguation-source: string;
    }

    export interface Organization2 {
        name: string;
        address: Address3;
        disambiguated-organization: DisambiguatedOrganization2;
    }

    export interface Url3 {
        value: string;
    }

    export interface ExternalIdNormalized4 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError4 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl5 {
        value: string;
    }

    export interface ExternalId4 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized4;
        external-id-normalized-error: ExternalIdNormalizedError4;
        external-id-url: ExternalIdUrl5;
        external-id-relationship: string;
    }

    export interface ExternalIds4 {
        external-id: ExternalId4[];
    }

    export interface Summary2 {
        created-date: CreatedDate10;
        last-modified-date: LastModifiedDate23;
        source: Source10;
        put-code: number;
        department-name: string;
        role-title: string;
        start-date: StartDate2;
        end-date: EndDate2;
        organization: Organization2;
        url: Url3;
        external-ids: ExternalIds4;
        display-index: string;
        visibility: string;
        path: string;
    }

    export interface AffiliationGroup2 {
        last-modified-date: LastModifiedDate22;
        external-ids: ExternalIds3;
        summaries: Summary2[];
    }

    export interface Educations {
        last-modified-date: LastModifiedDate21;
        affiliation-group: AffiliationGroup2[];
        path: string;
    }

    export interface LastModifiedDate24 {
        value: Date;
    }

    export interface LastModifiedDate25 {
        value: Date;
    }

    export interface ExternalIdNormalized5 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError5 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl6 {
        value: string;
    }

    export interface ExternalId5 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized5;
        external-id-normalized-error: ExternalIdNormalizedError5;
        external-id-url: ExternalIdUrl6;
        external-id-relationship: string;
    }

    export interface ExternalIds5 {
        external-id: ExternalId5[];
    }

    export interface CreatedDate11 {
        value: Date;
    }

    export interface LastModifiedDate26 {
        value: Date;
    }

    export interface SourceOrcid11 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId11 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName11 {
        value: string;
    }

    export interface AssertionOriginOrcid11 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId11 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName11 {
        value: string;
    }

    export interface Source11 {
        source-orcid: SourceOrcid11;
        source-client-id: SourceClientId11;
        source-name: SourceName11;
        assertion-origin-orcid: AssertionOriginOrcid11;
        assertion-origin-client-id: AssertionOriginClientId11;
        assertion-origin-name: AssertionOriginName11;
    }

    export interface Year5 {
        value: string;
    }

    export interface Month5 {
        value: string;
    }

    export interface Day5 {
        value: string;
    }

    export interface StartDate3 {
        year: Year5;
        month: Month5;
        day: Day5;
    }

    export interface Year6 {
        value: string;
    }

    export interface Month6 {
        value: string;
    }

    export interface Day6 {
        value: string;
    }

    export interface EndDate3 {
        year: Year6;
        month: Month6;
        day: Day6;
    }

    export interface Address4 {
        city: string;
        region: string;
        country: string;
    }

    export interface DisambiguatedOrganization3 {
        disambiguated-organization-identifier: string;
        disambiguation-source: string;
    }

    export interface Organization3 {
        name: string;
        address: Address4;
        disambiguated-organization: DisambiguatedOrganization3;
    }

    export interface Url4 {
        value: string;
    }

    export interface ExternalIdNormalized6 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError6 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl7 {
        value: string;
    }

    export interface ExternalId6 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized6;
        external-id-normalized-error: ExternalIdNormalizedError6;
        external-id-url: ExternalIdUrl7;
        external-id-relationship: string;
    }

    export interface ExternalIds6 {
        external-id: ExternalId6[];
    }

    export interface Summary3 {
        created-date: CreatedDate11;
        last-modified-date: LastModifiedDate26;
        source: Source11;
        put-code: number;
        department-name: string;
        role-title: string;
        start-date: StartDate3;
        end-date: EndDate3;
        organization: Organization3;
        url: Url4;
        external-ids: ExternalIds6;
        display-index: string;
        visibility: string;
        path: string;
    }

    export interface AffiliationGroup3 {
        last-modified-date: LastModifiedDate25;
        external-ids: ExternalIds5;
        summaries: Summary3[];
    }

    export interface Employments {
        last-modified-date: LastModifiedDate24;
        affiliation-group: AffiliationGroup3[];
        path: string;
    }

    export interface LastModifiedDate27 {
        value: Date;
    }

    export interface LastModifiedDate28 {
        value: Date;
    }

    export interface ExternalIdNormalized7 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError7 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl8 {
        value: string;
    }

    export interface ExternalId7 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized7;
        external-id-normalized-error: ExternalIdNormalizedError7;
        external-id-url: ExternalIdUrl8;
        external-id-relationship: string;
    }

    export interface ExternalIds7 {
        external-id: ExternalId7[];
    }

    export interface CreatedDate12 {
        value: Date;
    }

    export interface LastModifiedDate29 {
        value: Date;
    }

    export interface SourceOrcid12 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId12 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName12 {
        value: string;
    }

    export interface AssertionOriginOrcid12 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId12 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName12 {
        value: string;
    }

    export interface Source12 {
        source-orcid: SourceOrcid12;
        source-client-id: SourceClientId12;
        source-name: SourceName12;
        assertion-origin-orcid: AssertionOriginOrcid12;
        assertion-origin-client-id: AssertionOriginClientId12;
        assertion-origin-name: AssertionOriginName12;
    }

    export interface Title2 {
        value: string;
    }

    export interface TranslatedTitle {
        value: string;
        language-code: string;
    }

    export interface Title {
        title: Title2;
        translated-title: TranslatedTitle;
    }

    export interface ExternalIdNormalized8 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError8 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl9 {
        value: string;
    }

    export interface ExternalId8 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized8;
        external-id-normalized-error: ExternalIdNormalizedError8;
        external-id-url: ExternalIdUrl9;
        external-id-relationship: string;
    }

    export interface ExternalIds8 {
        external-id: ExternalId8[];
    }

    export interface Url5 {
        value: string;
    }

    export interface Year7 {
        value: string;
    }

    export interface Month7 {
        value: string;
    }

    export interface Day7 {
        value: string;
    }

    export interface StartDate4 {
        year: Year7;
        month: Month7;
        day: Day7;
    }

    export interface Year8 {
        value: string;
    }

    export interface Month8 {
        value: string;
    }

    export interface Day8 {
        value: string;
    }

    export interface EndDate4 {
        year: Year8;
        month: Month8;
        day: Day8;
    }

    export interface Address5 {
        city: string;
        region: string;
        country: string;
    }

    export interface DisambiguatedOrganization4 {
        disambiguated-organization-identifier: string;
        disambiguation-source: string;
    }

    export interface Organization4 {
        name: string;
        address: Address5;
        disambiguated-organization: DisambiguatedOrganization4;
    }

    export interface FundingSummary {
        created-date: CreatedDate12;
        last-modified-date: LastModifiedDate29;
        source: Source12;
        title: Title;
        external-ids: ExternalIds8;
        url: Url5;
        type: string;
        start-date: StartDate4;
        end-date: EndDate4;
        organization: Organization4;
        visibility: string;
        put-code: number;
        path: string;
        display-index: string;
    }

    export interface Group {
        last-modified-date: LastModifiedDate28;
        external-ids: ExternalIds7;
        funding-summary: FundingSummary[];
    }

    export interface Fundings {
        last-modified-date: LastModifiedDate27;
        group: Group[];
        path: string;
    }

    export interface LastModifiedDate30 {
        value: Date;
    }

    export interface LastModifiedDate31 {
        value: Date;
    }

    export interface ExternalIdNormalized9 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError9 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl10 {
        value: string;
    }

    export interface ExternalId9 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized9;
        external-id-normalized-error: ExternalIdNormalizedError9;
        external-id-url: ExternalIdUrl10;
        external-id-relationship: string;
    }

    export interface ExternalIds9 {
        external-id: ExternalId9[];
    }

    export interface CreatedDate13 {
        value: Date;
    }

    export interface LastModifiedDate32 {
        value: Date;
    }

    export interface SourceOrcid13 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId13 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName13 {
        value: string;
    }

    export interface AssertionOriginOrcid13 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId13 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName13 {
        value: string;
    }

    export interface Source13 {
        source-orcid: SourceOrcid13;
        source-client-id: SourceClientId13;
        source-name: SourceName13;
        assertion-origin-orcid: AssertionOriginOrcid13;
        assertion-origin-client-id: AssertionOriginClientId13;
        assertion-origin-name: AssertionOriginName13;
    }

    export interface Year9 {
        value: string;
    }

    export interface Month9 {
        value: string;
    }

    export interface Day9 {
        value: string;
    }

    export interface StartDate5 {
        year: Year9;
        month: Month9;
        day: Day9;
    }

    export interface Year10 {
        value: string;
    }

    export interface Month10 {
        value: string;
    }

    export interface Day10 {
        value: string;
    }

    export interface EndDate5 {
        year: Year10;
        month: Month10;
        day: Day10;
    }

    export interface Address6 {
        city: string;
        region: string;
        country: string;
    }

    export interface DisambiguatedOrganization5 {
        disambiguated-organization-identifier: string;
        disambiguation-source: string;
    }

    export interface Organization5 {
        name: string;
        address: Address6;
        disambiguated-organization: DisambiguatedOrganization5;
    }

    export interface Url6 {
        value: string;
    }

    export interface ExternalIdNormalized10 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError10 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl11 {
        value: string;
    }

    export interface ExternalId10 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized10;
        external-id-normalized-error: ExternalIdNormalizedError10;
        external-id-url: ExternalIdUrl11;
        external-id-relationship: string;
    }

    export interface ExternalIds10 {
        external-id: ExternalId10[];
    }

    export interface Summary4 {
        created-date: CreatedDate13;
        last-modified-date: LastModifiedDate32;
        source: Source13;
        put-code: number;
        department-name: string;
        role-title: string;
        start-date: StartDate5;
        end-date: EndDate5;
        organization: Organization5;
        url: Url6;
        external-ids: ExternalIds10;
        display-index: string;
        visibility: string;
        path: string;
    }

    export interface AffiliationGroup4 {
        last-modified-date: LastModifiedDate31;
        external-ids: ExternalIds9;
        summaries: Summary4[];
    }

    export interface InvitedPositions {
        last-modified-date: LastModifiedDate30;
        affiliation-group: AffiliationGroup4[];
        path: string;
    }

    export interface LastModifiedDate33 {
        value: Date;
    }

    export interface LastModifiedDate34 {
        value: Date;
    }

    export interface ExternalIdNormalized11 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError11 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl12 {
        value: string;
    }

    export interface ExternalId11 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized11;
        external-id-normalized-error: ExternalIdNormalizedError11;
        external-id-url: ExternalIdUrl12;
        external-id-relationship: string;
    }

    export interface ExternalIds11 {
        external-id: ExternalId11[];
    }

    export interface CreatedDate14 {
        value: Date;
    }

    export interface LastModifiedDate35 {
        value: Date;
    }

    export interface SourceOrcid14 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId14 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName14 {
        value: string;
    }

    export interface AssertionOriginOrcid14 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId14 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName14 {
        value: string;
    }

    export interface Source14 {
        source-orcid: SourceOrcid14;
        source-client-id: SourceClientId14;
        source-name: SourceName14;
        assertion-origin-orcid: AssertionOriginOrcid14;
        assertion-origin-client-id: AssertionOriginClientId14;
        assertion-origin-name: AssertionOriginName14;
    }

    export interface Year11 {
        value: string;
    }

    export interface Month11 {
        value: string;
    }

    export interface Day11 {
        value: string;
    }

    export interface StartDate6 {
        year: Year11;
        month: Month11;
        day: Day11;
    }

    export interface Year12 {
        value: string;
    }

    export interface Month12 {
        value: string;
    }

    export interface Day12 {
        value: string;
    }

    export interface EndDate6 {
        year: Year12;
        month: Month12;
        day: Day12;
    }

    export interface Address7 {
        city: string;
        region: string;
        country: string;
    }

    export interface DisambiguatedOrganization6 {
        disambiguated-organization-identifier: string;
        disambiguation-source: string;
    }

    export interface Organization6 {
        name: string;
        address: Address7;
        disambiguated-organization: DisambiguatedOrganization6;
    }

    export interface Url7 {
        value: string;
    }

    export interface ExternalIdNormalized12 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError12 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl13 {
        value: string;
    }

    export interface ExternalId12 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized12;
        external-id-normalized-error: ExternalIdNormalizedError12;
        external-id-url: ExternalIdUrl13;
        external-id-relationship: string;
    }

    export interface ExternalIds12 {
        external-id: ExternalId12[];
    }

    export interface Summary5 {
        created-date: CreatedDate14;
        last-modified-date: LastModifiedDate35;
        source: Source14;
        put-code: number;
        department-name: string;
        role-title: string;
        start-date: StartDate6;
        end-date: EndDate6;
        organization: Organization6;
        url: Url7;
        external-ids: ExternalIds12;
        display-index: string;
        visibility: string;
        path: string;
    }

    export interface AffiliationGroup5 {
        last-modified-date: LastModifiedDate34;
        external-ids: ExternalIds11;
        summaries: Summary5[];
    }

    export interface Memberships {
        last-modified-date: LastModifiedDate33;
        affiliation-group: AffiliationGroup5[];
        path: string;
    }

    export interface LastModifiedDate36 {
        value: Date;
    }

    export interface LastModifiedDate37 {
        value: Date;
    }

    export interface ExternalIdNormalized13 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError13 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl14 {
        value: string;
    }

    export interface ExternalId13 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized13;
        external-id-normalized-error: ExternalIdNormalizedError13;
        external-id-url: ExternalIdUrl14;
        external-id-relationship: string;
    }

    export interface ExternalIds13 {
        external-id: ExternalId13[];
    }

    export interface LastModifiedDate38 {
        value: Date;
    }

    export interface ExternalIdNormalized14 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError14 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl15 {
        value: string;
    }

    export interface ExternalId14 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized14;
        external-id-normalized-error: ExternalIdNormalizedError14;
        external-id-url: ExternalIdUrl15;
        external-id-relationship: string;
    }

    export interface ExternalIds14 {
        external-id: ExternalId14[];
    }

    export interface CreatedDate15 {
        value: Date;
    }

    export interface LastModifiedDate39 {
        value: Date;
    }

    export interface SourceOrcid15 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId15 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName15 {
        value: string;
    }

    export interface AssertionOriginOrcid15 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId15 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName15 {
        value: string;
    }

    export interface Source15 {
        source-orcid: SourceOrcid15;
        source-client-id: SourceClientId15;
        source-name: SourceName15;
        assertion-origin-orcid: AssertionOriginOrcid15;
        assertion-origin-client-id: AssertionOriginClientId15;
        assertion-origin-name: AssertionOriginName15;
    }

    export interface ExternalIdNormalized15 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError15 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl16 {
        value: string;
    }

    export interface ExternalId15 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized15;
        external-id-normalized-error: ExternalIdNormalizedError15;
        external-id-url: ExternalIdUrl16;
        external-id-relationship: string;
    }

    export interface ExternalIds15 {
        external-id: ExternalId15[];
    }

    export interface ReviewUrl {
        value: string;
    }

    export interface Year13 {
        value: string;
    }

    export interface Month13 {
        value: string;
    }

    export interface Day13 {
        value: string;
    }

    export interface CompletionDate2 {
        year: Year13;
        month: Month13;
        day: Day13;
    }

    export interface Address8 {
        city: string;
        region: string;
        country: string;
    }

    export interface DisambiguatedOrganization7 {
        disambiguated-organization-identifier: string;
        disambiguation-source: string;
    }

    export interface ConveningOrganization {
        name: string;
        address: Address8;
        disambiguated-organization: DisambiguatedOrganization7;
    }

    export interface PeerReviewSummary {
        created-date: CreatedDate15;
        last-modified-date: LastModifiedDate39;
        source: Source15;
        reviewer-role: string;
        external-ids: ExternalIds15;
        review-url: ReviewUrl;
        review-type: string;
        completion-date: CompletionDate2;
        review-group-id: string;
        convening-organization: ConveningOrganization;
        visibility: string;
        put-code: number;
        path: string;
        display-index: string;
    }

    export interface PeerReviewGroup {
        last-modified-date: LastModifiedDate38;
        external-ids: ExternalIds14;
        peer-review-summary: PeerReviewSummary[];
    }

    export interface Group2 {
        last-modified-date: LastModifiedDate37;
        external-ids: ExternalIds13;
        peer-review-group: PeerReviewGroup[];
    }

    export interface PeerReviews {
        last-modified-date: LastModifiedDate36;
        group: Group2[];
        path: string;
    }

    export interface LastModifiedDate40 {
        value: Date;
    }

    export interface LastModifiedDate41 {
        value: Date;
    }

    export interface ExternalIdNormalized16 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError16 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl17 {
        value: string;
    }

    export interface ExternalId16 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized16;
        external-id-normalized-error: ExternalIdNormalizedError16;
        external-id-url: ExternalIdUrl17;
        external-id-relationship: string;
    }

    export interface ExternalIds16 {
        external-id: ExternalId16[];
    }

    export interface CreatedDate16 {
        value: Date;
    }

    export interface LastModifiedDate42 {
        value: Date;
    }

    export interface SourceOrcid16 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId16 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName16 {
        value: string;
    }

    export interface AssertionOriginOrcid16 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId16 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName16 {
        value: string;
    }

    export interface Source16 {
        source-orcid: SourceOrcid16;
        source-client-id: SourceClientId16;
        source-name: SourceName16;
        assertion-origin-orcid: AssertionOriginOrcid16;
        assertion-origin-client-id: AssertionOriginClientId16;
        assertion-origin-name: AssertionOriginName16;
    }

    export interface Year14 {
        value: string;
    }

    export interface Month14 {
        value: string;
    }

    export interface Day14 {
        value: string;
    }

    export interface StartDate7 {
        year: Year14;
        month: Month14;
        day: Day14;
    }

    export interface Year15 {
        value: string;
    }

    export interface Month15 {
        value: string;
    }

    export interface Day15 {
        value: string;
    }

    export interface EndDate7 {
        year: Year15;
        month: Month15;
        day: Day15;
    }

    export interface Address9 {
        city: string;
        region: string;
        country: string;
    }

    export interface DisambiguatedOrganization8 {
        disambiguated-organization-identifier: string;
        disambiguation-source: string;
    }

    export interface Organization7 {
        name: string;
        address: Address9;
        disambiguated-organization: DisambiguatedOrganization8;
    }

    export interface Url8 {
        value: string;
    }

    export interface ExternalIdNormalized17 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError17 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl18 {
        value: string;
    }

    export interface ExternalId17 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized17;
        external-id-normalized-error: ExternalIdNormalizedError17;
        external-id-url: ExternalIdUrl18;
        external-id-relationship: string;
    }

    export interface ExternalIds17 {
        external-id: ExternalId17[];
    }

    export interface Summary6 {
        created-date: CreatedDate16;
        last-modified-date: LastModifiedDate42;
        source: Source16;
        put-code: number;
        department-name: string;
        role-title: string;
        start-date: StartDate7;
        end-date: EndDate7;
        organization: Organization7;
        url: Url8;
        external-ids: ExternalIds17;
        display-index: string;
        visibility: string;
        path: string;
    }

    export interface AffiliationGroup6 {
        last-modified-date: LastModifiedDate41;
        external-ids: ExternalIds16;
        summaries: Summary6[];
    }

    export interface Qualifications {
        last-modified-date: LastModifiedDate40;
        affiliation-group: AffiliationGroup6[];
        path: string;
    }

    export interface LastModifiedDate43 {
        value: Date;
    }

    export interface LastModifiedDate44 {
        value: Date;
    }

    export interface ExternalIdNormalized18 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError18 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl19 {
        value: string;
    }

    export interface ExternalId18 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized18;
        external-id-normalized-error: ExternalIdNormalizedError18;
        external-id-url: ExternalIdUrl19;
        external-id-relationship: string;
    }

    export interface ExternalIds18 {
        external-id: ExternalId18[];
    }

    export interface CreatedDate17 {
        value: Date;
    }

    export interface LastModifiedDate45 {
        value: Date;
    }

    export interface SourceOrcid17 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId17 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName17 {
        value: string;
    }

    export interface AssertionOriginOrcid17 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId17 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName17 {
        value: string;
    }

    export interface Source17 {
        source-orcid: SourceOrcid17;
        source-client-id: SourceClientId17;
        source-name: SourceName17;
        assertion-origin-orcid: AssertionOriginOrcid17;
        assertion-origin-client-id: AssertionOriginClientId17;
        assertion-origin-name: AssertionOriginName17;
    }

    export interface Title4 {
        value: string;
    }

    export interface TranslatedTitle2 {
        value: string;
        language-code: string;
    }

    export interface Title3 {
        title: Title4;
        translated-title: TranslatedTitle2;
    }

    export interface Address10 {
        city: string;
        region: string;
        country: string;
    }

    export interface DisambiguatedOrganization9 {
        disambiguated-organization-identifier: string;
        disambiguation-source: string;
    }

    export interface Organization8 {
        name: string;
        address: Address10;
        disambiguated-organization: DisambiguatedOrganization9;
    }

    export interface Hosts {
        organization: Organization8[];
    }

    export interface ExternalIdNormalized19 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError19 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl20 {
        value: string;
    }

    export interface ExternalId19 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized19;
        external-id-normalized-error: ExternalIdNormalizedError19;
        external-id-url: ExternalIdUrl20;
        external-id-relationship: string;
    }

    export interface ExternalIds19 {
        external-id: ExternalId19[];
    }

    export interface Year16 {
        value: string;
    }

    export interface Month16 {
        value: string;
    }

    export interface Day16 {
        value: string;
    }

    export interface StartDate8 {
        year: Year16;
        month: Month16;
        day: Day16;
    }

    export interface Year17 {
        value: string;
    }

    export interface Month17 {
        value: string;
    }

    export interface Day17 {
        value: string;
    }

    export interface EndDate8 {
        year: Year17;
        month: Month17;
        day: Day17;
    }

    export interface Url9 {
        value: string;
    }

    export interface Proposal {
        title: Title3;
        hosts: Hosts;
        external-ids: ExternalIds19;
        start-date: StartDate8;
        end-date: EndDate8;
        url: Url9;
    }

    export interface ResearchResourceSummary {
        created-date: CreatedDate17;
        last-modified-date: LastModifiedDate45;
        source: Source17;
        proposal: Proposal;
        visibility: string;
        put-code: number;
        path: string;
        display-index: string;
    }

    export interface Group3 {
        last-modified-date: LastModifiedDate44;
        external-ids: ExternalIds18;
        research-resource-summary: ResearchResourceSummary[];
    }

    export interface ResearchResources {
        last-modified-date: LastModifiedDate43;
        group: Group3[];
        path: string;
    }

    export interface LastModifiedDate46 {
        value: Date;
    }

    export interface LastModifiedDate47 {
        value: Date;
    }

    export interface ExternalIdNormalized20 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError20 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl21 {
        value: string;
    }

    export interface ExternalId20 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized20;
        external-id-normalized-error: ExternalIdNormalizedError20;
        external-id-url: ExternalIdUrl21;
        external-id-relationship: string;
    }

    export interface ExternalIds20 {
        external-id: ExternalId20[];
    }

    export interface CreatedDate18 {
        value: Date;
    }

    export interface LastModifiedDate48 {
        value: Date;
    }

    export interface SourceOrcid18 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId18 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName18 {
        value: string;
    }

    export interface AssertionOriginOrcid18 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId18 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName18 {
        value: string;
    }

    export interface Source18 {
        source-orcid: SourceOrcid18;
        source-client-id: SourceClientId18;
        source-name: SourceName18;
        assertion-origin-orcid: AssertionOriginOrcid18;
        assertion-origin-client-id: AssertionOriginClientId18;
        assertion-origin-name: AssertionOriginName18;
    }

    export interface Year18 {
        value: string;
    }

    export interface Month18 {
        value: string;
    }

    export interface Day18 {
        value: string;
    }

    export interface StartDate9 {
        year: Year18;
        month: Month18;
        day: Day18;
    }

    export interface Year19 {
        value: string;
    }

    export interface Month19 {
        value: string;
    }

    export interface Day19 {
        value: string;
    }

    export interface EndDate9 {
        year: Year19;
        month: Month19;
        day: Day19;
    }

    export interface Address11 {
        city: string;
        region: string;
        country: string;
    }

    export interface DisambiguatedOrganization10 {
        disambiguated-organization-identifier: string;
        disambiguation-source: string;
    }

    export interface Organization9 {
        name: string;
        address: Address11;
        disambiguated-organization: DisambiguatedOrganization10;
    }

    export interface Url10 {
        value: string;
    }

    export interface ExternalIdNormalized21 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError21 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl22 {
        value: string;
    }

    export interface ExternalId21 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized21;
        external-id-normalized-error: ExternalIdNormalizedError21;
        external-id-url: ExternalIdUrl22;
        external-id-relationship: string;
    }

    export interface ExternalIds21 {
        external-id: ExternalId21[];
    }

    export interface Summary7 {
        created-date: CreatedDate18;
        last-modified-date: LastModifiedDate48;
        source: Source18;
        put-code: number;
        department-name: string;
        role-title: string;
        start-date: StartDate9;
        end-date: EndDate9;
        organization: Organization9;
        url: Url10;
        external-ids: ExternalIds21;
        display-index: string;
        visibility: string;
        path: string;
    }

    export interface AffiliationGroup7 {
        last-modified-date: LastModifiedDate47;
        external-ids: ExternalIds20;
        summaries: Summary7[];
    }

    export interface Services {
        last-modified-date: LastModifiedDate46;
        affiliation-group: AffiliationGroup7[];
        path: string;
    }

    export interface LastModifiedDate49 {
        value: Date;
    }

    export interface LastModifiedDate50 {
        value: Date;
    }

    export interface ExternalIdNormalized22 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError22 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl23 {
        value: string;
    }

    export interface ExternalId22 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized22;
        external-id-normalized-error: ExternalIdNormalizedError22;
        external-id-url: ExternalIdUrl23;
        external-id-relationship: string;
    }

    export interface ExternalIds22 {
        external-id: ExternalId22[];
    }

    export interface CreatedDate19 {
        value: Date;
    }

    export interface LastModifiedDate51 {
        value: Date;
    }

    export interface SourceOrcid19 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceClientId19 {
        uri: string;
        path: string;
        host: string;
    }

    export interface SourceName19 {
        value: string;
    }

    export interface AssertionOriginOrcid19 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginClientId19 {
        uri: string;
        path: string;
        host: string;
    }

    export interface AssertionOriginName19 {
        value: string;
    }

    export interface Source19 {
        source-orcid: SourceOrcid19;
        source-client-id: SourceClientId19;
        source-name: SourceName19;
        assertion-origin-orcid: AssertionOriginOrcid19;
        assertion-origin-client-id: AssertionOriginClientId19;
        assertion-origin-name: AssertionOriginName19;
    }

    export interface Title6 {
        value: string;
    }

    export interface Subtitle {
        value: string;
    }

    export interface TranslatedTitle3 {
        value: string;
        language-code: string;
    }

    export interface Title5 {
        title: Title6;
        subtitle: Subtitle;
        translated-title: TranslatedTitle3;
    }

    export interface ExternalIdNormalized23 {
        value: string;
        transient: boolean;
    }

    export interface ExternalIdNormalizedError23 {
        error-code: string;
        error-message: string;
        transient: boolean;
    }

    export interface ExternalIdUrl24 {
        value: string;
    }

    export interface ExternalId23 {
        external-id-type: string;
        external-id-value: string;
        external-id-normalized: ExternalIdNormalized23;
        external-id-normalized-error: ExternalIdNormalizedError23;
        external-id-url: ExternalIdUrl24;
        external-id-relationship: string;
    }

    export interface ExternalIds23 {
        external-id: ExternalId23[];
    }

    export interface Url11 {
        value: string;
    }

    export interface Year20 {
        value: string;
    }

    export interface Month20 {
        value: string;
    }

    export interface Day20 {
        value: string;
    }

    export interface PublicationDate {
        year: Year20;
        month: Month20;
        day: Day20;
    }

    export interface JournalTitle {
        value: string;
    }

    export interface WorkSummary {
        put-code: number;
        created-date: CreatedDate19;
        last-modified-date: LastModifiedDate51;
        source: Source19;
        title: Title5;
        external-ids: ExternalIds23;
        url: Url11;
        type: string;
        publication-date: PublicationDate;
        journal-title: JournalTitle;
        visibility: string;
        path: string;
        display-index: string;
    }

    export interface Group4 {
        last-modified-date: LastModifiedDate50;
        external-ids: ExternalIds22;
        work-summary: WorkSummary[];
    }

    export interface Works {
        last-modified-date: LastModifiedDate49;
        group: Group4[];
        path: string;
    }

    export interface ActivitiesSummary {
        last-modified-date: LastModifiedDate17;
        distinctions: Distinctions;
        educations: Educations;
        employments: Employments;
        fundings: Fundings;
        invited-positions: InvitedPositions;
        memberships: Memberships;
        peer-reviews: PeerReviews;
        qualifications: Qualifications;
        research-resources: ResearchResources;
        services: Services;
        works: Works;
        path: string;
    }

    export interface RootObject {
        orcid-identifier: OrcidIdentifier;
        preferences: Preferences;
        history: History;
        person: OrcidPerson;
        activities-summary: ActivitiesSummary;
        path: string;
    }

}
