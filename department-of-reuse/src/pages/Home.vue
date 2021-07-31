<template>
  <div class="w-full">

      <div class="h-screen w-screen fixed">
        <div class="h-full w-full">
            <GraphView :reuseData="reuseData"/>
        </div>
      </div>


      <div class="lg:flex mb-4 pt-5 px-5 relative">
        <div class="flex-grow order-2">
          <header class="bg-opacity-40 bg-gray-200 z-10">
            <h1 class="text-4xl">Department of Reuse</h1>
            <h2>- under development / data widely incomplete -</h2>
          </header>
        </div>
        <div class="flex-none lg:w-72 order-1 w-full">
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
        </div>
        <div class="flex-none w-72 order-3 hidden lg:block" >
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
  components: { GraphView, TopFive, Stats },
  setup() {
    const reuseData = (reuseJson as Array<any>).map(ReuseFromJson);

    return { reuseData };
  },
};
</script>


