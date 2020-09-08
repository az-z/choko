// require('dotenv').config()
import Vue from 'vue'

import vuescroll from 'vue-scroll'
Vue.use(vuescroll, { debounce: 600 })

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
 
import vueNotification from 'vue-notification'
Vue.use(vueNotification)