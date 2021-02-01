<template>
  <div class="doiFull">
    <div v-if="work != null">
      <p class="text-sm">{{ work.message.title[0] }}</p>
      <p class="text-xs">
        <span v-for="(author, index) in work.message.author" :key="index">
          {{ author.given }} {{ author.family }},
        </span>
      </p>
    </div>
    <div v-else>
      <p>Please click on a node or a link in order to view details here.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DoiFull',
  props: {
  },
  data() {
    return {
      identifier: null,
      work : null
    }
  },
  mounted () {
    this.updateRecord(this.identifier);
  },
  methods: {
    updateRecord(identifier) {
      this.identifier = identifier;
      if (this.identifier != null) {
        axios.request({
          method: 'get',
          url: 'https://api.crossref.org/works/' + this.identifier
        }).then(response => (this.work = response.data ));
      } else {
        this.work == null;
      }
    }
  }
}
</script>

<style>

</style>
