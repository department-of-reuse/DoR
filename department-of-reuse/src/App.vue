<template>
  <div id="app">
    <header>
      <h1 class="text-4xl">Department of Reuse</h1>
    </header>
    <DoRGraph />
    <footer>
      <p class="text-xs">This is a community effort started by Maria Teresa Baldassarre, Neil Ernst, Ben Hermann, Tim Menzies.</p>
    </footer>
  </div>
</template>

<script>
import DoRGraph from './components/DoRGraph.vue'

export default {
  name: 'App',
  components: {
    DoRGraph
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
  margin-top: 60px;
}
</style>
