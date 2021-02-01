<template>
  <div id="app">
    <header>
      <h1 class="text-4xl">Department of Reuse</h1>
    </header>
    <main>
      <div class="grid grid-cols-5 gap-4">
        <div class="">
          <div>
            <h2 class="text-2xl bg-opacity-40 bg-green-200">Researchers</h2>
            <div class="grid grid-cols-2 gap-2">
              <div class="">
                <h3 class="text-l bg-opacity-20 bg-green-200">Most reused</h3>
                <table class="m-1 table-auto text-xs">
                  <tr>
                    <td><Person orcid="0000-0002-5040-3196" /></td>
                  </tr>
                  <tr class="bg-opacity-20 bg-white">
                    <td><Person orcid="0000-0003-4719-8803" /></td>
                  </tr>
                  <tr>
                    <td><Person orcid="0000-0001-8303-2099" /></td>
                  </tr>
                  <tr class="bg-opacity-20 bg-white">
                    <td><Person orcid="0000-0003-3146-7968" /></td>
                  </tr>
                  <tr>
                    <td><Person orcid="0000-0003-3300-6540" /></td>
                  </tr>
                </table>
              </div>
              <div class="">
                <h3 class="text-l bg-opacity-20 bg-green-200">Most reusing</h3>
                <table class="m-1 table-auto text-xs">
                  <tr>
                    <td><Person orcid="0000-0001-8303-2099" /></td>
                  </tr>
                  <tr class="bg-opacity-20 bg-white">
                    <td><Person orcid="0000-0001-5992-2366" /></td>
                  </tr>
                  <tr>
                    <td><Person orcid="0000-0001-8589-2850" /></td>
                  </tr>
                  <tr class="bg-opacity-20 bg-white">
                    <td><Person orcid="0000-0001-9848-2017" /></td>
                  </tr>
                  <tr>
                    <td><Person orcid="0000-0001-6563-7537" /></td>
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
                <table class="m-1 table-auto text-xs">
                  <tr>
                    <td><Doi identifier="10.1145/3368089.3409767" /></td>
                  </tr>
                  <tr class="bg-opacity-20 bg-white">
                    <td><Doi identifier="10.1109/TSE.2007.256941" /></td>
                  </tr>
                  <tr>
                    <td><Doi identifier="10.1145/3243176" /></td>
                  </tr>
                  <tr class="bg-opacity-20 bg-white">
                    <td><Doi identifier="10.1109/TPDS.2020.3014173" /></td>
                  </tr>
                  <tr>
                    <td><Doi identifier="10.1145/3297663.3310305" /></td>
                  </tr>
                </table>
              </div>
              <div class="">
                <h3 class="text-l bg-opacity-20 bg-green-200">Most reusing</h3>
                <table class="m-1 table-auto text-xs">
                  <tr>
                    <td><Doi identifier="10.1145/3297663.3310305" /></td>
                  </tr>
                  <tr class="bg-opacity-20 bg-white">
                    <td><Doi identifier="10.1109/TPDS.2020.3014173" /></td>
                  </tr>
                  <tr>
                    <td><Doi identifier="10.1109/TSE.2007.256941" /></td>
                  </tr>
                  <tr class="bg-opacity-20 bg-white">
                    <td><Doi identifier="10.1145/3243176" /></td>
                  </tr>
                  <tr>
                    <td><Doi identifier="10.1145/3368089.3409767" /></td>
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
    </footer>
  </div>
</template>

<script>
import DoRGraph from './components/DoRGraph.vue';
import Person from './components/Person.vue';
import Doi from './components/Doi.vue';
import DoiFull from './components/DoiFull.vue';

export default {
  name: 'App',
  components: {
    DoRGraph, Doi, DoiFull, Person
  },
  data() {
    return {
      currentIdentifier: null
    }
  },
  methods: {
    nodeClicked(doi) {
      this.$refs.doiFull.updateRecord(doi);
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
