<template>
  <div class="fixed w-screen h-screen z-20 bg-black bg-opacity-60">
    <div
      class="
        w-1/3
        bg-gray-100
        mx-auto
        inset-x-0
        mt-20
        border-4 border-gray-100
        pb-5
      "
      v-if="!isLoading"
    >
      <h2 class="bg-opacity-80 bg-blue-200 mb-5 text-lg">Data Contribution</h2>
      <div v-if="tokenValid" class="px-5 text-left text-sm">
        <div class="grid grid-cols-4">
          <p class="object-center col-span-3">👤 {{ githubUser.login }}</p>
          <button
            @click="forgetToken()"
            class="
              min-h-4
              bg-blue-500
              hover:bg-blue-400
              rounded-lg
              shadow-lg
              text-white
              p-1
            "
          >
            Forget token
          </button>
        </div>

        <h3 class="bg-opacity-80 bg-blue-100 mb-5 text-base text-center mt-5">
          Report Reuse
        </h3>
        <input
          type="text"
          placeholder="DOI (e.g. 10.1145/3368089.3409767)"
          class="w-full mt-3 mb-3 p-2"
          v-model="reuse.sourceDoi"
        />

        <div v-if="sourceWork.dOI">
          <p>
            <a
              :href="`https://doi.org/${sourceWork.dOI}`"
              class="text-blue-500"
              >{{ sourceWork.title.join("") }}</a
            >
          </p>
          <p>
            by
            {{
              sourceWork.author.map((a) => `${a.given} ${a.family}`).join(", ")
            }}
          </p>

          <ag-grid-vue
            style=""
            class="ag-theme-alpine"
            :columnDefs="columnDefs"
            :rowData="rowData"
            :animateRows="true"
            :defaultColDef="defaultColDef"
            :enableCellTextSelection="true"
          >
          </ag-grid-vue>

          <div class="grid grid-cols-2 gap-4">
            <button
              @click="startRequest()"
              class="
                min-h-8
                w-full
                bg-blue-500
                hover:bg-blue-400
                rounded-lg
                shadow-lg
                text-white
                p-1
              "
            >
              Start contribution request
            </button>

            <button
              class="
                h-8
                bg-blue-500
                hover:bg-blue-400
                rounded-lg
                shadow-lg
                text-white
              "
              @click="hideDialog()"
            >
              Cancel
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4" v-else>
          <div></div>
          <button
            class="
              h-8
              bg-blue-500
              hover:bg-blue-400
              rounded-lg
              shadow-lg
              text-white
            "
            @click="hideDialog()"
          >
            Cancel
          </button>
        </div>
      </div>
      <div v-else class="px-5 text-left text-sm">
        <p>
          Our review process is maintained through GitHub issues. To contribute
          data, we need a valid GitHub token from you in order to create issues
          for your contribution requests. We store the token in the local
          storage of your browser. It will never leave your machine other than
          to make requests to GitHub for data contributions for our project.
        </p>

        <p class="mt-2">
          You can create such a personal access token at
          <a href="https://github.com/settings/tokens" class="text-blue-500"
            >https://github.com/settings/tokens</a
          >. Please set the following permissions:
          <span class="font-mono">public_repo</span>
        </p>

        <p class="mt-2">
          As tokens can have an expiry date you may see this dialog when your
          token is not valid anymore. In this case, please update it with a new
          token.
        </p>

        <p class="mt-2">
          We will use your token to create issues in our own repository
          <a class="text-blue-500" :href="`https://github.com/${owner}/${repo}`"
            >{{ owner }}/{{ repo }}</a
          >
          directly from your browser.
        </p>

        <input
          type="text"
          name=""
          id=""
          class="w-full mt-3 mb-3 p-2"
          placeholder="GitHub token goes here"
          v-model="token"
        />

        <div class="grid grid-cols-2 gap-4">
          <button
            class="min-h-8 rounded-lg shadow-lg text-white"
            @click="storeToken()"
            :class="
              token && token != ''
                ? 'bg-blue-500 hover:bg-blue-400'
                : 'bg-gray-500 hover:bg-gray-500'
            "
            :disabled="!token || token == ''"
          >
            Check Token
          </button>
          <button
            class="
              h-8
              bg-blue-500
              hover:bg-blue-400
              rounded-lg
              shadow-lg
              text-white
            "
            @click="hideDialog()"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, onBeforeMount, Ref, ref, watch } from "vue";
import { Octokit } from "@octokit/rest";
import { Work } from "@/clients/crossref";
import { CachedWorksApi } from "@/tools/CachedWorksApi";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { AgGridVue } from "ag-grid-vue3";

