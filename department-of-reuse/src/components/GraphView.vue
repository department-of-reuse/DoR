<template>
  <div id="cyroot" class="w-full h-full fixed"></div>
</template>

<script lang="ts">
import cytoscape, { Core, CytoscapeOptions, ElementsDefinition, NodeDefinition, EdgeDefinition, CollectionReturnValue } from "cytoscape";
//import popper from "cytoscape-popper";
import fcose from "cytoscape-fcose";
//import cola from "cytoscape-cola";
//import d3Force from 'cytoscape-d3-force';

import { ref, PropType, onBeforeMount, watch } from "vue";

import Reuse, {  ReuseType, ReuseTypeFilter } from "../backend/models/Reuse";
import { CachedWorksApi } from "../tools/CachedWorksApi";
import { CachedArxivApi } from "../tools/CachedArxivApi";
import { Author, Work, WorkMessage } from "../clients/crossref";
import { Feed } from "../clients/arxiv";

import CompoundSet from "../tools/CompoundSet";
import { $enum } from 'ts-enum-util';

const websiteFilter = (id: string): boolean => !id.startsWith("https://github.com/")&&(id.startsWith("http://")||id.startsWith("https://"));

export default {
  props: {
    reuseData: Array as PropType<Array<Reuse>>,
    filter : String as PropType<ReuseTypeFilter>
  },
  setup(props: any) {
    const cyInstance = ref<Core | null>(null);
    const worksApi = new CachedWorksApi();
    const arxivApi = new CachedArxivApi();

    async function transformToGraph(data: Array<Reuse>) : Promise<ElementsDefinition> {
      const transformedNodes = await getNodes(data);
      
      return {
        nodes: transformedNodes,
        edges: getLinks(data),
      };
    }

    function trimGitHubURL(url : string) : string {
      const githubPrefix = "https://github.com/"
      const path = url.replace(githubPrefix, "");
      const firstSlashPos = path.indexOf("/");
      const secondSlashPos = path.indexOf("/", firstSlashPos + 1);

      if (firstSlashPos > 0 && secondSlashPos > 0) return url.substring(0, secondSlashPos + githubPrefix.length);
      return url;
    }

    async function getNodes(data: Array<Reuse>) : Promise<Array<NodeDefinition>> {
      const sourceDois = Array.from(new Set(data
                        .map(entry => entry.sourceDOI)
                        .filter(doi => doi.trim() != "")));

      const destinationDois = Array.from(new Set(data
                        .map(entry => entry.reusedDOI)
                        .filter(doi => doi.trim() != "")
                        .filter(doi => (sourceDois.findIndex(d => d == doi) < 0))));

      const arxivIds = Array.from(new Set(data
                        .map(entry => entry.alternativeID)
                        .filter(id => id.startsWith("arxiv:"))
                        .map(id => id.replace("arxiv:", ""))));

      const githubRepos = Array.from(new Set(data
                        .map(entry => entry.alternativeID)
                        .filter(id => id.startsWith("https://github.com/"))
                        .map(id => trimGitHubURL(id))));

      const urls = Array.from(new Set(data
                        .map(entry => entry.alternativeID)
                        .filter(websiteFilter)
      ))

      return Promise.all(sourceDois.map(currentDoi => createNodeFromDOI(currentDoi, "source"))
                             .concat(destinationDois.map(currentDoi => createNodeFromDOI(currentDoi, "")))
                             .concat(arxivIds.map(id => createNodeFromArxivId(id)))
                             .concat(githubRepos.map(url => createGithubNode(url)))
                             .concat(urls.map(url => createWebsiteNode(url)))
                         );
    }

    async function createWebsiteNode(url : string) : Promise<NodeDefinition> {
      const protocolStripped = url.replace("https://", "").replace("http://", "");
      const nodeName = protocolStripped.substring(0, protocolStripped.indexOf("/") > 0 ? protocolStripped.indexOf("/") : protocolStripped.length)
      return { data: {id: url, name: nodeName}, classes: "website" };
    }

    async function createGithubNode(url : string) : Promise<NodeDefinition> {
      const nodeName = url.replace("https://github.com/", "");
      return { data: {id: url, name: nodeName}, classes: "github" };
    }

    async function createNodeFromArxivId(id : string) : Promise<NodeDefinition> {
      const arxivEntry = await arxivApi.queryById({id : id}).catch((err) => {
          console.warn(err);
        });
      var nodeName = id;

      if (arxivEntry as Feed) {
        const entry = (arxivEntry as Feed).entry;

        if (entry.author.length > 0) {
          if (entry.author.length == 1) nodeName = entry.author[0].name
          else nodeName = entry.author[0].name + " et al."
        }
        nodeName += ` (${entry.published == null ? '???' : new Date(entry.published).getFullYear()})` 
      }

      return { data: {id: "arxiv:" + id, name: nodeName}, classes: "arxiv" };
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
    
    function getLinks(data: Array<Reuse>) : Array<EdgeDefinition> {
      const linksToDois = Array.from(new CompoundSet(data.filter(item => item.reusedDOI.trim().length > 0).map((item: Reuse) => {
        return { data: { source: item.sourceDOI, target: item.reusedDOI, type: item.type } };
      })));

      const linksToArxiv = Array.from(new CompoundSet(data.filter(item => item.alternativeID.startsWith("arxiv:")).map((item : Reuse) => {
          return { data: { source: item.sourceDOI, target: item.alternativeID, type: item.type } };
      })));

      const linksToGithub = Array.from(new CompoundSet(data.filter(item => item.alternativeID.startsWith("https://github.com/")).map((item: Reuse) => {
          return { data: { source: item.sourceDOI, target: trimGitHubURL(item.alternativeID), type: item.type } };
      })));

      const linksToWebsites = Array.from(new CompoundSet(data.filter(item => websiteFilter(item.alternativeID)).map((item: Reuse) => {
          return { data: { source: item.sourceDOI, target: item.alternativeID, type: item.type } }
      })));

      return linksToDois
              .concat(linksToArxiv)
              .concat(linksToGithub)
              .concat(linksToWebsites);
    }
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



    onBeforeMount(async () => {
      const elements = await transformToGraph(props.reuseData);
      
      var cytoConfig = {
        container: document.getElementById('cyroot'),
        elements: elements,
        animate: true,
        layout: { name: "fcose" },
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
              color: "#2c3e50"
            },
          },
          {
            selector: ".crossref",
            style: {
              "background-color": "#77aaff"
            }
          },
          {
            selector: ".source",
            style: {
              "border-width": "2px",
              "border-color": "#5588dd"
            }
          },
          {
            selector: ".arxiv",
            style: {
              "background-color": "#b31b1b"
            }
          },
          {
            selector: ".github",
            style: {
              "background-color": "#238636"
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
        ],
      } as CytoscapeOptions;

      cytoscape.use(fcose);
      //cytoscape.use(popper);
      var cy = cytoscape(cytoConfig);
      cyInstance.value = cy;
      
      /* This function is a work-in-progress. How to get the tooltip
      is one of the world's greatest mysteries. For whoever attempts
      this task, may God be with you. */
      /*cy.on("click", "node", event => {
        //let element = cy.getElementById(event.target._private.data.id);
        var node = event.target._private;
        console.log(node.data.citations);
      });*/

      filterElements(props.filter)

      cy.layout({ name: "fcose" }).run();


      //var throttle: any;
      /*function handleWindowResize() {
        clearTimeout(throttle);
        throttle = setTimeout(function () {
          cyInstance.value!.layout({ name: "fcose" }).run();
        }, 100);
      }*/

      // window.addEventListener("resize", handleWindowResize);
    })
  
    var filteredElements : CollectionReturnValue | null = null ;

    function filterElements(filter : ReuseTypeFilter) {
        const cy = cyInstance.value!

        if (filteredElements != null) filteredElements!.forEach(e => {
          e.restore()
        });

        if (filter as String != "ALL") {
          const filterValue = $enum(ReuseType).getValueOrDefault(filter);
          const filterExpression = `edge[type != "${filterValue}"]`;
          filteredElements = cy.filter(filterExpression);
          
          cy.remove(filteredElements)
        }
    }

    watch(
      () => props.filter,
      async filter => {
        filterElements(filter)
      })
    return {
      cyInstance,
    };
  },
};
</script>
