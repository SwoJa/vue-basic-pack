<template>
  <el-menu default-active="F001001" @open="handleOpen" @close="handleClose" @select="handleSelect" theme="dark">
    <el-submenu v-for="item in getBackendMenu()" :key="item.index" :index="item.index">
      <template slot="title">{{ item.title }}</template>
        <el-menu-item v-for="subItem in getBackendMenu(item.index)" :key="subItem.index" :index="subItem.index">{{ subItem.title }}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { getBackendMenu } from 'containers/func'

var backendRoot = '/backend' //dependency with App.vue's backend path

export default {
  name: 'Menu',
  computed: {
    path: function () {
      return this.$route.path
    }
  },
  methods: {
    getBackendMenu,
    handleOpen(key) {
      console.log(key);
    },
    handleClose(key) {
      console.log(key);
    },
    handleSelect(key, keyPath) {
      this.$router.push([backendRoot, keyPath.join('/')].join('/'));
    },
  }
}
</script>
