<template>
  <div id="app">
    <header>
      <h1 class="text-4xl">Department of Reuse</h1>
      <h2>- under development / data widely incomplete -</h2>
    </header>
    <main>
      <div class="grid grid-cols-5 gap-4">
        <div class="">
          <div>
            <h2 class="text-2xl bg-opacity-40 bg-green-200">Researchers</h2>
            <div class="grid grid-cols-2 gap-2">
              <div class="">
                <h3 class="text-l bg-opacity-20 bg-green-200">Most reused</h3>
                <table class="m-1 table-auto text-xs w-full">
                  <tr v-for="(r, index) in researchers.reused" :key="r.ORCID" :class="index % 2 ? 'bg-opacity-20 bg-white' : ''">
                    <td><a :href="r.ORCID" target="_blank">{{r.given}} {{r.family}}</a></td>
                  </tr>
                </table>
              </div>
              <div class="">
                <h3 class="text-l bg-opacity-20 bg-green-200">Most reusing</h3>
                <table class="m-1 table-auto text-xs w-full">
                  <tr v-for="(r, index) in researchers.reusing" :key="r.ORCID" :class="index % 2 ? 'bg-opacity-20 bg-white' : ''">
                    <td><a :href="r.ORCID" target="_blank">{{r.given}} {{r.family}}</a></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div>
            <h2 class="text-2xl bg-opacity-40 bg-green-200">Artifacts</h2>
            <div class="grid grid-cols-2 gap-2">
              <div class="">
                <h3 class="text-l bg-opacity-20 bg-green-200">Most reused</h3>
                <table class="m-1 table-auto text-xs w-full">
                  <tr v-for="(p, index) in publications.reused" :key="p.title" :class="index % 2 ? 'bg-opacity-20 bg-white' : ''">
                    <td><a :href="p.url" target="_blank">{{p.title}}</a></td>
                  </tr>
                </table>
              </div>
              <div class="">
                <h3 class="text-l bg-opacity-20 bg-green-200">Most reusing</h3>
                <table class="m-1 table-auto text-xs w-full">
                  <tr v-for="(p, index) in publications.reusing" :key="p.title" :class="index % 2 ? 'bg-opacity-20 bg-white' : ''">
                    <td><a :href="p.url" target="_blank">{{p.title}}</a></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-3 justify-evenly">
          <DoRGraph @nodeClicked="nodeClicked" />
        </div>
        <div class="">
          <h2 class="text-2xl bg-opacity-40 bg-green-200 mb-5">Details</h2>
          <DoiFull ref="doiFull" :identifier="currentIdentifier" />
        </div>
      </div>
    </main>

    <footer>
      <p class="text-xs">This is a community effort started by Maria Teresa Baldassarre, Neil Ernst, Ben Hermann, and Tim Menzies.</p>
      <p class="text-xs">Please feel free to <a class="text-green-600" href="https://github.com/bhermann/DoR">comment or contribute on GitHub</a>.</p>
    </footer>
  </div>
</template>

<script>
import DoRGraph from './components/DoRGraph.vue';
import DoiFull from './components/DoiFull.vue';

import reuseData from './assets/data/reuse.json';

export default {
  name: 'App',
  components: {
    DoRGraph, DoiFull
  },
  data() {
    return {
      currentIdentifier: null,
      researchers: this.computeTopResearchers(reuseData),
      publications: this.computeTopPublications(reuseData)
    }
  },
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
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

header {
  margin-bottom: 10px;
}

footer {
  margin-top: 10px;
}
</style>
