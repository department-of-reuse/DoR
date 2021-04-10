import Person from "../Person";
import { OrcidPerson } from "./OrcidResponse";
import OrcidRequester from "@/backend/people/OrcidRequester";
export default class PeopleCache {

  constructor() {}

  async getPerson(orcid : String) : Promise<Person> {
    const personRequester = new OrcidRequester();

/*
    if (cacheResult) {
      console.debug("Cache hit.")
      return cacheResult;
    }*/

    //console.debug("Cache miss.")
    return await personRequester
      .getPersonalDetails(orcid)
      .then((result) => {
        // TODO: The cast to any here is pretty ugly. However, the current definition either won't typecheck or won't bind to the REST response.
        const orcidPerson : any = result.returnValue;
        return { givenName : orcidPerson.name["given-names"].value, familyName : orcidPerson.name["family-name"].value } as Person;
      })
  }
}
