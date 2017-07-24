<template>
  <el-dialog :title="'modifyMenu' | t" :visible="showEditor"
    :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <el-form :model="form" label-width="120px">
      <el-form-item :label="'passwordType' | t">
        <el-radio class="radio" v-model="form.passwordType" label="login">{{ 'passwordType_login' | t }}</el-radio>
        <el-radio class="radio" v-model="form.passwordType" label="operation">{{ 'passwordType_operation' | t }}</el-radio>
      </el-form-item>
      <el-form-item :label="'newPassword' | t">
        <el-input type="password" v-model="form.newPassword"></el-input>
      </el-form-item>
      <el-form-item :label="'confirmPassword' | t">
        <el-input type="password" v-model="form.confirmPassword"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="handleSubmit" type="primary">{{ 'btnConfirm' | t }}</el-button>
    <el-button @click="handleCancel">{{ 'btnCancel' | t }}</el-button>
  </el-dialog>
</template>

<script>
import { updateForm } from 'apis'
import { t } from 'utils/translater'
import { listEditorMixin,
  processingHelper, successHelper, failedHelper,
} from 'containers/func/listHelper'

export default {
  name: 'MenuEditor',
  mixins: [listEditorMixin],
  methods: {
    handleSubmit: function() {
      var self = this, params = self.params, editingData = self.form

      if (editingData.newPassword !== editingData.confirmPassword) return this.$message.error(t('confirmPasswordError'));

      processingHelper(params)

      updateForm(API_HOST + '/BM/Admin/' + editingData.userID + '/' + (editingData.passwordType === 'login' ? 'password' : 'operatePassword') + '?tobeLoginPwd=' + editingData.newPassword, {}).then((result) => {
        successHelper(params)

        self.one = editingData

        self.handleCancel()
      }).catch((error) => {
        failedHelper(params)

        self.callback = error

        return false
      })      
    },
  },
}
</script>
