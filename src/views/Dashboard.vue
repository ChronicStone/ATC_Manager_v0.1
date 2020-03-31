<template>
  	<vx-card ref="filterCard" title="Dashboard" class="user-list-filters mb-8" collapseAction>
      To be build
    </vx-card>
</template>

<script>

import {VueAvatar, VueAvatarScale} from 'vue-avatar-editor-improved'
import Avatar from 'vue-avatar'
import axios from "axios";

export default {
  components: {
    VueAvatarScale,
    VueAvatar,
    Avatar
  },
  data() {
    return {
      file1:null,
      width:200,
      height:200,
      rotation: 0,
      scale: 1,
      borderRadius: 0,
      popupActive:false,
      popupActive2:false,
      name: "cyp",
      name2: "thao"
    }
  },
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push('/pages/login')
    }
  },
}
</script>


<style scoped>
[type="file"] {
  height: 0;
  overflow: hidden;
  width: 0;
}

[type="file"] + label {
  background: rgb(57, 151, 192);
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: 'Poppins', sans-serif;
  font-size: inherit;
  font-weight: 600;
  margin-bottom: 1rem;
  outline: none;
  padding: 1rem 50px;
  position: relative;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  vertical-align: middle;
}
[type="file"] + label:hover {
  background-color: #d3460d;
}
[type="file"] + label.btn-1 {
  background-color: rgb(57, 151, 192);
  box-shadow: 0 6px rgb(21, 83, 109);
  -webkit-transition: none;
  transition: none;
}
[type="file"] + label.btn-1:hover {
  box-shadow: 0 4px rgb(21, 83, 109);
  top: 2px;
}
</style>