<template>
  <el-form :model="ruleForm" :rules="rules" :ref="ruleFormName">
    <el-form-item label="名称" prop="userName">
      <el-input type="text" v-model="ruleForm.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormName)">提交</el-button>
      <el-button @click="resetForm(ruleFormName)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { login } from 'apis/auth'
import { setUserInfo } from 'store'

export default {
  data() {
    var validateUserName = (rule, value, callback) => {
      value === '' ? callback(new Error('请输入名称')) : callback()
    };
    var validatePassword = (rule, value, callback) => {
      value === '' ? callback(new Error('请输入密码')) : callback()
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
      var userName = this.ruleForm.userName, password = this.ruleForm.password;

      this.$refs[name].validate((valid) => {
        if (!valid) return this.$message.error('Validation Error'); //TODO: translation

        login(userName, password).then(function (result) {
          setUserInfo({
            userName: userName,
            token: result.access_token
          })
        }).catch((error) => {
          this.$message.error(error.message)
        })
      });
    },
    resetForm(name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
