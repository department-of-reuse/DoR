<template>
  <div>
    <h1 class="text-xl bg-opacity-80 bg-blue-200">Publication Details</h1>
    <div v-if="isLoading">
      <p>Loading data for {{ doi }} ...</p>
    </div>
    <div v-else>

      <div class="grid grid-cols-2 gap-4 p-5">
        <div id="cyroot" class=""></div>
        <div class="text-left p-5">
          <h1 class="text-2xl">{{ paper.message.title.join(": ") }} {{ paper.message.subtitle.length > 0 ? ": " + paper.message.subtitle.join(" ") : "" }} </h1>
          <h2 class="text-xl">
            {{
              paper.message.author.map((a) => `${a.given} ${a.family}`).join(", ")
            }}
          </h2>
          <p>
            DOI:
            <a :href="'https://doi.org/' + paper.message.dOI">{{
              paper.message.dOI
            }}</a>
          </p>
          <p>
            {{ paper.message.containerTitle.join(", ") }} 
          </p>
          <p>
            Published: {{ paper.message.created.dateTime.toLocaleDateString() }}
          </p>
        </div>
        

      </div>

      

      
      <div class="grid grid-cols-2 gap-4 p-5">
        <div>
          <h2 class="text-l bg-opacity-40 bg-blue-200">Reused by</h2>
          <table class="text-left">
            <tr>
              <th class="w-min">DOI</th>
              <th>Title</th>
              <!-- <th>Reported by</th> -->
            </tr>
            <tr v-for="(r, index) in reusedStuff" :key="index">
              <td>
                <router-link
                  class="hover:bg-blue-50"
                  :to="{
                    name: 'paper',
                    params: {
                      doiPrefix: r.doi.split('/')[0],
                      doiSuffix: r.doi.split('/')[1],
                    },
                  }"
                >
                  {{ r.doi }}
                </router-link>
              </td>
              <td>
                {{ r.doiDetails.title.join(": ") }}
              </td>
              <!-- <td>
                {{ r.contributors.join(", ") }}
              </td> -->
            </tr>
          </table>
        </div>
        <div>
          <h2 class="text-l bg-opacity-40 bg-blue-200">Reusing</h2>

          <div v-if="paperNotInIndex" class="text-center p-5">
            <span class="border-2 border-black rounded-lg text-lg p-2 border-gray-400"> No Reuse Data in Index </span>
          </div>
          <div v-else>
            <table class="text-left">
              <tr>
                <th>Identifier</th>
                <th>Title</th>
                <!-- <th>Reported by</th>-->
              </tr>
            <tr v-for="(r, index) in reusingStuff" :key="index">
               <td>
                   <span v-if="r.doi">
                        <router-link
                        class="hover:bg-blue-50"
                        :to="{
                            name: 'paper',
                            params: {
                            doiPrefix: r.doi.split('/')[0],
                            doiSuffix: r.doi.split('/')[1],
                            },
                        }"
                        >
                        {{ r.doi }}
                        </router-link>
                   </span>
                   <span v-else-if="r.alternativeId.startsWith('arxiv:')">
                       ARXIV {{ r.alternativeId }}
                   </span>
                    <span v-else-if="r.alternativeId.startsWith('https://github.com')">
                       GITHUB {{ r.alternativeId }}
                   </span>
                    <span v-else>

                        {{ r.alternativeId }}
                    </span>
              </td>
              <td>
                {{ r.doiDetails ? r.doiDetails.title.join(": ") : "" }}
              </td>
              <!--<td>
                {{ r.contributors.join(", ") }}
              </td>-->
            </tr>
          </table>

          </div>

          

        </div>
      </div>

      

    </div>
  </div>
</template>
<script lang="ts">
import cytoscape, { CytoscapeOptions, NodeDefinition, EdgeDefinition, ElementsDefinition} from "cytoscape";
import dagre from "cytoscape-dagre";

