<template>
    <span class="person" v-if="person != null">
      {{ person.name['given-names'].value }} {{ person.name['family-name'].value }}
    </span>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Person',
  props: {
    orcid: String
  },
  data() {
    return {
      person: null
    }
  },
  mounted () {
    axios.request({
      method: 'get',
      url: 'https://pub.orcid.org/v3.0/' + this.orcid + '/personal-details',
      headers: {'Accept': 'application/json'}
    }).then(response => (this.person = response.data))
  }
}
</script>
<style>

</style>
