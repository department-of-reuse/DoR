<style lang="scss">
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>
<template>
  <div>
    <h1 class="text-xl bg-opacity-80 bg-blue-200">Collected Reuse Statistics</h1>
    <div v-if="isLoading">
      <p>Loading data ...</p>
    </div>
    <div v-else class="">
        <p>Lorem ipsum</p>
        <p>Lorem ipsum2</p>
        <ag-grid-vue
            style="width: 1000px; height: 500px"
            class="ag-theme-alpine"
            :columnDefs="columns"
            :rowData="rowData"
          >
        </ag-grid-vue>
    </div>
  </div>
</template>
<script lang="ts">
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { defineComponent, onBeforeMount, ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";

import { HistogramEntry } from '../tools/Histogram';
import { Author } from '../clients/crossref';

import reuseJson from '../assets/data/reuse.json';
import { ReuseFromJson } from '../backend/models/Reuse';

import RIndex from '../backend/RIndex';

type Row = {
  name: string,
  reusedvalue: number,
  reusingvalue: number
}

interface HistogramContainer {
  reused : Array<HistogramEntry<Author>>,
  reusing : Array<HistogramEntry<Author>>
}

function getFrequencyOrElseZero(entry: HistogramEntry<Author> | undefined): number {
  if(entry === undefined){
    return 0
  } else {
    return entry.frequency
  }
}


export default defineComponent({
  name: "ReuseMetrics",
  components: { AgGridVue },
  setup() {
    const isLoading = ref(false);
    const researchers = ref({} as HistogramContainer);
    const rowData = ref({} as Array<Row>)
    const reuseData = (reuseJson as Array<any>).map(ReuseFromJson);
    const indexer = new RIndex(reuseData);

    onBeforeMount(async () => {
        isLoading.value = true;
        
        researchers.value = { 
          reused: (await indexer.computeAuthorsReused()),
          reusing: (await indexer.computeAuthorsReusing())
          };

        let allAuthors: Array<Author> = Array.from(new Set(researchers.value.reused.map(p => p.entry).concat(researchers.value.reusing.map(p => p.entry))))

        rowData.value = allAuthors
          .map(author => {
            let nameVal = author.given! + " " + author.family!

            let reusedVal = getFrequencyOrElseZero(researchers.value.reused.find(e => { return e.entry.given == author.given && e.entry.family == author.family }))
            let reusingVal = getFrequencyOrElseZero(researchers.value.reusing.find(e => { return e.entry.given == author.given && e.entry.family == author.family }))

            return {name: nameVal, reusedvalue: reusedVal, reusingvalue: reusingVal}
          })

        isLoading.value = false;
    })
    
    const columns = [
        {
          field: "name",
          headerName: "Autor",
        },
        {
          field: "reusedvalue",
          headerName: "Reused(R+)",
        },
        {
          field: "reusingvalue",
          headerName: "Reusing(R)",
        }
    ];

    return { isLoading, columns, rowData };
  },
});
</script>
