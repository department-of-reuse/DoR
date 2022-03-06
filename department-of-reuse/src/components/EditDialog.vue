<template>
  <div class="fixed w-screen h-screen z-20 bg-black bg-opacity-60">
    <div
      class="
        w-1/2
        bg-gray-100
        mx-auto
        inset-x-0
        mt-5
        border-4 border-gray-100
        pb-5
        h-max
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
            title="Removes the stored GitHub access token from your browsers local storage."
          >
            Forget token
          </button>
        </div>

        <h3 class="bg-opacity-80 bg-blue-100 text-base text-center mt-3">
          Report Reuse
        </h3>

        <div
          class="
            w-full
            h-full
            bg-green-100
            text-xs text-green-800
            mt-2
            py-1
            px-2
          "
          v-if="submitSuccess"
        >
          ✅ Report submitted successfully.
          <a :href="lastIssueUrl" target="_blank" class="text-blue-500"
            >View issue.</a
          >
        </div>

        <p class="text-xs mt-3">
          Based on a publication identified by its
          <a href="https://www.doi.org/" target="_blank" class="text-blue-500"
            >DOI</a
          >
          you can report any reuse of research artifacts or results presented in
          the paper. When you enter the DOI below details for this publication
          will be retrieved.
        </p>

        <input
          type="text"
          placeholder="DOI (e.g. 10.1145/3368089.3409767)"
          class="w-full mt-3 mb-3 p-2"
          v-model="reuse.sourceDoi"
        />

        <p v-if="loadingPublication" class="bg-blue-300 text-blue-900 p-3 mb-3">
          Loading publication details...
        </p>
        <p v-if="invalidDOI" class="bg-yellow-300 text-yellow-900 p-3 mb-3">
          Invalid DOI used.
        </p>

        <div v-if="sourceWork.dOI">
          <p>
            <a
              :href="`https://doi.org/${sourceWork.dOI}`"
              target="_blank"
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

          <button
            @click="addRow"
            class="
              h-8
              min-w-8
              p-2
              bg-blue-500
              hover:bg-blue-400
              rounded-lg
              shadow-lg
              text-white
              mt-1
            "
          >
            Add row
          </button>

          <ag-grid-vue
            class="ag-theme-balham w-full h-64 mt-2 font-serif"
            :columnDefs="columnDefs"
            :rowData="reuse.reuse"
            :animateRows="true"
            :defaultColDef="defaultColDef"
            :enableCellTextSelection="true"
            @grid-ready="onGridReady"
            @cell-value-changed="onCellValueChanged"
            :tooltipShowDelay="500"
          >
          </ag-grid-vue>

          <div class="grid grid-cols-2 gap-4 mt-2">
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
          <a
            href="https://github.com/settings/tokens"
            class="text-blue-500"
            target="_blank"
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
          <a
            class="text-blue-500"
            :href="`https://github.com/${owner}/${repo}`"
            target="_blank"
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

        <p v-if="invalidToken" class="mb-3 bg-yellow-300 text-yellow-900 p-3">
          The token is not valid (currently).
        </p>

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
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import { AgGridVue } from "ag-grid-vue3";

import { $enum } from "ts-enum-util";
import { ReuseType } from "../backend/models/Reuse";
import {
  CellClassParams,
  CellValueChangedEvent,
  GridApi,
  GridReadyEvent,
  RowNode,
} from "ag-grid-community";

interface Reuse {
  sourceDoi?: string;
  reuse: Array<SingleReuse>;
}

interface SingleReuse {
  reused: string;
  type: string;
  sourceRef: string;
  comment: string;
}

