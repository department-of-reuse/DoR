<template>
  <div ref="cyroot" class="h-full"></div>
</template>

<script lang="ts">
  import cytoscape, {CytoscapeOptions} from 'cytoscape'
  import dagre from 'cytoscape-dagre'

  import { ref, onMounted } from 'vue'



  export default {
    setup() {
      const cyroot = ref(null)

      onMounted(() => {
        // the DOM element will be assigned to the ref after initial render
        console.log(cyroot.value) // <div>This is a root element</div>
        var cytoConfig = {
          container : cyroot.value,
          elements: {
            nodes: [ { data: { id: 'n0' }}, { data: { id: 'n1'}} ],
            edges: [ { data: { source: "n0", target: "n1" } }],
          },
            layout: {
              name: 'dagre'
            },
            style: [
               {
                 selector: "node",
                 style: {
                   content: "data(id)",
                   "text-opacity": 0.5,
                   "text-valign": "center",
                   "text-halign": "right",
                   "background-color": "#11479e"
                 }
               },

               {
                 selector: "edge",
                 style: {
                   "curve-style": "bezier",
                   width: 4,
                   "target-arrow-shape": "triangle",
                   "line-color": "#9dbaea",
                   "target-arrow-color": "#9dbaea"
                 }
               }
             ]
          
         } as CytoscapeOptions;
        cytoscape.use(dagre);
        var cy = cytoscape(cytoConfig);
        console.debug(cy);
      })

      return {
        cyroot
      }
    }
  }
</script>
