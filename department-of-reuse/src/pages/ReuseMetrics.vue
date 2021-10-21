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
            :rowData="researchers.reused"
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

import reuseJson from '../assets/data/reuse.json';
import { ReuseFromJson } from '../backend/models/Reuse';

import RIndex from '../backend/RIndex';

type Row = {
  name: string,
  rvalue: number
}

interface HistogramContainer {
  reused : Array<Row>,
  reusing : Array<any>
}




export default defineComponent({
  name: "ReuseMetrics",
  components: { AgGridVue },
  setup() {
    const isLoading = ref(false);
    const researchers = ref({} as HistogramContainer);
    const reuseData = (reuseJson as Array<any>).map(ReuseFromJson);
    const indexer = new RIndex(reuseData);

    onBeforeMount(async () => {
        isLoading.value = true;
        
        researchers.value = { 
          reused: (await indexer.computeAuthorsReused()).map(p => {return {name: p.entry.given! + " " + p.entry.family!, rvalue: p.frequency}}),
          reusing: (await indexer.computeAuthorsReusing())
          };

        isLoading.value = false;
    })
    
    const columns = [
        {
          field: "name",
          headerName: "Autor",
        },
        {
          field: "rvalue",
          headerName: "Reused(R)",
        }
    ];

    return { isLoading, columns, researchers };
  },
});
</script>
