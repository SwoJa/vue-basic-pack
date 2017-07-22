<template>
  <el-dialog :title="title | t" :visible="showEditor"
    :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <el-form :model="form" label-width="120px">
      <el-form-item :label="'grade' | t">
        <el-select v-model="form.gradeID">
          <el-option v-for="option in gradeOptions" :key="'grade' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'discountType' | t">
        <el-select v-model="form.discountType">
          <el-option v-for="option in discountTypeOptions" :key="'discountType' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'status' | t">
        <el-select v-model="form.status">
          <el-option v-for="option in mainStatusOptions" :key="'status' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'dateRange' | t">
        <el-date-picker
          v-bind:value="[form.startDate, form.endDate]"
          v-on:input="updateRange"
          type="daterange">
        </el-date-picker>
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
    gradeOptions: function() {
      return this.caller.gradeOptions
    },
    discountTypeOptions: function() {
      return this.caller.discountTypeOptions
    },
  },
  methods: {
    updateRange: function(value) {
      this.form.startDate = value[0]
      this.form.endDate = value[1]
    }
  },
}
</script>
