<template>
  <div class="dor-graph">
    <div class="dor-graph object-center flex justify-center">
      <div class="bg-gray-200 h-auto w-full">
        <d3-network :net-nodes="nodes" :net-links="links" :options="options"  @node-click="nodeClick" :linkCb="edgeDecorator"/>
        <svg height="50">
          <defs>
            <marker id="m-end" viewBox="0 0 25 25" refX="11" refY="5"
                markerWidth="6" markerHeight="6"
                orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network'
import reuseData from '../assets/data/reuse.json';

export default {
  name: 'DoRGraph',
  components: {
    D3Network
  },
  data () {
    return this.transformToGraph(reuseData)
  },
  methods: {
    nodeClick(event, node) {
      var pos = node.name.search("DOI: ");
      var doi = node.name.substring(pos + 4, node.name.length);
      this.$emit('nodeClicked', doi.trim())
    },
    transformToGraph(data) {

      return {
        nodes: this.getNodes(data),
        links: this.getLinks(data),
        options:
        {
          force: 1200,
          nodeSize: 10,
          nodeLabels: true,
          linkWidth:5,
          size: {
            h: 500,
            w: 800
          }
        }
      }
    },
    getNodes(data) {
      return data.map((item) => {
        return { id: item.reused.doi, name: this.getItemTitle(item.reused) };
      }).concat(data.map((item) => {
        return { id: item.reusing.doi, name: this.getItemTitle(item.reusing) };
      })).sort().filter(function(item, pos, ary) {
        return !pos || item.id != ary[pos - 1].id;
      });
    },
    getLinks(data) {
      return data.map((item) => {
        return { sid: item.reusing.doi, tid: item.reused.doi };
      });
    },
    getItemTitle(publication) {
      return this.getAuthors(publication.author) + " " + publication.doi;
    },
    getAuthors(authors) {
      if (!authors) return "";
      if (!authors[0]) return "";
      if (authors.length == 1) return authors[0].family;
      return authors[0].family + " et al.";
    },
    edgeDecorator(edge) {
      edge._svgAttrs = { 'marker-end': 'url(#m-end)'};
      return edge;
    }
  }
}
</script>

 <style src="vue-d3-network/dist/vue-d3-network.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .node-label {
  }

  #m-end path {
    fill: rgba(18,120,98,.7);
   }
</style>
