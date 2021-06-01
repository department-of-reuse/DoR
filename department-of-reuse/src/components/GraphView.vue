<template>
  <div ref="cyroot" class="h-full w-full mx-auto pt-14 pb-10"></div>
</template>

<script lang="ts">
import cytoscape, { Core, CytoscapeOptions, ElementsDefinition, NodeDefinition, EdgeDefinition } from "cytoscape";
import fcose from "cytoscape-fcose";

import { ref, onMounted, PropType } from "vue";

import Reuse from "../backend/models/Reuse";
import { CachedWorksApi } from "../tools/CachedWorksApi";
import { Author, WorkMessage } from "@/clients/crossref";

export default {
  props: {
    reuseData: Array as PropType<Array<Reuse>>,
  },
  setup(props: any) {
    const cyroot = ref(null);
    const cyInstance = ref<Core | null>(null);
    const worksApi = new CachedWorksApi();

    class CompoundSet<T> {
      private set: Map<string, T>;

      constructor(initial: T[] = []) {
        this.set = new Map(initial.map(val => [this.toKey(val), val]));
      }

      has(val: T): boolean {
        return this.set.has(this.toKey(val));
      }

      add(val: T): this {
        this.set.set(this.toKey(val), val);
        return this;
      }

      delete(val: T): this {
        this.set.delete(this.toKey(val));
        return this;
      }

      [Symbol.iterator]() {
        return this.set.values();
      }

      get size() {
        return this.set.size;
      }

      private toKey(val: T): string {
        return JSON.stringify(val);
      }
    }

    async function transformToGraph(data: Array<Reuse>) : Promise<ElementsDefinition> {
      const transformedNodes = await getNodes(data);
      return {
        nodes: transformedNodes,
        edges: getLinks(data),
      };
    }
    async function getNodes(data: Array<Reuse>) : Promise<Array<NodeDefinition>> {
      const dois = Array.from(new Set(data
                        .map(entry => entry.sourceDOI)
                        .concat(data.map(entry => entry.reusedDOI))
                        .filter(doi => doi.trim() != "")));

      return Promise.all(dois.map(currentDoi => createNodeFromDOI(currentDoi)));
    }

    async function createNodeFromDOI(doi : string) : Promise<NodeDefinition> {
      const title = await getItemTitle(doi);
      return { data: {id: doi, name : title }};
    }
    
    function getLinks(data: Array<Reuse>) : Array<EdgeDefinition> {
      return Array.from(new CompoundSet(data.filter(item => item.reusedDOI.trim().length > 0).map((item: Reuse) => {
        return { data: { source: item.sourceDOI, target: item.reusedDOI } };
      })));
    }
    async function getItemTitle(doi: string) {
      const work = await worksApi.worksDoiGet({ doi: doi })
        .catch((err) => {
          console.warn(err);
        });

      if (work as WorkMessage) {
        const workMessage = (work as WorkMessage).message
        if (workMessage.issued) 
          return getAuthors(workMessage.author) + " (" + workMessage.issued.dateParts[0][0] + ")"; 
        else 
          return getAuthors(workMessage.author) + "(???)";
      } else {
        return doi;
      }
 
    }
    function getAuthors(authors: Array<Author>): string {
      if (!authors) return "";
      if (!authors[0]) return "";
      if (authors.length == 1) return authors[0].family;
      return authors[0].family + " et al.";
    }

    const elementsPromise = transformToGraph(props.reuseData);

    onMounted(() => {
      var cytoConfig = {
        container: cyroot.value,
        elements: elementsPromise,
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
