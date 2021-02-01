<template>
  <span class="doi" v-if="work != null">
    {{ work.message.title[0] }}
  </span>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Doi',
  props: {
    identifier: String
  },
  data() {
    return {
      work: null
    }
  },
  mounted () {
    axios.request({
      method: 'get',
      url: 'https://api.crossref.org/works/' + this.identifier
    }).then(response => (this.work = response.data ))
  }
}
</script>

<style>

</style>
