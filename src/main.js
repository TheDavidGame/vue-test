// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'

Vue.use(store)
Vue.use(vuetify)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  vuetify,
  components: { App },
  template: '<App/>'
})

