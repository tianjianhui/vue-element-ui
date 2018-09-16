// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

axios.defaults.headers.common['token'] = ''
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
