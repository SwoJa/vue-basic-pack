<template>
  <el-dialog :title="title | t" :visible="showEditor"
    :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <el-form :model="form" label-width="120px">
      <el-form-item :label="'id' | t">
        <el-input v-model="form.id" :disabled="!isAdding"></el-input>
      </el-form-item>
      <el-form-item :label="'currencySymbo' | t">
        <el-input v-model="form.currencySymbo"></el-input>
      </el-form-item>
      <el-form-item :label="'description' | t">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item :label="'status' | t">
        <el-select v-model="form.status">
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
}
</script>
