<template>
    <div>
      <h2 class="text-xl bg-opacity-80 bg-blue-200 mt-5">Statistics</h2>
      
      <table class="m-1 table-auto text-xs bg-opacity-40 bg-white">
        <tr>
            <td class="w-full text-left">Papers inspected</td>
            <td>{{ papersInspected }}</td>
        </tr>
        <tr>
            <th></th>
            <td></td>
        </tr>
      </table>
    </div>
</template>
<script lang="ts">
import { ref, PropType } from "vue";
import Reuse from '../backend/models/Reuse';

export default ({
    props: {
        reuseData: Array as PropType<Array<Reuse>>,
    },
    setup(props : any) {
        const papersInspected = ref(new Set((props.reuseData as Array<Reuse>).map(r => r.sourceDOI)).size);
        
        return { papersInspected }
    },
})
</script>
