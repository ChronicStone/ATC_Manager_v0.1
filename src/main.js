/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)

// FontAwesome Import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faMars, faVenus, faMale, faFemale } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret, faMars, faVenus, faMale, faFemale) 
Vue.component('font-awesome-icon', FontAwesomeIcon)

// axios
import axios from "./axios.js"
Vue.prototype.$http = axios

// Vue Session
import VueSession from 'vue-session'
Vue.use(VueSession)

// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// Import Vue2Filters, library of custom for arrays, strings & other
import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)

//Import EmailJS
import emailjs from 'emailjs-com';
Vue.use(emailjs)

//Vue phone input
import VueTelInput from 'vue-tel-input'
Vue.use(VueTelInput)

// Vue-mask (to formate inputs for ex)
import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

// VeeValidate import
import { ValidationProvider, ValidationObserver } from 'vee-validate';
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

// Filters import
import './globalContent/filters.js';


// Feather font icon
require('./assets/css/iconfont.css')

// Custom CSS
import '@/assets/css/style.css'

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
