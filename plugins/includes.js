// require('dotenv').config()
import Vue from 'vue'

import vuescroll from 'vue-scroll'
Vue.use(vuescroll, { debounce: 600 })

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  scope: 'profile email https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
 
import vueNotification from 'vue-notification'
Vue.use(vueNotification)

import VueKinesis from 'vue-kinesis'
Vue.use(VueKinesis)

import VueMask from 'v-mask'
Vue.use(VueMask)

import VueConfirmDialog from 'vue-confirm-dialog'
 
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

import VueCoreImageUpload from 'vue-core-image-upload' 
Vue.component('vue-core-image-upload', VueCoreImageUpload )

import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';
Vue.use(VueFilterDateFormat);