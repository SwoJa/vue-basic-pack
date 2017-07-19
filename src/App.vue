<template>
  <div id="app"><router-view></router-view></div>
</template>

<script>
import Router from 'vue-router'
import Desktop from 'components/Desktop'
import Backend from 'components/Backend'
import Login from 'containers/auth/Login'
import { getBackendRoutes } from 'containers/func'

export default {
  name: 'App',
  router: new Router({
    routes: [
      {
        path: '/', //dependency with Menu.vue's backendRoot
        name: 'Desktop',
        component: Desktop,
        children: [
          {
            path: 'login',
            name: 'Login',
            component: Login,
          },
          {
            path: 'backend', //dependency with Menu.vue's backendRoot
            name: 'Backend',
            component: Backend,
            children: getBackendRoutes()
          }
        ]
      },
    ]
  })
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
