<template>
  <el-dialog :title="title | t" :visible="showEditor"
    :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <el-form :model="form" label-width="120px">
      <el-form-item :label="'description' | t">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item :label="'url' | t">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item :label="'parent' | t">
        <el-select v-model="form.parentID">
          <el-option v-for="option in menuOptions" :key="'parent' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'menuType' | t">
        <el-select v-model="form.menuType">
          <el-option :label="'menuType_1' | t" value="1"></el-option>
          <el-option :label="'menuType_2' | t" value="2"></el-option>
          <el-option :label="'menuType_3' | t" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'orderSerial' | t">
        <el-input-number v-model="form.orderSerial" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item :label="'menuStatus' | t">
        <el-select v-model="form.menuStatus">
          <el-option v-for="option in mainStatusOptions" :key="'status' + option.id" :label="option.text" :value="option.value"></el-option>
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
import { listEditorMixin } from 'containers/func/listHelper'

export default {
  name: 'MainEditor',
  mixins: [listEditorMixin],
  computed: {
    menuOptions: function() {
      return this.caller.menuOptions
    },
  },
}
</script>
