<template>
  <el-row type="flex" justify="end" align="middle">
    <el-col :span="2">
      {{ 'welcomeManage' | t }}
      {{ userInfo.userName }}
    </el-col>
    <el-col :span="3">
      <el-button @click="handleChangePassword" type="primary" size="small">{{ 'modifyPassword' | t }}</el-button>
      <el-button @click="handleLogout" :loading="waitingLogout" type="primary" size="small">{{ 'logout' | t }}</el-button>
    </el-col>
    <el-dialog :title="'modifyPassword' | t" :visible="showEditor"
      :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form :model="form" label-width="120px">
        <el-form-item :label="'passwordType' | t">
          <el-radio class="radio" v-model="form.passwordType" label="login">{{ 'passwordType_login' | t }}</el-radio>
          <el-radio class="radio" v-model="form.passwordType" label="operation">{{ 'passwordType_operation' | t }}</el-radio>
        </el-form-item>
        <el-form-item :label="'originPassword' | t">
          <el-input type="password" v-model="form.asisLoginPwd"></el-input>
        </el-form-item>
        <el-form-item :label="'newPassword' | t">
          <el-input type="password" v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item :label="'confirmPassword' | t">
          <el-input type="password" v-model="form.confirmPassword"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="handleSubmit" :loading="waitingSubmit" type="primary">{{ 'btnConfirm' | t }}</el-button>
      <el-button @click="handleCancel">{{ 'btnCancel' | t }}</el-button>
    </el-dialog>
  </el-row>
</template>

<script>
import { updateForm } from 'apis'
import { logout } from 'apis/auth'
import { t } from 'utils/translater'
import { getUserInfo, setUserInfo, setUserMenu } from 'store'

var defaultData = {
  passwordType: 'login',
  asisLoginPwd: '',
  newPassword: '',
  confirmPassword: '',
}

export default {
  name: 'Top',
  data() {
    return {
      form: Object.assign({}, defaultData),
      showEditor: false,
      waitingLogout: false,
      waitingSubmit: false,
    }
  },
  computed: {
    userInfo: function () {
      return getUserInfo()
    }
  },
  methods: {
    handleLogout() {
      var self = this

      self.waitingLogout = true

      logout(self.userInfo).then(() => {
        setUserInfo({})
        setUserMenu({})

        self.waitingLogout = false
        
        self.$router.push(PUBLIC_PATH + 'login') //dependency with App.vue's login path
      }).catch((error) => {
        self.waitingLogout = false

        self.$message.error(error.message)
      })
    },
    handleChangePassword() {
      this.showEditor = true
    },
    handleSubmit() {
      var self = this, editingData = self.form

      if (editingData.newPassword !== editingData.confirmPassword) return self.$message.error(t('confirmPasswordError'));

      self.waitingSubmit = true

      updateForm(API_HOST + '/BM/User/' + (editingData.passwordType === 'login' ? 'password' : 'operatePassword') + '?asisLoginPwd=' + editingData.asisLoginPwd + '&tobeLoginPwd=' + editingData.newPassword, {}).then((result) => {
        self.waitingSubmit = false

        self.handleCancel()
      }).catch((error) => {
        self.waitingSubmit = false

        self.$message.error(error.message)
      })      
    },
    handleCancel() {
      this.form = Object.assign({}, defaultData)
      this.showEditor = false
    },
  },
}
</script>

<<style lang="scss" scoped>
.el-row {
  width: inherit;
}
</style>
