<template>
  <div id="legend">
    <h2 class="text-base bg-opacity-80 bg-blue-200 mt-3">Legend <button class="float-right" v-on:click="open = !open">{{ open ? "🔼" : "🔽"  }}</button></h2>

    <table class="m-1 table-auto text-xs bg-opacity-40 bg-white w-full text-left" v-if="open">
      <tr>
        <td><div style="background-color: #77aaff; border-width: 2px; border-color: #444" class="w-4 h-4 rounded-full mx-auto"></div></td>
        <td>Inspected Paper</td>
      </tr>
      <tr>
        <td><div style="background-color: #77aaff" class="w-4 h-4 rounded-full mx-auto"></div></td>
        <td>Published Paper</td>
      </tr>
      <tr>
        <td><div style="background-color: #b31b1b" class="w-4 h-4 rounded-full mx-auto"></div></td>
        <td>arXiv preprint</td>
      </tr>      
      <tr>
        <td><div style="background-color: #238636" class="w-4 h-4 rounded-full mx-auto"></div></td>
        <td>GitHub repository</td>
      </tr>      
      <tr>
        <td><div style="background-color: #999" class="w-4 h-4 rounded-full mx-auto"></div></td>
        <td>Website</td>
      </tr>      
    </table>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const open = ref(true);

    return { open };
  },
});
</script>
