<template>
  <div>
  <h2 class="text-xl bg-opacity-80 bg-blue-200">Researchers</h2>

  <h3 class="text-l bg-opacity-40 bg-blue-200">Most reused</h3>
  <!--
  <table class="m-1 table-auto text-xs w-full">
    <tr v-for="(r, index) in researchers.reused" :key="r.ORCID" :class="index % 2 ? 'bg-opacity-20 bg-white' : ''">
      <td><a :href="r.ORCID" target="_blank">{{r.given}} {{r.family}}</a></td>
    </tr>
  </table>
-->

  <h3 class="text-l bg-opacity-40 bg-blue-200">Most reusing</h3>
  <!--
  <table class="m-1 table-auto text-xs w-full">
    <tr v-for="(r, index) in researchers.reusing" :key="r.ORCID" :class="index % 2 ? 'bg-opacity-20 bg-white' : ''">
      <td><a :href="r.ORCID" target="_blank">{{r.given}} {{r.family}}</a></td>
    </tr>
  </table>
-->

  <h2 class="text-xl bg-opacity-80 bg-blue-200">Artifacts</h2>

  <h3 class="text-l bg-opacity-40 bg-blue-200">Most reused</h3>
  <!--
  <table class="m-1 table-auto text-xs w-full">
    <tr v-for="(p, index) in publications.reused" :key="p.title" :class="index % 2 ? 'bg-opacity-20 bg-white' : ''">
      <td><a :href="p.url" target="_blank">{{p.title}}</a></td>
    </tr>
  </table>
-->

  <h3 class="text-l bg-opacity-40 bg-blue-200">Most reusing</h3>
  <!--
  <table class="m-1 table-auto text-xs w-full">
    <tr v-for="(p, index) in publications.reusing" :key="p.title" :class="index % 2 ? 'bg-opacity-20 bg-white' : ''">
      <td><a :href="p.url" target="_blank">{{p.title}}</a></td>
    </tr>
  </table>
-->
  </div>
</template>
<script lang="ts">
import { ref, onBeforeMount } from "vue";
import { Configuration, PublicAPIV20Api } from '@/clients/orcid';
//import { WorksApi } from '@/clients/crossref';
import { CachedWorksApi } from '@/tools/CachedWorksApi';
import { QueryApi } from '@/clients/arxiv';
//import OrcidRequester from "@/backend/people/OrcidRequester";
//import { OrcidPerson } from "@/backend/models/OrcidResponse";
const orcid : string = "0000-0001-9848-2017";
//const doi = "10.1145/3368089.3409767"


export default {
  setup() {
    const person = ref(null);

    onBeforeMount(() => {

      const orcidApi = new PublicAPIV20Api(new Configuration({ headers: {'Accept': 'application/json'}}));

      orcidApi.viewPersonalDetails({"orcid": orcid})
      .then(result => {
        console.debug(result.name);
      });

      const crWorksApi = new CachedWorksApi();

      crWorksApi.worksDoiGet({"doi": "10.1109/TPDS.2020.3014173"})
        .then(result => {
          console.debug(result);
        });

      crWorksApi.worksDoiGet({"doi": "10.1145/3243176.3243199"})
        .then(result => {
          console.debug(result);
        });

      crWorksApi.worksDoiGet({"doi": "10.1145/3368089.3409697"})
        .then(result => {
          console.debug(result);
        });

      crWorksApi.worksDoiGet({"doi": "10.1145/3394451.3397204"})
        .then(result => {
          console.debug(result);
        });
      
      const arxivApi = new QueryApi();
      arxivApi.queryById({"id" : "2103.12221"})
        .then(result => {
          console.debug(result);
        });

      /*const oReq = new OrcidRequester();
      oReq
        .getPersonalDetails(orcid)
        .then(result => {
          person.value = result.returnValue;
          console.debug(result.returnValue.lastModifiedDate);
        });

      */

        /*
      const paperReq = new CrossrefRequester();
      paperReq.getPaper(doi)
        .then(result => {
          let crPaper = result.returnValue.message;
          paper.value =  { doi: crPaper.DOI, title: crPaper.title[0]} as Paper;
        });

      isLoading.value = false;
      */
    });

    return { person };
  }
}
</script>
