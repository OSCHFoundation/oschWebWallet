// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios';
import VueClipboard from 'vue-clipboard2';
Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.horizonUrl = 'http://coast.myoschain.com'
Vue.prototype.horizonSecret = 'osch public network'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
