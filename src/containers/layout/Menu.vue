<template>
  <el-menu :default-active="getBaseIndex()" @select="handleSelect" theme="dark">
    <el-submenu v-for="item in getBackendMenu()" :key="item.index" :index="item.index">
      <template slot="title">{{ item.title | t }}</template>
        <el-menu-item v-for="subItem in getBackendMenu(item.index)" :key="subItem.index" :index="subItem.index">{{ subItem.title | t }}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { getBackendMenu, getBaseIndex } from 'containers/func'

var backendRoot = '/backend/' //dependency with App.vue's backend path and Login.vue's entry point

export default {
  name: 'Menu',
  computed: {
    path: function () {
      return this.$route.path
    }
  },
  methods: {
    getBackendMenu,
    getBaseIndex,
    handleSelect(key, keyPath) {
      this.$router.push(backendRoot + keyPath.join('/'));
    },
  }
}
</script>
