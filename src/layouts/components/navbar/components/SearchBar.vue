<template>
  <div class="flex">
dqdz     
  </div>
</template>

<script>
import VxAutoSuggest from '@/components/vx-auto-suggest/VxAutoSuggest.vue';

export default {
  components: {
    VxAutoSuggest
  },
  data() {
    return {
      navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
      showFullSearch: false,
    }
  },
  methods: {
    selected(item) {
      item.pages ?  this.$router.push(item.pages.url).catch(() => {}) : null
      this.showFullSearch = false;
    },
    hnd_search_query_update(query) {
      // Show overlay if any character is entered
      this.$store.commit('TOGGLE_CONTENT_OVERLAY', query ? true : false)
    }
  }
}

</script>
