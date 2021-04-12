<template>
  <div ref="cyroot" class="h-full"></div>
</template>

<script lang="ts">
  import cytoscape, {CytoscapeOptions} from 'cytoscape'
  import spread from 'cytoscape-spread'

  import { ref, onMounted } from 'vue'

  import reuseData from '../assets/data/reuse.json';

  export default {
    setup() {
      const cyroot = ref(null);

      /*const staticElements = {
        nodes: [ { data: { id: 'n0' }}, { data: { id: 'n1'}} ],
        edges: [ { data: { source: "n0", target: "n1" } }],
      };*/

      function transformToGraph(data : any) {
         return {
           nodes: getNodes(data),
           edges: getLinks(data)
         }
       }
       function getNodes(data : any) {
         return data.map((item : any) => {
           return { data: { id: item.reused.doi, name: getItemTitle(item.reused) } };
         }).concat(data.map((item : any) => {
           return { data: { id: item.reusing.doi, name: getItemTitle(item.reusing) }};
         })).sort().filter(function(item : any, pos : any, ary : any) {
           return !pos || item.data.id != ary[pos - 1].data.id;
         });
       }
       function getLinks(data : any) {
         return data.map((item : any) => {
           return { data: { source: item.reusing.doi, target: item.reused.doi }};
         });
       }
       function getItemTitle(publication : any) {
         return getAuthors(publication.author) // + " " + publication.doi;
       }
       function getAuthors(authors : any) {
         if (!authors) return "";
         if (!authors[0]) return "";
         if (authors.length == 1) return authors[0].family;
         return authors[0].family + " et al.";
       }

      const staticElements = transformToGraph(reuseData);

      onMounted(() => {
        // the DOM element will be assigned to the ref after initial render
        console.log(cyroot.value) // <div>This is a root element</div>
        var cytoConfig = {
          container : cyroot.value,
          elements : staticElements,
            layout: {
              name: 'spread'
            },
            style: [
               {
                 selector: "node",
                 style: {
                   content: "data(name)",
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
        cytoscape.use(spread);
        var cy = cytoscape(cytoConfig);
        cy.layout({ name: 'spread' }).run();
        console.debug(cy);
      })

      return {
        cyroot
      }

    },
    methods: {

    }
  }
</script>
