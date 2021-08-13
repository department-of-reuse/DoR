<template>
  <div class="w-full">
      <div class="flex gap-2">
        <div class="w-72 h-screen" style="margin-bottom: -125px">
            <h2 class="text-xl bg-opacity-80 bg-blue-200">Filter</h2>
            <label>Reuse type</label>
            <select class="" name="">
                <option value="">All</option>
                <option value="">Methodology</option>
                <option value="">Dataset</option>
                <option value="">Tool</option>
                <option value="">Statistics</option>
                <option value="">Protocol</option>
                <option value="">Metric</option>
            </select>
            <div class="w-full h-full">
            <GraphView :reuseData="reuseData"/>
          </div>
        </div>
        <div class="w-full">
          <header class="bg-opacity-40 bg-gray-200 z-10">
            <h1 class="text-4xl">Department of Reuse</h1>
            <h2>- under development / data widely incomplete -</h2>
          </header>


        </div>
        <div class="flex-none w-72 order-3 hidden lg:block z-10 overflow-y-auto h-screen" >
            <TopFive class="z-10" :reuseData="reuseData" />
            <Stats :reuseData="reuseData" />
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import GraphView from '../components/GraphView.vue';
import TopFive from '../components/TopFive.vue';

import Stats from '../components/Stats.vue';

import reuseJson from '../assets/data/reuse.json';
import { ReuseFromJson } from '../backend/models/Reuse';

export default {
  name: "Home",
  components: { Stats, TopFive, GraphView },
  setup() {
    const reuseData = (reuseJson as Array<any>).map(ReuseFromJson);

    return { reuseData };
  },
};
</script>


