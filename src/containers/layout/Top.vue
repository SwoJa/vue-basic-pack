<template>
  <el-row type="flex" justify="end">
    <el-col :span="3">
      {{ 'welcomeManage' | t }}
      {{ userInfo.userName }}
      <el-button @click="handleLogout" type="primary" size="small">{{ 'logout' | t }}</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { logout } from 'apis/auth'
import { getUserInfo, setUserInfo, setUserMenu } from 'store'

export default {
  name: 'Top',
  computed: {
    userInfo: function () {
      return getUserInfo()
    }
  },
  methods: {
    handleLogout() {
      logout(this.userInfo).then(() => {
        setUserInfo({})
        setUserMenu({})
        
        this.$router.push('/login') //dependency with App.vue's login path
      })
    }
  },
}
</script>

<<style lang="scss" scoped>
.el-row {
  width: inherit;
}
</style>
