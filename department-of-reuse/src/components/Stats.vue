<template>
  <div>
    <h2 class="text-base bg-opacity-80 bg-blue-200 mt-3">Statistics <button class="float-right" v-on:click="open = !open">{{ open ? "🔼" : "🔽"  }}</button></h2>

    <table class="m-1 table-auto text-xs bg-opacity-40 bg-white" v-if="open">
      <tr>
        <td class="w-full text-left">Papers inspected</td>
        <td class="text-right">{{ papersInspected }}</td>
      </tr>
      <tr>
        <td class="w-full text-left">Reused papers (DOI)</td>
        <td class="text-right">{{ targetDoiNodes }}</td>
      </tr>
      <tr>
        <td class="w-full text-left">Reused papers (arXiv)</td>
        <td class="text-right">{{ targetArxivNodes }}</td>
      </tr>
      <tr>
        <td class="w-full text-left">Reused repositories (GitHub)</td>
        <td class="text-right">{{ targetGitHubNodes }}</td>
      </tr>
      <tr>
        <td class="w-full text-left">Reused websites</td>
        <td class="text-right">{{ targetWebsiteNodes }}</td>
      </tr>
      <tr>
        <td class="w-full text-center" colspan="2">Reuse types</td>
      </tr>
      <tr>
        <td class="text-center" colspan="2">{{ edgeTypes }}</td>
      </tr>
    </table>
  </div>
</template>
<script lang="ts">
import { ref, PropType } from "vue";
import Reuse from "../backend/models/Reuse";
import { Histogram } from '../tools/Histogram';
import CompoundSet from '../tools/CompoundSet';

export default {
  props: {
    reuseData: Array as PropType<Array<Reuse>>,
  },
  setup(props: any) {
    const open = ref(true);
    const data = props.reuseData as Array<Reuse>;

    const papersInspected = ref(new Set(data.map((r) => r.sourceDOI)).size);

    const targetDoiNodes = ref(new Set(data.filter(r => r.reusedDOI.trim().length > 0).map(r => r.reusedDOI)).size);
    const targetGitHubNodes = ref(new Set(data.filter(r => r.alternativeID.startsWith("https://github.com/")).map(r => r.alternativeID)).size);
    const targetArxivNodes = ref(new Set(data.filter(r => r.alternativeID.startsWith("arxiv:")).map(r => r.alternativeID)).size);
    
    const websiteFilter = (id: string): boolean => !id.startsWith("https://github.com/")&&(id.startsWith("http://")||id.startsWith("https://"));
    const targetWebsiteNodes = ref(new Set(data.filter(r => websiteFilter(r.alternativeID)).map(r => r.alternativeID)).size);

    const edges = Array.from(new CompoundSet(data.map((item: Reuse) => {
        return { source: item.sourceDOI, target: item.reusedDOI.trim().length > 0 ? item.reusedDOI : item.alternativeID, type: item.type } ;
    })));
    
    const edgeTypeHistogram = new Histogram(e => `${e.type}`, edges).histogram();

    const edgeTypes = edgeTypeHistogram.map(e => `${e.entry.type} (${e.frequency})`).join(", ");

    return { open, papersInspected, targetDoiNodes, targetGitHubNodes, targetArxivNodes, targetWebsiteNodes, edgeTypes };
  },
};
</script>
