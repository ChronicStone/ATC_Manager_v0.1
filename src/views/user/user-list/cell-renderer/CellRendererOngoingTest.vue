<template>
  <div v-if="mounted === true">
    <span v-if="userAssessments =='0'" class="text-warning"><i>No</i></span>
    <span v-else class="text-success"> Yes </span>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'CellRendererValue',
  data() {
    return {
      mounted:false,
    }
  },
  beforeMount() {
    axios.get('https://langaj.chronicstone.online/test-assessment/get/index.php?candidid=' + this.params.value + '&session_id=' + this.$session.get('session_id') + '&request=ongoing')
         .then(response => {
            this.userAssessments = response.data.result
            this.mounted = true
         })
  },
  computed: {}
}
</script>

<style scoped>
.txt-gray {
  color:rgb(107, 12, 12);
}
</style>