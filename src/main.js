// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import WebFont from 'webfontloader'
import {syncFirebaseToStore} from './services/fire'
import {startListenClipboardTrigger} from './services/clipboard'
import { sync } from 'vuex-router-sync'
import './styles/grid.scss'
import './styles/main.scss'

sync(store, router)
Vue.config.productionTip = false

syncFirebaseToStore()
startListenClipboardTrigger()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

WebFont.load({
  google: {
    families: ['Roboto+Mono:400,500,700']
  }
})

if (('serviceWorker' in navigator) && (process.env.NODE_ENV === 'production')) {
  navigator.serviceWorker
           .register('/service-worker.js')
           .then((reg) => {
             console.log('Service Worker Registered, Scoped is: ' + reg.scope)
           })
}
