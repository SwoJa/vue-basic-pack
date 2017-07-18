import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import LoginPage from 'containers/auth/LoginPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/auth',
      name: 'Login',
      component: LoginPage
    },
  ]
})
