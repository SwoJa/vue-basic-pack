<template>
  <el-menu :default-active="getBaseIndex()" @select="handleSelect" theme="dark">
    <el-submenu v-for="item in getAdminMenu()" :key="item.index" :index="item.index">
      <template slot="title">{{ item.title | t }}</template>
        <el-menu-item v-for="subItem in getAdminMenu(item.index)" :key="subItem.index" :index="subItem.index">{{ subItem.title | t }}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { getAdminMenu, getBaseIndex } from 'containers/func'

var adminRoot = PUBLIC_PATH + 'admin/' //dependency with App.vue's admin path and Login.vue's entry point

export default {
  name: 'Menu',
  computed: {
    path: function () {
      return this.$route.path
    }
  },
  methods: {
    getAdminMenu,
    getBaseIndex,
    handleSelect(key, keyPath) {
      this.$router.push(adminRoot + keyPath.join('/'));
    },
  }
}
</script>
