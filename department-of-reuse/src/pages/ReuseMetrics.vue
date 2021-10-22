<style lang="scss">
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";

  .cell-wrap-text { white-space: normal !important; }
</style>
<template>
  <div>
    <h1 class="text-xl bg-opacity-80 bg-blue-200">Reuse Statistics for Authors and Publications</h1>
    <div v-if="isLoading">
      <p>Loading data ...</p>
    </div>
    <div v-else class="h-full lg:h-screen">
        <div class="lg:float-left float-none mt-1.5 w-11/12 lg:w-2/5" style="height: 85vh; margin-left: 3%">
          <h1 class="text-3xl">Reuse Statistics by Author</h1>
          <ag-grid-vue
              style="width: 100%; height: 97%; margin-top: 3%"
              class="ag-theme-alpine"
              :columnDefs="columns.authors"
              :rowData="rowData.authors"
              :animateRows="true"
              :defaultColDef="defaultColDef"
              :enableCellTextSelection="true"
            >
          </ag-grid-vue>
        </div>
        <div class="lg:float-left float-none mt-20 lg:mt-1.5 w-11/12 lg:w-1/2" style="height: 85vh; margin-left: 3%;">
          <h1 class="text-3xl">Reuse Statistics by Publication</h1>
          <ag-grid-vue
              style="width: 100%; height: 97%; margin-top: 2.2%"
              class="ag-theme-alpine"
              :columnDefs="columns.papers"
              :rowData="rowData.papers"
              :animateRows="true"
              :defaultColDef="defaultColDef"
              :enableCellTextSelection="true"
            >
          </ag-grid-vue>
        </div>
        <div style="clear: both;"></div>
    </div>
  </div>
</template>
<script lang="ts">
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { defineComponent, onBeforeMount, ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";

import { HistogramEntry } from '../tools/Histogram';
import { Author, Work } from '../clients/crossref';

import reuseJson from '../assets/data/reuse.json';
import { ReuseFromJson } from '../backend/models/Reuse';

import RIndex from '../backend/RIndex';

type AuthorRow = {
  givenname: string,
  familyname: string,
  reusedvalue: number,
  reusingvalue: number
}

type PublicationRow = {
  name: String,
  reusedvalue: number,
  reusingvalue: number
}

interface HistogramContainer<T> {
  reused : Array<HistogramEntry<T>>,
  reusing : Array<HistogramEntry<T>>
}

interface RowContainer {
  authors: Array<AuthorRow>,
  papers: Array<PublicationRow>
}

function getFrequencyOrElseZero<T>(entry: HistogramEntry<T> | undefined): number {
  if(entry === undefined){
    return 0
  } else {
    return entry.frequency
  }
}

function uniqueFilter(value: Author, index: number, self: Array<Author>) {
    return self.findIndex(function(curr: Author){return curr.given === value.given && curr.family == value.family}) === index;
}


export default defineComponent({
  name: "ReuseMetrics",
  components: { AgGridVue },
  setup() {
    const isLoading = ref(false);
    const rowData = ref({authors:[], papers:[]} as RowContainer)
    const reuseData = (reuseJson as Array<any>).map(ReuseFromJson);
    const indexer = new RIndex(reuseData);

    onBeforeMount(async () => {
        isLoading.value = true;
        
        let researchers: HistogramContainer<Author> = { 
          reused: (await indexer.computeAuthorsReused()),
          reusing: (await indexer.computeAuthorsReusing())
          };
    
        let papers: HistogramContainer<Work> = {
          reused: (await indexer.computeWorksReused()),
          reusing: (await indexer.computeWorksReusing())
          };
        

        let allAuthors: Array<Author> = researchers.reused.map(p => p.entry).concat(researchers.reusing.map(p => p.entry)).filter(uniqueFilter)
        let allWorks: Array<Work> = Array.from(new Set(papers.reused.map(p => p.entry).concat(papers.reusing.map(p => p.entry))))


        rowData.value.authors = allAuthors
          .map(author => {
            let givennameVal = author.given == undefined ? "" : author.given
            let familynameVal = author.family == undefined ? "" : author.family

            let reusedVal = getFrequencyOrElseZero(researchers.reused.find(e => { return e.entry.given == author.given && e.entry.family == author.family}))
            let reusingVal = getFrequencyOrElseZero(researchers.reusing.find(e => { return e.entry.given == author.given && e.entry.family == author.family }))

            return {givenname: givennameVal, familyname: familynameVal, reusedvalue: reusedVal, reusingvalue: reusingVal}
          })

        rowData.value.papers = allWorks
          .map(work => {
            let title = work.title[0]

            let reusedVal = getFrequencyOrElseZero(papers.reused.find(e => { return e.entry.dOI == work.dOI }))
            let reusingVal = getFrequencyOrElseZero(papers.reusing.find(e => { return e.entry.dOI == work.dOI }))

            return {name: title, reusedvalue: reusedVal, reusingvalue: reusingVal}
          })

        isLoading.value = false;
    })

    let defaultColDef = {
        sortable: true,
        sortingOrder: ["asc", "desc"],
        filterParams: {
          buttons: ["reset"],
          debounceMs: 300
        }
      }
    
    const columns = {
      authors:[
        {
          field: "givenname",
          headerName: "Given Name",
          filter: "agTextColumnFilter",
          resizable: true,
          flex:2
        },
        {
          field: "familyname",
          headerName: "Family Name",
          filter: "agTextColumnFilter",
          resizable: true,
          flex:2
        },
        {
          field: "reusedvalue",
          headerName: "R+",
          headerTooltip: "Times publications of this author have been reused.",
          filter: "agNumberColumnFilter",
          flex:1
        },
        {
          field: "reusingvalue",
          headerName: "R",
          headerTooltip: "Times this author has reused other publications.",
          filter: "agNumberColumnFilter",
          flex:1
        }
      ],
      papers:[
        {
          field: "name",
          headerName: "Publication",
          filter: "agTextColumnFilter",
          resizable: true,
          flex:5
          //cellClass: "cell-wrap-text",
          //autoHeight: true
        },
        {
          field: "reusedvalue",
          headerName: "R+",
          headerTooltip: "Times this publication has been reused.",
          filter: "agNumberColumnFilter",
          flex:1
        },
        {
          field: "reusingvalue",
          headerName: "R",
          headerTooltip: "Times this publication has reused other publications.",
          filter: "agNumberColumnFilter",
          flex:1
        }
      ]
    }
    
    ;

    return { isLoading, columns, rowData, defaultColDef };
  },
});
</script>
