<template>
  	<vx-card ref="filterCard" title="Dashboard" class="user-list-filters mb-8" collapseAction>
      To be build
      <vs-button @click.prevent="MailAssignTest()">Send mail</vs-button>
    </vx-card>
</template>

<script>

import {VueAvatar, VueAvatarScale} from 'vue-avatar-editor-improved'
import Avatar from 'vue-avatar'
import axios from "axios";
import emailjs from 'emailjs-com';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

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
      name2: "thao",
      mailTemplate: ''
    }
  },
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push('/pages/login')
    }
  },
  methods: {

      MailAssignTest() {
        axios.get("https://langaj.chronicstone.online/assets/emails/test_mail.html").then(response => {
          this.mailTemplate = response.data
          var templateParams = {
            "candidate_email": "benoitthao@gmail.com",
            "candidate_fname": "Benoit",
            "templatehtml": this.mailTemplate,
          };
          var service_id = "default_service";
          var template_id = "assign_test";
          var user_id = "user_g6iQmMyQ1Tl2VcSdVzJPY"
          emailjs.send(service_id , template_id, templateParams, user_id)
            .then((response) => {
              console.log('SUCCESS!', response.status, response.text);
            }, (err) => {
              console.log('FAILED...', err);
            });
          })
      
    }
  }
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