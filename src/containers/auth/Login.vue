<template>
  <div class="login-page">
    <el-card class="login-card">
      <div slot="header">
        <div class="header">{{ projectName }} Backend</div>
      </div>
      <el-form :model="ruleForm" :rules="rules" :ref="ruleFormName">
        <el-form-item :label="'userName' | t" prop="userName">
          <el-input type="text" v-model="ruleForm.userName" :autofocus="true" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="'password' | t" prop="password">
          <el-input type="password" v-model="ruleForm.password" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm(ruleFormName)" :loading="ruleForm.waiting" type="primary" size="small">{{ 'logIn' | t }}</el-button>
          <el-button @click="resetForm(ruleFormName)" size="small">{{ 'reset' | t }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { login } from 'apis/auth'
import { queryUserInfo, queryUserMenu } from 'apis/user'
import { setUserInfo, getUserInfo, setUserMenu } from 'store'
import { getBaseRoute } from 'containers/func'

export default {
  data() {
    var validateUserName = (rule, value, callback) => {
      value === '' ? callback(new Error(Vue.filter('t')('userNameEmptyError'))) : callback()
    };
    var validatePassword = (rule, value, callback) => {
      value === '' ? callback(new Error(Vue.filter('t')('passwordEmptyError'))) : callback()
    };

    return {
      ruleForm: {
        userName: '',
        password: '',
        waiting: false
      },
      rules: {
        userName: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
      }
    };
  },
  computed: {
    ruleFormName: function () {
      return 'ruleForm'
    },
    projectName: function () {
      return PROJECT_NAME
    },
  },
  methods: {
    submitForm(name) {
      var self = this, userName = self.ruleForm.userName, password = self.ruleForm.password

      self.$refs[name].validate((valid) => {
        if (!valid) return self.$message.error(Vue.filter('t')('loginFail'));

        self.ruleForm.waiting = true

        login(userName, password).then(function (result) {
          var user = {
            userName: userName,
            token: result.access_token
          }

          setUserInfo(user)

          return queryUserInfo(user)
        }).then(function (result) {
          var user = Object.assign(getUserInfo(), {
            roleID: result.roleID
          });

          setUserInfo(user)

          return queryUserMenu(user)
        }).then((menu) => {
          setUserMenu(menu)

          self.ruleForm.waiting = false

          self.$router.push(PUBLIC_PATH + 'admin/' + getBaseRoute()); //dependency with App.vue's admin path and Menu.vue's adminRoot
        }).catch((error) => {
          self.ruleForm.waiting = false

          self.$message.error(error.message)
        })
      });
    },
    resetForm(name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: #1F2D3D;
}

.login-card {
  margin: 20vh 30vw;

  background-color: #F9FAFC;

  .header {
    text-align: center;
  }
}
</style>
