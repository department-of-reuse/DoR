import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export default class Common {
  protected static endpoint = "";
  protected serviceIdentifier = "";

  _axios: AxiosInstance;

  constructor(endpoint: string, serviceIdentifier: string) {
      const instance = axios.create({
          baseURL: endpoint,
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json;charset=UTF-8",
          },
          withCredentials: false,
      });

      this._axios = instance;
      this.serviceIdentifier = serviceIdentifier;
  }
}
