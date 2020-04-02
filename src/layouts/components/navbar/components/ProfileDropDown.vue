<template>
  <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo.displayName">

    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ userData.fname + ' ' + userData.lname }}</p>
      <small><span :class="rankColor()">{{userData.acc_type}}</span></small>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

      <div class="con-img ml-3">
        <avatar size="40" :src="userData.test_taker_photo" :username="userData.fname+' '+userData.lname"></avatar>
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Profile</span>
          </li>

          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logOut()">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
  components: {
    Avatar
  },
  data() {
    return {
      userData:[]
    }
  },
  created() {
    this.userData = this.$session.getAll()
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    logOut() {
      this.$session.destroy()
      this.$router.push('/pages/login')
    },
    rankColor() {
      if(this.userData.acc_type === 'Session owner') return 'text-danger'
      if(this.userData.acc_type === 'Session manager') return 'text-warning'
      return 'primary'
    }
  }
}
</script>
