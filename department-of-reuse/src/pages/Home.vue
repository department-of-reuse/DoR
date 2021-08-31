<template>
  <div class="w-full">
      <div class="flex gap-2">
        <div class="w-72 h-screen" style="margin-bottom: -125px">
            <h2 class="text-xl bg-opacity-80 bg-blue-200">Filter</h2>
            <label>Reuse type</label>
            <select class="" name="" v-model="selectedFilter">
                <option value="ALL">All</option>
                <option v-for="type in reuseTypes" :key="type[0]" :value="type[0]">
                  {{ type[1] }}
                </option>
            </select>
            <div class="w-full h-full">
            <GraphView :reuseData="reuseData" :filter="selectedFilter" />
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
            <Stats :reuseData="reuseData" :filter="selectedFilter" />
            <Legend />
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import GraphView from '../components/GraphView.vue';
import TopFive from '../components/TopFive.vue';
import Stats from '../components/Stats.vue';
import Legend from '../components/Legend.vue';

import reuseJson from '../assets/data/reuse.json';
import { ReuseFromJson, ReuseType } from '../backend/models/Reuse';

import { $enum } from "ts-enum-util";
import { ref } from '@vue/reactivity';

export default {
  name: "Home",
  components: { Stats, TopFive, GraphView, Legend },
  setup() {

    const selectedFilter = ref("ALL");

    const reuseData = (reuseJson as Array<any>).map(ReuseFromJson);

    const reuseTypes = $enum(ReuseType).getEntries().sort((a,b) => {
      if (a[1] < b[1]) return -1;
      else if (a[1] > b[1]) return 1;
      else return 0;
    });

    return { reuseData, reuseTypes, selectedFilter};
  },
};
</script>


