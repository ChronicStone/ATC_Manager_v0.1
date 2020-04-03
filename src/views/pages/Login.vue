<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">

          <div class="vx-row no-gutter justify-center items-center">

            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">

                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">ATC Manager</h4>
                  <p>Welcome back, please login to your account.</p>
                </div>
                <ValidationObserver ref="form">
                  <div class="pb-8">
                    <ValidationProvider name="username" :rules="{ required: true}" v-slot="{ errors }">
                      <vs-input
                          name="username"
                          icon-no-border
                          icon="icon icon-user"
                          icon-pack="feather"
                          label-placeholder="Username"
                          v-model="input.username"
                          class="w-full"/>
                      <vs-alert v-if="errors[0] != null" color="danger" icon-pack="feather" icon="icon-info" class="mt-2 p-0"> 
                        <span>{{ errors[0] }}</span>
                      </vs-alert>
                    </ValidationProvider>
                    
                    <ValidationProvider name="password" :rules="{ required: true}" v-slot="{ errors }">
                      <vs-input
                          type="password"
                          name="password"
                          icon-no-border
                          icon="icon icon-lock"
                          icon-pack="feather"
                          label-placeholder="Password"
                          v-model="input.password"
                          class="w-full mt-6" />
                      <vs-alert v-if="errors[0] != null" color="danger" icon-pack="feather" icon="icon-info" class="mt-2 p-0"> 
                        <span>{{ errors[0] }}</span>
                      </vs-alert>
                    </ValidationProvider>

                    <div class="flex flex-wrap justify-between my-5">
                        <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
                        <router-link to="">Forgot Password?</router-link>
                    </div>
                    <vs-button @click.prevent="checkLogin()" ref="loadableButton" id="button-with-loading" class="vs-con-loading__container float-right">Login</vs-button>
                  </div>
                </ValidationObserver>
                <vs-alert v-if="errLog.state === true" color="danger" icon-pack="feather" icon="icon-info" class="mt-6 p-0"> 
                  <span>{{ errLog.message }}</span>
                </vs-alert>
              </div>
            </div>
          </div>
        </div>
      </vx-card>

    </div>
  </div>
</template>

<script>

import axios from "axios"
import md5 from "md5"

export default{
  data() {
    return {
      input: {
        username: "",
        password: ""
      },
      checkbox_remember_me: false,
      backgroundLoading:'primary',
      colorLoading:'#fff',
      errLog: {"state" : false, "message" : ''}
    }
  },
  beforeCreate: function () {
        if(this.$session.exists()) {
            this.$router.push('../')
        }
  },
  methods: {
    checkLogin() {
      this.$refs.form.validate().then(success => {
        if (!success) {
            return;
        }
        this.openLoadingContained()
        if(this.input.username != "" && this.input.password != "") {
              axios.get('https://langaj.chronicstone.online/sessions/', {
                params: {
                    'request':1,
                    'username':this.input.username,
                }
            })
            .then(response =>this.loginLaunch(response.data.result))                         
            .catch((error) => {
                console.log(error);
            })
          }
      })
    },
    loginLaunch(result) {
        if(result.username != null && result.password != null) {
            if(this.input.username == result.username && md5(this.input.password) == result.password) {
                this.$session.start()
                // Setup user session data
                this.$session.set('user', result.username)
                this.$session.set('session_id', result.session_id)
                this.$session.set('account_id', result.id)
                this.$session.set('fname', result.first_name)
                this.$session.set('lname', result.last_name)
                this.$session.set('avatar', result.avatar)
                this.$session.set('acc_type', result.account_type)
                this.$session.set('acc_rank', result.account_rank)
                
                // Setup test center data
                this.$session.set('ATC_data', result.atc)
                this.$router.push('/');
            } 
            else {
                this.errLog.state = true
                this.errLog.message = "ERROR : The password  is incorrect."
            }
        } 
        else {
                this.errLog.state = true
                this.errLog.message = "ERROR : The username does not exist in database."                
            }
    },
    emptyErr() {
        this.errLog.state = false
        this.errLog.title = ""
        this.errLog.message = ""
    },
    openLoadingContained(){
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: "#button-with-loading",
        scale: 0.45
      })
      setTimeout( ()=> {
        this.$vs.loading.close("#button-with-loading > .con-vs-loading")
      }, 700);
    },
  }
}
</script>

<style lang="scss">
#page-login {
  .social-login-buttons {
    .bg-facebook { background-color: #1551b1 }
    .bg-twitter { background-color: #00aaff }
    .bg-google { background-color: #4285F4 }
    .bg-github { background-color: #333 }
  }
}
</style>
