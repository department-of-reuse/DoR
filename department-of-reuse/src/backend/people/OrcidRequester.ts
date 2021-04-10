import Common from "../Common";
import APIResponse from "../APIResponse";
import APIError from "../APIError";
import { OrcidPerson } from "./OrcidResponse";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";


export default class OrcidRequester extends Common {
  protected static endpoint = "https://pub.orcid.org/v3.0/";
  protected static serviceIdentifier = "Orcid"

  constructor() {
    super(OrcidRequester.endpoint, OrcidRequester.serviceIdentifier);
  }

  async getPersonalDetails(orcid : String) : Promise<APIResponse<OrcidPerson>> {
    const requestParameter = { params: {} as any };
    const endpoint = orcid + "/personal-details";

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
                  returnValue: {} as OrcidPerson,
                  statusCode: error.response.status,
                  networkError: false,
                  error: error.response.data as APIError,
              };
          } else {
              return {
                  returnValue: {} as OrcidPerson,
                  statusCode: 0,
                  networkError: true,
                  error: {} as APIError,
              };
          }
      });
  }
}
