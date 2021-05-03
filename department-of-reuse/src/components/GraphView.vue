<template>
  <div ref="cyroot" class="h-full w-full mx-auto pt-14 pb-10"></div>
</template>

<script lang="ts">
import cytoscape, { Core, CytoscapeOptions } from "cytoscape";
import fcose from "cytoscape-fcose";

import { ref, onMounted, PropType } from "vue";

import Reuse from "../backend/models/Reuse";
import { CachedWorksApi } from "../tools/CachedWorksApi";
import { Author } from "@/clients/crossref";

export default {
  props: {
    reuseData: Array as PropType<Array<Reuse>>,
  },
  setup(props: any) {
    const cyroot = ref(null);
    const cyInstance = ref<Core | null>(null);
    const worksApi = new CachedWorksApi();

    function transformToGraph(data: Array<Reuse>) {
      return {
        nodes: getNodes(data),
        edges: getLinks(data),
      };
    }
    function getNodes(data: Array<Reuse>) {
      return data
        .map((item: Reuse) => {
          return {
            data: { id: item.reusedDOI, name: getItemTitle(item.reusedDOI) },
          };
        })
        .concat(
          data.map((item: Reuse) => {
            return {
              data: { id: item.sourceDOI, name: getItemTitle(item.sourceDOI) },
            };
          })
        )
        .sort()
        .filter(function (item: any, pos: any, ary: any) {
          return !pos || item.data.id != ary[pos - 1].data.id;
        });
    }
    function getLinks(data: Array<Reuse>) {
      return data.map((item: Reuse) => {
        return { data: { source: item.sourceDOI, target: item.reusedDOI } };
      });
    }
    function getItemTitle(doi: string): string {
      const work = worksApi.worksDoiGet({ doi: doi }).catch((err) => {
        console.error(err);
      });

      console.log(work);
      return getAuthors([]);
    }
    function getAuthors(authors: Array<Author>): string {
      if (!authors) return "";
      if (!authors[0]) return "";
      if (authors.length == 1) return authors[0].family;
      return authors[0].family + " et al.";
    }

    const staticElements = transformToGraph(props.reuseData);

    onMounted(() => {
      var cytoConfig = {
        container: cyroot.value,
        elements: staticElements,
        layout: {
          name: "fcose",
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
              "background-color": "#77aaff",
            },
          },
          {
            selector: "edge",
            style: {
              "curve-style": "bezier",
              "target-arrow-shape": "triangle",
              "line-color": "#9dbaea",
              "target-arrow-color": "#9dbaea",
            },
          },
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
        selectionType: "single",
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
        pixelRatio: "auto",
      } as CytoscapeOptions;
      cytoscape.use(fcose);
      var cy = cytoscape(cytoConfig);
      cy.layout({ name: "fcose" }).run();
      cyInstance.value = cy;

      var throttle: any;
      function handleWindowResize() {
        clearTimeout(throttle);
        throttle = setTimeout(function () {
          cyInstance.value!.layout({ name: "fcose" }).run();
        }, 100);
      }

      window.addEventListener("resize", handleWindowResize);
    });

    return {
      cyroot,
      cyInstance,
    };
  },
};
</script>
