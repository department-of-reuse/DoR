<template>
  <div class="w-full">
      <transition name="fade" appear>
        <img v-if="showSplash"  alt="Department of Reuse logo" src="./assets/dor-logo.svg" class="place-self-center w-1/3 mx-auto mt-10">
        <div class="" v-else>
          <div class="h-screen w-screen fixed bg-logo bg-no-repeat bg-cover bg-center -z-10">
            <div class="h-full w-full bg-gray-50 bg-opacity-95 none">
              <GraphView />
            </div>
          </div>

          <div class="flex mb-4 pt-5 px-5">
            <div class="flex-none w-72">
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
            <div class="flex-grow">
              <header class="bg-opacity-40 bg-gray-200">
                <h1 class="text-4xl">Department of Reuse</h1>
                <h2>- under development / data widely incomplete -</h2>
              </header>


            </div>
            <div class="flex-none w-72" >
              <div class="align-left" v-if="!isLoading">
                <h2 class="text-xl bg-opacity-80 bg-blue-200">Researchers</h2>

                <h3 class="text-l bg-opacity-40 bg-blue-200">Most reused</h3>
                <!--
                <table class="m-1 table-auto text-xs w-full">
                  <tr v-for="(r, index) in researchers.reused" :key="r.ORCID" :class="index % 2 ? 'bg-opacity-20 bg-white' : ''">
                    <td><a :href="r.ORCID" target="_blank">{{r.given}} {{r.family}}</a></td>
                  </tr>
                </table>
              -->

                <h3 class="text-l bg-opacity-40 bg-blue-200">Most reusing</h3>
                <!--
                <table class="m-1 table-auto text-xs w-full">
                  <tr v-for="(r, index) in researchers.reusing" :key="r.ORCID" :class="index % 2 ? 'bg-opacity-20 bg-white' : ''">
                    <td><a :href="r.ORCID" target="_blank">{{r.given}} {{r.family}}</a></td>
                  </tr>
                </table>
              -->

              <h2 class="text-xl bg-opacity-80 bg-blue-200">Artifacts</h2>

                <h3 class="text-l bg-opacity-40 bg-blue-200">Most reused</h3>
                <!--
                <table class="m-1 table-auto text-xs w-full">
                  <tr v-for="(p, index) in publications.reused" :key="p.title" :class="index % 2 ? 'bg-opacity-20 bg-white' : ''">
                    <td><a :href="p.url" target="_blank">{{p.title}}</a></td>
                  </tr>
                </table>
              -->

                <h3 class="text-l bg-opacity-40 bg-blue-200">Most reusing</h3>
                <!--
                <table class="m-1 table-auto text-xs w-full">
                  <tr v-for="(p, index) in publications.reusing" :key="p.title" :class="index % 2 ? 'bg-opacity-20 bg-white' : ''">
                    <td><a :href="p.url" target="_blank">{{p.title}}</a></td>
                  </tr>
                </table>
              -->

              </div>

            </div>
          </div>
          <footer class="mt-3 absolute -bottom-0 mx-auto w-full mb-3">
            <p class="text-xs">This is a community effort started by Maria Teresa Baldassarre, Neil Ernst, Ben Hermann, and Tim Menzies.</p>
            <p class="text-xs">Please feel free to <a class="text-blue-600" href="https://github.com/bhermann/DoR">comment or contribute on GitHub</a>.</p>
          </footer>
        </div>

      </transition>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeMount } from "vue";

import GraphView from './components/GraphView.vue';

export default {
  name: "App",
  components: { GraphView },
  setup() {
    let showSplash = ref(true);
    let isLoading = ref(true);

    //const orcid : String = "0000-0001-9848-2017";
    //const doi = "10.1145/3368089.3409767"

    onMounted(() => {
      setTimeout(() => {
        showSplash.value = false;
        isLoading.value = false;
      }, 3000);
    });

    onBeforeMount(() => {
      /*
      const personCache = new PeopleCache();
      personCache
        .getPerson(orcid)
        .then(result => {person.value = result;});

      const paperReq = new CrossrefRequester();
      paperReq.getPaper(doi)
        .then(result => {
          let crPaper = result.returnValue.message;
          paper.value =  { doi: crPaper.DOI, title: crPaper.title[0]} as Paper;
        });

      isLoading.value = false;
      */
    });

    return { showSplash, isLoading };
  },
};

/*
methods: {
   nodeClicked(doi) {
     this.$refs.doiFull.updateRecord(doi);
   },
   computeTopResearchers(data) {
     return {
       reused: this.sortByCount(data.flatMap((item) => { return item.reused.author; }), this.authorKey).slice(0,5),
       reusing: this.sortByCount(data.flatMap((item) => { return item.reusing.author; }), this.authorKey).slice(0,5)
     };
   },
   computeTopPublications(data) {
     return {
       reused: this.sortByCount(data.map((item) => { return {title: item.reused.title, url: item.reused.url }; }), this.publicationKey).slice(0,5),
       reusing: this.sortByCount(data.map((item) => { return {title: item.reusing.title, url: item.reused.url }; }), this.publicationKey).slice(0,5)
     };
   },
   authorKey(item) {
     return item.given + " " + item.family;
   },
   publicationKey(item) {
     return item.title;
   },
   sortByCount(toBeSorted, key) {
     var hash = new Object();

     toBeSorted.forEach(function (element) {
                            var name = key(element);
                            if (hash[name] == undefined) {
                                hash[name] = 1;
                            }
                            else {
                                hash[name] +=1;
                            }});

     var sorted = toBeSorted.sort(function(a,b) {
       return hash[key(b)] - hash[key(a)];
     });

     var seen = new Object();
     sorted = sorted.filter(function(item) {
       var name = key(item);
       if (seen[name] == undefined) {
           seen[name] = true;
           return true;
       }
       return false;
     });

     return sorted;
   }
 }

*/
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;

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
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
