<template>
  <div>
    <h2 class="text-xl bg-opacity-80 bg-blue-200">Researchers</h2>

    <h3 class="text-l bg-opacity-40 bg-blue-200">Most reused (R+)</h3>
      <div v-if="isLoading">
        <p>Loading...</p>
      </div>
      <div v-else>
        <table class="m-1 table-auto text-xs w-full bg-opacity-40 bg-white">
          <tr v-for="(p, index) in researchers.reused" :key="index" :class="index % 2 ? 'bg-opacity-80 bg-white' : ''">
            <td class="text-left">{{p.entry.given}} {{p.entry.family}}</td>
            <td>{{p.frequency}}</td>
          </tr>
        </table>
      </div>
    <h3 class="text-l bg-opacity-40 bg-blue-200">Most reusing (R)</h3>
      <div v-if="isLoading">
        <p>Loading...</p>
      </div>
      <div v-else>    
        <table class="m-1 table-auto text-xs w-full bg-opacity-40 bg-white">
          <tr v-for="(p, index) in researchers.reusing" :key="index" :class="index % 2 ? 'bg-opacity-80 bg-white' : ''">
            <td class="text-left">{{p.entry.given}} {{p.entry.family}}</td>
            <td>{{p.frequency}}</td>
          </tr>
        </table>
      </div>
    <h2 class="text-xl bg-opacity-80 bg-blue-200 mt-5">Artifacts</h2>

    <h3 class="text-l bg-opacity-40 bg-blue-200">Most reused (R+)</h3>
      <div v-if="isLoading">
        <p>Loading...</p>
      </div>
      <div v-else>    
        <table class="m-1 table-auto text-xs bg-opacity-40 bg-white">
          <tr v-for="(p, index) in publications.reused" :key="index" :class="index % 2 ? 'bg-opacity-80 bg-white' : ''">
            <td class="text-left"><a :href="'https://doi.org/' + p.entry.dOI" target="_blank">{{p.entry.title[0]}}</a></td>
            <td>{{p.frequency}}</td>
          </tr>
        </table>
      </div>
    <h3 class="text-l bg-opacity-40 bg-blue-200">Most reusing (R)</h3>
      <div v-if="isLoading">
        <p>Loading...</p>
      </div>
      <div v-else>    
        <table class="m-1 table-auto text-xs bg-opacity-40 bg-white">
          <tr v-for="(p, index) in publications.reusing" :key="index" :class="index % 2 ? 'bg-opacity-80 bg-white' : ''">
            <td class="text-left"><a :href="'https://doi.org/' + p.entry.dOI" target="_blank">{{p.entry.title[0]}}</a></td>
            <td>{{p.frequency}}</td>
          </tr>
          </table>
      </div>
  </div>
</template>
<script lang="ts">
import { ref, onBeforeMount, PropType } from "vue";

import Reuse from '../backend/models/Reuse';

import RIndex from '../backend/RIndex';
import { HistogramEntry } from '../tools/Histogram';
import { Author, Work } from '../clients/crossref';

interface HistogramContainer<T> {
  reused : Array<HistogramEntry<T>>,
  reusing : Array<HistogramEntry<T>>
}

export default {
  props: {
    reuseData: Array as PropType<Array<Reuse>>,
  },
  setup(props : any) {
    const isLoading = ref(false);
    const researchers = ref({} as HistogramContainer<Author>);
    const publications = ref({} as HistogramContainer<Work>);
    
    onBeforeMount(async () => {
      isLoading.value = true;
      const indexer = new RIndex(props.reuseData);
      
      researchers.value = { 
        reused: (await indexer.computeAuthorsReused()).slice(0,5),
        reusing: (await indexer.computeAuthorsReusing()).slice(0,5)
        };

      publications.value = { 
        reused: (await indexer.computeWorksReused()).slice(0,5),
        reusing: (await indexer.computeWorksReusing()).slice(0,5)
        };

      isLoading.value = false;
    });

    return { isLoading, researchers, publications };
  }
}
</script>
