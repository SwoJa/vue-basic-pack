<template>
  <el-form :model="ruleForm" :rules="rules" :ref="ruleFormName">
    <el-form-item :label="'userName' | t" prop="userName">
      <el-input type="text" v-model="ruleForm.userName"></el-input>
    </el-form-item>
    <el-form-item :label="'password' | t" prop="password">
      <el-input type="password" v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormName)">{{ 'logIn' | t }}</el-button>
      <el-button @click="resetForm(ruleFormName)">{{ 'reset' | t }}</el-button>
    </el-form-item>
  </el-form>
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
    }
  },
  methods: {
    submitForm(name) {
      var self = this, userName = self.ruleForm.userName, password = self.ruleForm.password

      self.$refs[name].validate((valid) => {
        if (!valid) return self.$message.error(Vue.filter('t')('loginFail'));

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

          self.$router.push(PUBLIC_PATH + 'backend/' + getBaseRoute()); //dependency with App.vue's backend path and Menu.vue's backendRoot
        }).catch((error) => {
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
