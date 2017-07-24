<template>
  <el-dialog :title="title | t" :visible="showEditor"
    :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <el-form :model="form" label-width="120px">
      <el-form-item :label="'userID' | t">
        <el-input v-model="form.userID"></el-input>
      </el-form-item>
      <el-form-item :label="'userName' | t">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item :label="'userStatus' | t">
        <el-select v-model="form.userStatus">
          <el-option v-for="option in mainStatusOptions" :key="'userStatus' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'roleID' | t">
        <el-select v-model="form.roleID">
          <el-option v-for="option in roleOptions" :key="'role' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'remark' | t">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="handleSubmit" type="primary">{{ 'btnConfirm' | t }}</el-button>
    <el-button @click="handleCancel">{{ 'btnCancel' | t }}</el-button>
  </el-dialog>
</template>

<script>
import { create, update } from 'apis'
import { listEditorMixin,
  processingHelper, successHelper, failedHelper,
} from 'containers/func/listHelper'

export default {
  name: 'MainEditor',
  mixins: [listEditorMixin],
  computed: {
    roleOptions: function() {
      return this.caller.roleOptions
    },
  },
  methods: {
    handleSubmit: function() {
      var self = this, params = self.params, editingData = self.form,
        callee = self.isAdding ? create : update

      processingHelper(params)

      callee(API_HOST + '/' + self.caller.schema.resource.resourceName, editingData).then((result) => {
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
