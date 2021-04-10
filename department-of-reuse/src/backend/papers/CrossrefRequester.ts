import Common from "../Common";
import APIResponse from "../APIResponse";
import APIError from "../APIError";
import { CRResponse } from "./CrossrefResponse";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";


export default class CrossrefRequester extends Common {
  protected static endpoint = "https://api.crossref.org/works/";
  protected static serviceIdentifier = "CrossRef"

  constructor() {
    super(CrossrefRequester.endpoint, CrossrefRequester.serviceIdentifier);
  }

  async getPaper(doi : String) : Promise<APIResponse<CRResponse>> {
    const requestParameter = { params: {} as any };
    const endpoint = doi + "";

    return await this._axios
      .get(endpoint, requestParameter)
      .then((response: AxiosResponse) => {
          return {
              returnValue: response.data,
              statusCode: response.status,
              networkError: false,
              error: {} as APIError,
          };
      })
      .catch(async (error: AxiosError) => {
          if (error.response) {
              return {
                  returnValue: {} as CRResponse,
                  statusCode: error.response.status,
                  networkError: false,
                  error: error.response.data as APIError,
              };
          } else {
              return {
                  returnValue: {} as CRResponse,
                  statusCode: 0,
                  networkError: true,
                  error: {} as APIError,
              };
          }
      });
  }
}
