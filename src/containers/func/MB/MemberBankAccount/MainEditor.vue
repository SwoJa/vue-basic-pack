<template>
  <el-dialog :title="title | t" :visible="showEditor"
    :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <el-form :model="form" label-width="120px">
      <el-form-item :label="'sysID' | t">
        <el-select v-model="form.sysID">
          <el-option v-for="option in memberOptions" :key="'member' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'accountNumber' | t">
        <el-input v-model="form.accountNo"></el-input>
      </el-form-item>
      <el-form-item :label="'accountName' | t">
        <el-input v-model="form.accountName"></el-input>
      </el-form-item>
      <el-form-item :label="'country' | t">
        <el-select v-model="form.countryID">
          <el-option v-for="option in countryOptions" :key="'country' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'bankId' | t">
        <el-select v-model="form.bankID">
          <el-option v-for="option in bankOptions" :key="'bank' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'branch' | t">
        <el-input v-model="form.branchName"></el-input>
      </el-form-item>
      <el-form-item :label="'swiftCode' | t">
        <el-input v-model="form.swiftCode"></el-input>
      </el-form-item>
      <el-form-item :label="'currency' | t">
        <el-select v-model="form.currencyID">
          <el-option v-for="option in currencyOptions" :key="'currency' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
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
import { toMark } from 'utils/common'

export default {
  name: 'MainEditor',
  mixins: [listEditorMixin],
  computed: {
    memberOptions: function() {
      return this.caller.memberOptions
    },
    countryOptions: function() {
      return this.caller.countryOptions
    },
    bankOptions: function() {
      return this.caller.bankOptions
    },
    currencyOptions: function() {
      return this.caller.currencyOptions
    },
  },
  methods: {
    toMark: toMark,
  },
}
</script>
