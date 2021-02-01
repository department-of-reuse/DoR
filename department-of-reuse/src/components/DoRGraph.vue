<template>
  <div class="dor-graph">
    <div class="dor-graph object-center flex justify-center">
      <div class="bg-gray-200 h-auto w-full">
        <d3-network :net-nodes="nodes" :net-links="links" :options="options"  @node-click="nodeClick"/>
      </div>
    </div>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network'

export default {
  name: 'DoRGraph',
  components: {
    D3Network
  },
  data () {
    return {
      nodes: [
        { id: 1, name: 'Cho et al. (PACT\'18) \n DOI: 10.1145/3243176' },
        { id: 2, name: 'Zheng et al. (IEEE TPDS 2010) \n DOI: 10.1109/TPDS.2020.3014173' },
        { id: 3, name: 'Huang et al. (ICPE\'19) \n DOI: 10.1145/3297663.3310305' },
      ],
      links: [
        { sid: 2, tid: 1 },
        { sid: 3, tid: 1 },
      ],
      options:
      {
        force: 30000,
        nodeSize: 20,
        nodeLabels: true,
        linkWidth:5
      }
    }
  },
  methods: {
    nodeClick(event, node) {
      var pos = node.name.search("DOI: ");
      var doi = node.name.substring(pos + 4, node.name.length);
      this.$emit('nodeClicked', doi.trim())
    }
  }
}
</script>

 <style src="vue-d3-network/dist/vue-d3-network.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .node-label {
  }
</style>
