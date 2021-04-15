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
  METHODOLOGY = "Methodology",
  DATASET = "Dataset",
  TOOL = "Tool",
  STATISTICS = "Statistics",
  PROTOCOL = "Protocol",
  METRIC = "Metric",
  SANITYCHECK = "Sanity check"
}
