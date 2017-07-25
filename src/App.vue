<template>
  <div id="app"><router-view></router-view></div>
</template>

<script>
import Router from 'vue-router'
import Desktop from 'components/Desktop'
import Admin from 'components/Admin'
import Login from 'containers/auth/Login'
import { getAdminRoutes, getBaseRoute } from 'containers/func'
import { getUserInfo } from 'store'

var router = new Router({
  routes: [
    {
      path: PUBLIC_PATH, //dependency with Menu.vue's adminRoot
      name: 'Desktop',
      component: Desktop,
      children: [
        {
          path: 'login', //dependency with Top.vue and listHelper login path
          name: 'Login',
          component: Login,
        },
        {
          path: 'admin', //dependency with Menu.vue's adminRoot and Login.vue's entry point
          name: 'Admin',
          component: Admin,
          children: getAdminRoutes(),
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
  var loginPath = PUBLIC_PATH + 'login', adminPath = PUBLIC_PATH + 'admin';

  if (to.path === loginPath) return next();

  var user = getUserInfo();
  if (!user || !user.userName || !user.token) return next(loginPath);

  if (to.path === PUBLIC_PATH) return next(adminPath + '/' + getBaseRoute())

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
</style>
