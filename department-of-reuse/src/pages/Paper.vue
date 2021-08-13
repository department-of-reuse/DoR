<template>
  <div>
    <h1 class="text-xl bg-opacity-80 bg-blue-200">Publication Details</h1>
    <div v-if="isLoading">
      <p>Loading data for {{ doi }} ...</p>
    </div>
    <div v-else>
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
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch } from "vue";
import { WorkMessage } from "../clients/crossref";
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
    const isLoading = ref(false);
    const paper = ref({} as WorkMessage);
    const reusedStuff = ref(new Array<ReuseLine>());
    const reusingStuff = ref(new Array<ReuseLine>());

    const doi = ref("");

    const reuseData = (reuseJson as Array<any>).map(ReuseFromJson);

    const worksApi = new CachedWorksApi();

    const route = useRoute();

    onBeforeMount(async () => {
        const doiPrefix = router.currentRoute.value.params.doiPrefix as string;
        const doiSuffix = router.currentRoute.value.params.doiSuffix as string;
        doi.value = `${doiPrefix}/${doiSuffix}`;
        await loadPaper();
    });

    watch(
      () => route.params,
      async newParams => {
        const doiPrefix = newParams.doiPrefix as string;
        const doiSuffix = newParams.doiSuffix as string;
        doi.value = `${doiPrefix}/${doiSuffix}`;
        await loadPaper();
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

    return { paper, reusedStuff, reusingStuff, isLoading, reuseData, doi };
  },
});
</script>

