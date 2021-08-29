<template>
  <div>
    <h1 class="text-xl bg-opacity-80 bg-blue-200">Collected Reuse Data</h1>
    <div v-if="isLoading">
      <p>Loading data ...</p>
    </div>
    <div v-else class="">
        <p>Lorem ipsum</p>
        <p>Lorem ipsum</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";

import reuseJson from "../assets/data/reuse.json";
import Reuse, { ReuseFromJson } from "../backend/models/Reuse";

export default defineComponent({
  name: "ReuseData",
  components: {  },
  setup() {
    const isLoading = ref(false);
    const rows = ref(new Array<Reuse>());

    onBeforeMount(async () => {
        isLoading.value = true;
        
        const reuseData = (reuseJson as Array<any>).map(ReuseFromJson);

        rows.value = reuseData;

        isLoading.value = false;
    })
    
    const columns = [
        {
          prop: "sourceDOI",
          name: "Source Paper",
        },
        {
          prop: "type",
          name: "Type",
        },
        {
          prop: "reusedDOI",
          name: "Target Paper",
        }
    ];

    /*
      sourceDOI: string,
  type : ReuseType,
  comment: string,
  sourceReference: string,
  reusedDOI: string,
  alternativeID: string,
  sourceReferenceDetail: string,
  contributor: string
    */

    return { isLoading, columns, rows };
  },
});
</script>
<style scoped>
/* weird bugfix for revogrid */
.main-viewport {
    align-items: flex-start; 
}
</style>