<template>
  <div>
    <Navigation />
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <div class="text-left p-5">
        <h1 class="text-2xl">{{ paper.message.title.join(": ") }}</h1>
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
            Published: {{
            paper.message.created.dateTime.toLocaleDateString()
          }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import { WorkMessage } from "../clients/crossref";
import { CachedWorksApi } from "../tools/CachedWorksApi";
import Navigation from "../components/Navigation.vue";

import router from "../tools/router";

export default defineComponent({
  name: "Paper",
  components: { Navigation },
  setup() {
    const isLoading = ref(false);
    const paper = ref({} as WorkMessage);

    const doiPrefix = router.currentRoute.value.params.doiPrefix as string;
    const doiSuffix = router.currentRoute.value.params.doiSuffix as string;
    const doi = `${doiPrefix}/${doiSuffix}`;

    onBeforeMount(async () => {
      isLoading.value = true;

      paper.value = await new CachedWorksApi().worksDoiGet({
        doi: doi,
      });

      isLoading.value = false;
    });

    return { paper, isLoading };
  },
});
</script>