interface Reuse {
  sourceDoi?: string;
}

export default defineComponent({
  components: { AgGridVue },
  setup() {
    const owner = "bhermann";
    const repo = "playground";
    const label = "data collection";

    const isLoading = ref(false);
    const tokenValid = ref(false);
    const token = ref("");
    const githubUser = ref({}) as Ref<{ login?: string }>;
    const reuse = ref({}) as Ref<Reuse>;

    const sourceWork = ref({} as Work);

    const hideDialogCandidate = inject("hideDialog");

    const hideDialog = () => {
      if (hideDialogCandidate) (hideDialogCandidate as () => void)();
    };

    const columnDefs = [
      { headerName: "Column A", field: "a" },
      { headerName: "Column B", field: "b", type: "rightAligned" },
      { headerName: "Column C", field: "c", type: "numericColumn" },
    ];

    const defaultColDef = {
      sortable: true,
      sortingOrder: ["asc", "desc"],
      filterParams: {
        buttons: ["reset"],
        debounceMs: 300,
      },
      wrapText: true,
      autoHeight: true,
    };

    const rowData = [
      { a: "test", b: "test2", c: "test3" },
      { a: "test", b: "test2", c: "test3" },
      { a: "test", b: "test2", c: "test3" },
    ];

    const storeToken = async () => {
      tokenValid.value = await checkToken();
      localStorage.setItem("github_token", token.value);
      if (tokenValid.value) {
        await loadGitHubContent();
      }
    };

    const loadToken = () => {
      const candidate = localStorage.getItem("github_token");
      if (candidate && candidate != "") token.value = candidate;
    };

    const forgetToken = () => {
      token.value = "";
      tokenValid.value = false;
      storeToken();
    };

    const checkToken = async () => {
      const gh = new Octokit({
        auth: token.value,
      });

      const valid = await gh.rest.users
        .getAuthenticated()
        .then((result) => {
          githubUser.value = result.data;
          return true;
        })
        .catch((e) => {
          console.log(e);
          return false;
        });
      return valid;
    };

    const loadGitHubContent = async () => {
      const gh = new Octokit({
        auth: token.value,
      });

      console.log(
        (
          await gh.rest.issues.listForRepo({
            owner: owner,
            repo: repo,
            creator: githubUser.value.login,
            labels: label,
          })
        ).data
      );
    };

    const startRequest = () => {
      const gh = new Octokit({
        auth: token.value,
      });

      const body = `Reporting reuse in the following paper: 
${sourceWork.value.title.join(" ")}
by ${sourceWork.value.author.map((a) => `${a.given} ${a.family}`).join(", ")}
DOI: [${sourceWork.value.dOI}](https://doi.org/${sourceWork.value.dOI})
        
Reuse of     | Type  |   Source Reference | Comment  |
| ---      | ---       | ---       | ---       |
| One |   Methodology   |  3 | |
| Two  | Dataset   | 14 | | 

\`\`\`
sourceDOI,reusedDOI,type,comment,sourceReference,alternativeID,sourceReferenceDetail,contributor
\`\`\`
This issue has been created using the [Department of Reuse website](https://reuse-dept.org).`;

      gh.rest.issues.create({
        owner: owner,
        repo: repo,
        title: `[Reuse in] ${sourceWork.value.title.join(" ")}`,
        body: body,
        labels: [label],
      });

      reuse.value = {};
      sourceWork.value = {} as Work;
    };

    onBeforeMount(async () => {
      isLoading.value = true;
      loadToken();
      tokenValid.value = await checkToken();

      if (tokenValid.value) await loadGitHubContent();

      isLoading.value = false;
    });

    var sourceDoiRequested = false;
    const worksApi = new CachedWorksApi();

    watch(
      () => reuse.value.sourceDoi,
      (newValue) => {
        if (newValue && newValue != "" && !sourceDoiRequested) {
          sourceDoiRequested = true;
          const req = new Promise(() =>
            setTimeout(async () => {
              const response = await worksApi
                .worksDoiGetInteral({ doi: newValue }, true)
                .catch((e) => console.warn(e));
              sourceDoiRequested = false;
              if (response) sourceWork.value = response.message;
            }, 1200)
          );
          req.then(() => console.log("request completed"));
        }
      }
    );

    return {
      tokenValid,
      token,
      isLoading,
      githubUser,
      reuse,
      sourceWork,
      columnDefs,
      defaultColDef,
      rowData,
      owner,
      repo,
      storeToken,
      checkToken,
      forgetToken,
      startRequest,
      hideDialog,
    };
  },
});
</script>
