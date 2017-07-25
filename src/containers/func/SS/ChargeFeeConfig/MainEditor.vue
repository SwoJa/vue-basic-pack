<template>
  <el-dialog :title="title | t" :visible="showEditor"
    :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <el-form :model="form" label-width="120px">
      <el-form-item :label="'grade' | t">
        <el-select v-model="form.gradeID">
          <el-option v-for="option in gradeOptions" :key="'grade' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'product' | t">
        <el-select v-model="form.productID">
          <el-option v-for="option in productOptions" :key="'product' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'orderType' | t">
        <el-select v-model="form.orderType">
          <el-option v-for="option in orderTypeOptions" :key="'orderType' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'manageFee' | t">
        <el-input-number v-model="form.manageFee" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item :label="'chainFee' | t">
        <el-input-number v-model="form.chainFee" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item :label="'status' | t">
        <el-select v-model="form.status">
          <el-option v-for="option in mainStatusOptions" :key="'status' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'minManageFee' | t">
        <el-input-number v-model="form.minManageFee" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item :label="'maxManageFee' | t">
        <el-input-number v-model="form.maxManageFee" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item :label="'remark' | t">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="handleSubmit" :loading="waiting" type="primary">{{ 'btnConfirm' | t }}</el-button>
    <el-button @click="handleCancel">{{ 'btnCancel' | t }}</el-button>
  </el-dialog>
</template>

<script>
import { listEditorMixin } from 'containers/func/listHelper'

export default {
  name: 'MainEditor',
  mixins: [listEditorMixin],
  computed: {
    gradeOptions: function() {
      return this.caller.gradeOptions
    },
    productOptions: function() {
      return this.caller.productOptions
    },
    orderTypeOptions: function() {
      return this.caller.orderTypeOptions
    },
  },
}
</script>
