<template>
    <div >
        <h1 class="text-xl bg-opacity-80 bg-blue-200">Contributors</h1>
        
        <p class="mt-5 mb-5">We are thankful to our data collectors to take the time and contribute to the effort. </p>

        <table class="m-1 table-auto text-m bg-opacity-40 bg-white mx-auto my-auto">
            <tr>
                <th class="text-left px-2 pt-1">Name</th>
                <th class="text-right px-2 pt-1">Papers inspected</th>
            </tr>
            <tr v-for="(contributor, index) in contributors" :key="index">
                <td class="text-left px-2"><a :href="'http://github.com/' + contributor.entry">{{ contributor.entry }}</a></td>
                <td class="text-right px-2">{{ contributor.frequency }}</td>
            </tr>
        </table>

    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import reuseJson from '@/assets/data/reuse.json';
import { ReuseFromJson } from '../backend/models/Reuse';
import { Histogram } from '../tools/Histogram';

export default defineComponent({
    name: "Contributors",
    components: {  },
    setup() {
        const reuseData = (reuseJson as Array<any>).map(ReuseFromJson);

        const uniqueContributorDoiPair = Array.from(new Set(reuseData.map(r => { return JSON.stringify({name: r.contributor, doi: r.sourceDOI })}))).map(s => JSON.parse(s));

        const contributors = new Histogram(x => x, uniqueContributorDoiPair.filter(p => p.name != null).map(r => r.name)).histogram();


        return { contributors };
    },
})
</script>
