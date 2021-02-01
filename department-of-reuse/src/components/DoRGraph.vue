<template>
  <div class="dor-graph">
    <div class="dor-graph object-center flex justify-center">
      <div class="bg-gray-200 border-4 h-auto w-5/6">
        <d3-network :net-nodes="nodes" :net-links="links" :options="options" />
      </div>
    </div>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network'

export default {
  name: 'DoRGraph',
  props: {

  },
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
        force: 3000,
        nodeSize: 20,
        nodeLabels: true,
        linkWidth:5
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<style src="vue-d3-network/dist/vue-d3-network.css"></style>
