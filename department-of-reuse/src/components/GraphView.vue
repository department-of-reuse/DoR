<template>
  <div ref="cyroot" class="h-full w-full mx-auto pt-14 pb-10"></div>
</template>

<script lang="ts">
  import cytoscape, {Core, CytoscapeOptions} from 'cytoscape'
  import fcose from 'cytoscape-fcose'

  import { ref, onMounted } from 'vue'

  import reuseData from '../assets/data/reuse.json';

  export default {
    setup() {
      const cyroot = ref(null);
      const cyInstance = ref<Core | null>(null);

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
         return getAuthors(publication.author)  + "(" + new Date(publication.issued).getFullYear() + ")";
       }
       function getAuthors(authors : any) {
         if (!authors) return "";
         if (!authors[0]) return "";
         if (authors.length == 1) return authors[0].family;
         return authors[0].family + " et al.";
       }

      const staticElements = transformToGraph(reuseData);

      onMounted(() => {
        var cytoConfig = {
          container : cyroot.value,
          elements : staticElements,
          layout: {
           name: 'fcose'
         },
         style: [
            {
              selector: "node",
              style: {
                content: "data(name)",
                "font-family": "Roboto Condensed, Helvetica, Arial, sans-serif",
                width: 10,
                height: 10,
                "font-size": "8pt",
                "text-opacity": 1,
                "text-valign": "center",
                "text-halign": "right",
                color: "#2c3e50",
                "background-color": "#77aaff"
              }
            },
            {
              selector: "edge",
              style: {
                "curve-style": "bezier",
                "target-arrow-shape": "triangle",
                "line-color": "#9dbaea",
                "target-arrow-color": "#9dbaea"
              }
            }
          ],
          // initial viewport state:
          zoom: 1,
          pan: { x: 0, y: 0 },
          // interaction options:
          minZoom: 1e-50,
          maxZoom: 1e50,
          zoomingEnabled: true,
          userZoomingEnabled: true,
          panningEnabled: true,
          userPanningEnabled: true,
          boxSelectionEnabled: true,
          selectionType: 'single',
          touchTapThreshold: 8,
          desktopTapThreshold: 4,
          autolock: false,
          autoungrabify: false,
          autounselectify: false,
          // rendering options:
          headless: false,
          styleEnabled: true,
          hideEdgesOnViewport: false,
          textureOnViewport: false,
          motionBlur: true,
          motionBlurOpacity: 0.1,
          animate: true,
          pixelRatio: 'auto',
         } as CytoscapeOptions;
        cytoscape.use(fcose);
        var cy = cytoscape(cytoConfig);
        cy.layout({ name: 'fcose' }).run();
        cyInstance.value = cy;

        var throttle : any;
        function handleWindowResize() {
          clearTimeout(throttle);
          throttle = setTimeout(function() {
            cyInstance.value!.layout({ name: 'fcose' }).run();
          }, 100);
         }

        window.addEventListener('resize', handleWindowResize);
      })

      return {
        cyroot, cyInstance
      }
    },
  }
</script>