import { defineComponent, onBeforeMount, ref, watch } from "vue";
import { Author, Work, WorkMessage } from "../clients/crossref";
import { CachedWorksApi } from "../tools/CachedWorksApi";

import router from "../tools/router";

import reuseJson from "../assets/data/reuse.json";
import { ReuseFromJson } from "../backend/models/Reuse";
import { useRoute } from "vue-router";

//import { Feed } from "../clients/arxiv";

interface ReuseLine {
  doi?: string;
  doiDetails?: any;
  alternativeId?: string;
  //arxivPreprint?: Feed,
  contributors: Array<string>;
}

export default defineComponent({
  name: "Paper",
  components: {  },
  setup() {

    const graphData = ref<ElementsDefinition | null>(null);

    const isLoading = ref(false);
    const paper = ref({} as WorkMessage);
    const reusedStuff = ref(new Array<ReuseLine>());
    const reusingStuff = ref(new Array<ReuseLine>());
    const paperNotInIndex = ref(true);

    const doi = ref("");

    const reuseData = (reuseJson as Array<any>).map(ReuseFromJson);

    const worksApi = new CachedWorksApi();

    const route = useRoute();


    function getItemTitle(work: Work) {
      if (work.issued) 
        return getAuthors(work.author) + " (" + work.issued.dateParts[0][0] + ")"; 
      else 
        return getAuthors(work.author) + "(???)"; 
    }

    function getAuthors(authors: Array<Author>): string {
      if (!authors) return "";
      if (!authors[0]) return "";
      if (authors.length == 1) return authors[0].family;
      return authors[0].family + " et al.";
    }


    async function createNodeFromDOI(doi : string, extraClass : string) : Promise<NodeDefinition> {
      const work = await worksApi.worksDoiGet({ doi: doi })
        .catch((err) => {
          console.warn(err);
        });

      if (work as WorkMessage) {
        const message = (work as WorkMessage).message
        const citationCount =  message.isReferencedByCount;
        const title = getItemTitle(message);
        return { data: {id: doi, name : title, citations: citationCount}, classes: "crossref " + extraClass  };
      } else {
        return { data: {id: doi, name : doi, citations: 0}, classes: "crossref " + extraClass   };
      }
    }

    function createLink(fromDOI: string, toDOI: string): EdgeDefinition {
      return { data: { source: fromDOI, target: toDOI }};
    }

    function toGraph(nodes: Array<NodeDefinition>, links: Array<EdgeDefinition>): ElementsDefinition {
      return {
        nodes: nodes,
        edges: links
      };
    }

    function createCyConfig(): CytoscapeOptions {
      return  {
        container: document.getElementById('cyroot'),
        elements: graphData.value,
        animate: false,
        layout: { name: "dagre", rankDir: 'TB', padding: 0, nodeDimensionsIncludeLabels: true, nodeSep: 10},
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
            },
          },
          {
            selector: ".reused",
            style: {
              "background-color": "#b31b1b",
              "text-valign": "top",
              "text-halign": "center",
            }
          },
          {
            selector: ".reusing",
            style: {
              "background-color": "#238636",
              "text-valign": "bottom",
              "text-halign": "center",
              
            }
          },
          {
            selector: "edge",
            style: {
              content: "data(type)",
              "font-size": "4pt",
              'text-wrap': 'wrap' ,
               'edge-text-rotation': 'autorotate',
               'min-zoomed-font-size': 10,
              "curve-style": "straight",
              "target-arrow-shape": "triangle",
              "line-color": "#9dbaea",
              "target-arrow-color": "#9dbaea",
            },
          },
          {
            selector: ".current",
            style: {
              "border-width": "1px",
              "border-color": "#000000",
              "background-color": "#6fa8dc",
              "text-valign": "center",
              "text-halign": "right",
              
            }
          }
        
        ],
      } as CytoscapeOptions;
    }

    function updateCyInstance() {
      if(graphData.value !== null){
        var cy = cytoscape(createCyConfig());
        cy.panningEnabled(false);
      }
    }



    onBeforeMount(async () => {
        const doiPrefix = router.currentRoute.value.params.doiPrefix as string;
        const doiSuffix = router.currentRoute.value.params.doiSuffix as string;
        doi.value = `${doiPrefix}/${doiSuffix}`;
        await loadPaper();
        

      cytoscape.use(dagre);
      
      updateCyInstance();
    });

    watch(
      () => route.params,
      async newParams => {
        const doiPrefix = newParams.doiPrefix as string;
        const doiSuffix = newParams.doiSuffix as string;
        doi.value = `${doiPrefix}/${doiSuffix}`;
        await loadPaper();
        updateCyInstance();
    })


    async function loadPaper() {
      isLoading.value = true;

      paper.value = await worksApi.worksDoiGetInteral({
        doi: doi.value,
      }, true);

      const reducer = (
        accumulator: Array<ReuseLine>,
        currentValue: ReuseLine
      ) => {
        var target = accumulator.find((r) => currentValue.doi ? r.doi == currentValue.doi : r.alternativeId == currentValue.alternativeId );
        
        if (target === undefined) {
          accumulator.push(currentValue);
        } else {
          currentValue.contributors.forEach((c) =>
            target!.contributors.push(c)
          );
        }
        return accumulator;
      };

      reusedStuff.value = reuseData
        .filter((r) => r.reusedDOI.toLowerCase() == doi.value.toLowerCase())
        .map((r) => {
          return {
            doi: r.sourceDOI,
            contributors: new Array(r.contributor),
          };
        })
        .reduce(reducer, new Array<ReuseLine>());

      reusedStuff.value = await resolveDois(reusedStuff.value);

      reusingStuff.value = reuseData
        .filter((r) => r.sourceDOI.toLowerCase() == doi.value.toLowerCase())
        .map((r) => {
          return {
            doi: r.reusedDOI,
            alternativeId: r.alternativeID,
            contributors: new Array(r.contributor),
          };
        })
        .reduce(reducer, new Array<ReuseLine>());

        reusingStuff.value = await resolveDois(reusingStuff.value);

      paperNotInIndex.value = (reusingStuff.value.length === 0);

      // Build graph data
      var currentNode = await createNodeFromDOI(doi.value, "current");
      var reusingNodes = await Promise.all(reusingStuff.value.filter((s) => s.doi != "").map( (s) => createNodeFromDOI(s.doi!, "reusing")));
      reusingNodes.push(currentNode);
      var reusedNodes = await Promise.all(reusedStuff.value.filter((s) => s.doi != "").map( (s) => createNodeFromDOI(s.doi!, "reused")));

      var reusingLinks = reusingStuff.value.filter((s) => s.doi != "").map( (s) => createLink(doi.value, s.doi!) )
      var reusedLinks = reusedStuff.value.filter((s) => s.doi != "").map( (s) => createLink(s.doi!, doi.value) )

      var nodes = [...new Set([...reusingNodes, ...reusedNodes])];
      var links = [...new Set([...reusingLinks, ...reusedLinks])];

      graphData.value = toGraph(nodes, links);

      isLoading.value = false;
    }

    async function resolveDois(
      stuff: Array<ReuseLine>
    ): Promise<Array<ReuseLine>> {
      return Promise.all(stuff.map(resolveDoi));
    }

    async function resolveDoi(reuse: ReuseLine): Promise<ReuseLine> {
      if (reuse.doi) {
        const workResult = await worksApi.worksDoiGetInteral({ doi: reuse.doi }, true).catch((err) => { console.warn(err); })
        if (workResult as WorkMessage) {
            reuse.doiDetails = (workResult as WorkMessage).message;
        }
      }
      return reuse;
    }

    return { paper, paperNotInIndex, reusedStuff, reusingStuff, isLoading, reuseData, doi };
  },
});
</script>