export default defineComponent({
  components: { AgGridVue },
  setup() {
    const owner = "bhermann";
    const repo = "DoR";
    const label = "data collection";

    const isLoading = ref(false);
    const tokenValid = ref(false);
    const invalidToken = ref(false);
    const loadingPublication = ref(false);
    const invalidDOI = ref(false);
    const submitSuccess = ref(false);
    const token = ref("");
    const lastIssueUrl = ref("");
    const githubUser = ref({}) as Ref<{ login?: string }>;
    const reuse = ref({ reuse: [] }) as Ref<Reuse>;

    const sourceWork = ref({} as Work);

    const hideDialogCandidate = inject("hideDialog");

    const hideDialog = () => {
      if (hideDialogCandidate) (hideDialogCandidate as () => void)();
    };

    const reuseTypes = $enum(ReuseType)
      .getEntries()
      .sort((a, b) => {
        if (a[1] < b[1]) return -1;
        else if (a[1] > b[1]) return 1;
        else return 0;
      });

    const columnDefs = [
      {
        headerName: "Reuse of",
        field: "reused",
        width: 120,
        editable: true,
        cellEditorPopup: false,
        headerTooltip: `Provide the identifier of the reused object. 
This can be a DOI (e.g. 10.1145/3368089.3409767), an arXiv id (e.g. arXiv:2108.06821), a GitHub repository (e.g. ${owner}/${repo}), or a URL.`,
        cellClassRules: {
          'bg-paper text-white': (params : CellClassParams) => { return classifyReuse(params.value) == ReuseClass.DOI; },
          'bg-arxiv  text-white': (params : CellClassParams) => { return classifyReuse(params.value) == ReuseClass.ARXIV; },
          'bg-github text-white': (params : CellClassParams) => { return classifyReuse(params.value) == ReuseClass.GITHUB; },
          'bg-website  text-white': (params : CellClassParams) => { return classifyReuse(params.value) == ReuseClass.WEBSITE; }
        }
      },
      {
        headerName: "Type",
        field: "type",
        width: 140,
        editable: true,
        cellEditor: "agPopupSelectCellEditor",
        cellEditorPopup: false,
        cellEditorParams: {
          cellHeight: 50,
          values: reuseTypes.map((r) => r[1]),
        },
        headerTooltip: "The type of reuse",
      },
      {
        headerName: "Ref",
        field: "sourceRef",
        width: 50,
        editable: true,
        cellEditorPopup: false,
        headerTooltip: "Reference in the paper reusing the object (optional)",
      },
      {
        headerName: "Comment",
        field: "comment",
        flex: 1,
        editable: true,
        cellEditorPopup: false,
        headerTooltip: "Additional information (optional)",
      },
    ];

    const defaultColDef = {
      wrapText: true,
      autoHeight: true,
    };

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
      invalidToken.value = false;
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
          invalidToken.value = true;
          return false;
        });
      return valid;
    };

    const loadGitHubContent = async () => {
      /*const gh = new Octokit({
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
      );*/
    };

    /* eslint-disable no-unused-vars */
    enum ReuseClass {
      INVALID,
      WEBSITE,
      DOI,
      GITHUB,
      ARXIV,
    }
    /* eslint-enable no-unused-vars */

    const sanitizeReuse = (reuse: string) => {
      return reuse
        .replace("https://doi.org/", "")
        .replace("https://dl.acm.org/doi/abs/", "")
        .replace("https://dl.acm.org/doi/pdf/", "")
        .replace("https://dl.acm.org/doi/", "")
        .replace("http://dx.doi.org/", "")
        .replace("https://dx.doi.org/", "")
        .trim();
    };

    const doiRegExp: RegExp = new RegExp(
      "(?:^" + '(10[.][0-9]{4,}(?:[.][0-9]+)*/(?:(?![%"#? ])\\S)+)' + "$)"
    );
    const githubRegExp = new RegExp("([w.@/-~]+)");
    const classifyReuse = (reuse: string) => {
      const reuseValue = sanitizeReuse(reuse);
      if (reuseValue.match(doiRegExp)) return ReuseClass.DOI;
      if (reuseValue.startsWith("arxiv:") || reuseValue.startsWith("arXiv:"))
        return ReuseClass.ARXIV;
      if (!reuseValue.startsWith("http://") && !reuseValue.startsWith("https://") && reuseValue.match(githubRegExp)) return ReuseClass.GITHUB;
      if (reuseValue.startsWith("http://") || reuseValue.startsWith("https://"))
        return ReuseClass.WEBSITE;
      return ReuseClass.INVALID;
    };

    const transformReuse = (reuse: string) => {
      const classification = classifyReuse(reuse);
      if (classification == ReuseClass.DOI)
        return `[${reuse}](https://doi.org/${reuse})`;
      if (classification == ReuseClass.GITHUB)
        return `[${reuse}](https://github.com/${reuse})`;
      if (classification == ReuseClass.ARXIV)
        return `[${reuse}](https://arxiv.org/abs/${reuse
          .replace("arxiv:", "")
          .replace("arXiv:", "")})`;
      if (classification == ReuseClass.WEBSITE) return `[${reuse}](${reuse})`;
      return reuse;
    };

    const startRequest = async () => {
      const gh = new Octokit({
        auth: token.value,
      });

      const tableRows = reuse.value.reuse
        .map(
          (r) =>
            `| ${transformReuse(r.reused)} | ${r.type} | ${r.sourceRef} | ${
              r.comment
            } |`
        )
        .join("\n");
      const csvRows = reuse.value.reuse
        .map((r) => {
          const classification = classifyReuse(r.reused);
          const sanized = sanitizeReuse(r.reused);
          return `${sourceWork.value.dOI},${
            classification == ReuseClass.DOI ? sanized : ""
          },${r.type},${r.comment},${r.sourceRef},${
            classification != ReuseClass.DOI ? sanized : ""
          },,${githubUser.value.login}`;
        })
        .join("\n");
      const body = `Reporting reuse in the following publication: 
${sourceWork.value.title.join(" ")}
by ${sourceWork.value.author.map((a) => `${a.given} ${a.family}`).join(", ")}
DOI: [${sourceWork.value.dOI}](https://doi.org/${sourceWork.value.dOI})
        
| Reuse of     | Type  |   Source Reference | Comment  |
| ---      | ---       | ---       | ---       |
${tableRows}

\`\`\`
sourceDOI,reusedDOI,type,comment,sourceReference,alternativeID,sourceReferenceDetail,contributor
${csvRows}
\`\`\`
This issue has been created using the [Department of Reuse website](https://www.reuse-dept.org).`;

      const result = await gh.rest.issues.create({
        owner: owner,
        repo: repo,
        title: `[Reuse in] ${sourceWork.value.title.join(" ")}`,
        body: body,
        labels: [label],
      });

      lastIssueUrl.value = result.data.html_url;

      submitSuccess.value = true;

      const req = new Promise(() =>
        setTimeout(async () => {
          submitSuccess.value = false;
        }, 10000)
      );
      req.then(() => console.log("Info box reset."));
      reuse.value = { reuse: [] };
      sourceWork.value = {} as Work;
    };

    var gridApi = {} as GridApi;

    const onGridReady = (params: GridReadyEvent) => {
      gridApi = params.api;
    };

    const addRow = () => {
      gridApi.applyTransaction({
        add: [{ reused: "", type: "", sourceRef: "", comment: "" }],
      });
    };

    const onCellValueChanged = (event: CellValueChangedEvent) => {
      if (!event) return;
      const data = [] as Array<SingleReuse>;
      gridApi.forEachNode((rowNode: RowNode, index: number) => {
        if (index >= 0) data.push(rowNode.data);
      });
      reuse.value.reuse = data;
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
          loadingPublication.value = true;
          invalidDOI.value = false;
          sourceWork.value = {} as Work;
          const req = new Promise(() =>
            setTimeout(async () => {
              const response = await worksApi
                .worksDoiGetInteral({ doi: newValue }, true)
                .catch((e) => {
                  invalidDOI.value = true;
                  console.warn(e);
                });
              sourceDoiRequested = false;
              loadingPublication.value = false;
              if (response) sourceWork.value = response.message;
            }, 1200)
          );
          req.then(() => console.log("request completed"));
        }
      }
    );

    return {
      tokenValid,
      invalidToken,
      invalidDOI,
      loadingPublication,
      token,
      isLoading,
      submitSuccess,
      githubUser,
      lastIssueUrl,
      reuse,
      sourceWork,
      columnDefs,
      defaultColDef,
      owner,
      repo,
      storeToken,
      checkToken,
      forgetToken,
      startRequest,
      hideDialog,
      addRow,
      onGridReady,
      onCellValueChanged,
    };
  },
});
</script>
