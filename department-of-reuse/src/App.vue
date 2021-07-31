<template>
  <div id="root" class="">
    <div v-if="showSplash">
      <img
        alt="Department of Reuse logo"
        src="./assets/dor-logo.svg"
        class="place-self-center w-1/3 mx-auto mt-10"
      />
    </div>
    <div v-else class="bg-logo bg-no-repeat bg-cover bg-center">
      <Navigation />
      <!-- <navbar />-->
      <div class="bg-gray-50 bg-opacity-95 h-screen ">
        <router-view />
      </div>

      <footer
        class="
          mt-3
          absolute
          -bottom-0
          mx-auto
          w-full
          pb-3
          bg-opacity-40 bg-gray-200
        "
      >
        <p class="text-xs">
          This is a community effort started by Maria Teresa Baldassarre, Neil
          Ernst, Ben Hermann, and Tim Menzies.
        </p>
        <p class="text-xs">
          Please feel free to
          <a class="text-blue-600" href="https://github.com/bhermann/DoR"
            >comment or contribute on GitHub</a
          >.
        </p>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/reactivity';
import Navigation from "./components/Navigation.vue";
import { onMounted } from '@vue/runtime-core';

export default {
  name: "App",
  components: { Navigation },
  setup() {
      let showSplash = ref(true);

    onMounted(() => {
      setTimeout(() => {
        showSplash.value = false;
      }, 3000);
    });

    return { showSplash };
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
