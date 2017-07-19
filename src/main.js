import Vue from 'vue'

import Router from 'vue-router'
import VueLocalStorage from 'vue-localstorage'
import ElementUI from 'element-ui'

import App from 'App'

Vue.use(Router)
Vue.use(VueLocalStorage)
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
