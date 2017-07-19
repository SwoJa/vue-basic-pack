<template>
  <div id="app"><router-view></router-view></div>
</template>

<script>
import Router from 'vue-router'
import Desktop from 'components/Desktop'
import Backend from 'components/Backend'
import Login from 'containers/auth/Login'
import { getBackendRoutes } from 'containers/func'
import { getUserInfo } from 'store'

var router = new Router({
  routes: [
    {
      path: '/', //dependency with Menu.vue's backendRoot
      name: 'Desktop',
      component: Desktop,
      children: [
        {
          path: 'login', //dependency with Top.vue's login path
          name: 'Login',
          component: Login,
        },
        {
          path: 'backend', //dependency with Menu.vue's backendRoot and Login.vue's entry point
          name: 'Backend',
          component: Backend,
          children: getBackendRoutes(),
        },
      ]
    },
    {
      path: '*',
      name: 'Any',
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  var loginPath = '/login';

  if (to.path === loginPath) return next();

  var user = getUserInfo();
  if (!user || !user.userName || !user.token) return next(loginPath);

  next()
});

export default {
  name: 'App',
  router: router
}
</script>

<style lang="scss">
@import '~element-ui/lib/theme-default/index.css';

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
}
</style>
