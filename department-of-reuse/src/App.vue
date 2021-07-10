<template>
  <div class="w-full">
    <img v-if="showSplash"  alt="Department of Reuse logo" src="./assets/dor-logo.svg" class="place-self-center w-1/3 mx-auto mt-10">
    <div class="" v-else>

      <div class="h-screen w-screen fixed bg-logo bg-no-repeat bg-cover bg-center">
        <div class="h-full w-full bg-gray-50 bg-opacity-95 ">
            <GraphView :reuseData="reuseData"/>
        </div>
      </div>

      <Navigation />
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
      <footer class="mt-3 absolute -bottom-0 mx-auto w-full pb-3 bg-opacity-40 bg-gray-200">
        <p class="text-xs">This is a community effort started by Maria Teresa Baldassarre, Neil Ernst, Ben Hermann, and Tim Menzies.</p>
        <p class="text-xs">Please feel free to <a class="text-blue-600" href="https://github.com/bhermann/DoR">comment or contribute on GitHub</a>.</p>
      </footer>

    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";

import GraphView from './components/GraphView.vue';
import TopFive from './components/TopFive.vue';
import Navigation from './components/Navigation.vue';
import Stats from './components/Stats.vue';

import reuseJson from './assets/data/reuse.json';
import { ReuseFromJson } from './backend/models/Reuse';

export default {
  name: "App",
  components: { GraphView, TopFive, Navigation, Stats },
  setup() {
    let showSplash = ref(true);
    const reuseData = (reuseJson as Array<any>).map(ReuseFromJson);

    onMounted(() => {
      setTimeout(() => {
        showSplash.value = false;
      }, 3000);
     

    });

    return { showSplash, reuseData };
  },
};
</script>

<style>
#app {
  font-family: 'Bitter', serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app h1,
#app h2 {
  font-weight: bold;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
