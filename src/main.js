import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import ElementUI from 'element-ui'
import App from 'App'
import router from 'router'

Vue.use(VueLocalStorage)
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
