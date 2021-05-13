export default interface Reuse {
  sourceDOI: string,
  type : ReuseType,
  comment: string,
  sourceReference: string,
  reusedDOI: string,
  alternativeID: string,
  sourceReferenceDetail: string
}

export enum ReuseType {
  UNKNOWN = "Unknown",
  METHODOLOGY = "Methodology",
  DATASET = "Dataset",
  TOOL = "Tool",
  STATISTICS = "Statistics",
  PROTOCOL = "Protocol",
  METRIC = "Metric",
  SANITYCHECK = "Sanity check"
}

export function ReuseFromJson(json: any): Reuse {
  if ((json === undefined) || (json === null)) {
    return json;
  }
  return {
    "sourceDOI": json['sourceDOI'],
    "type" : json['type'],
    "comment": json['comment'],
    "sourceReference": json['sourceReference'],
    "reusedDOI": json['reusedDOI'],
    "alternativeID": json['alternativeID'],
    "sourceReferenceDetail": json['sourceReferenceDetail']
  };
}
