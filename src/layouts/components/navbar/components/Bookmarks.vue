<template>
  <div class="navbar-bookmarks flex items-center">
    <feather-icon icon="CommandIcon" class="mr-2" svgClasses="w-6 h-6" />
    <h3 class="display-1">{{atcDAta.ATC_name}}</h3>

    <!-- STARRED PAGES - FIRST 10 -->
  
  </div>
</template>

<script>

export default {
  props: {
    navbarColor: {
      type: String,
      default: "#fff",
    },
  },
  data() {
    return {
      userData: '',
      atcDAta:[]
    }
  },
  created() {
    this.userData = this.$session.getAll()
    this.atcDAta = this.$session.get('ATC_data')
  },
  computed:{
    
  },
  methods: {
  },
}

</script>
