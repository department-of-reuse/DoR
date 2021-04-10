export interface CRResponse {
  status: string;
  message: Message;
}

export interface Message {
  DOI: string,
  URL: string,
  title: string[]
}
