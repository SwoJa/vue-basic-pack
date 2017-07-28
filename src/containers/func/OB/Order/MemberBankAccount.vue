<template>
  <el-dialog :title="'memberBankAccount' | t" :visible="show"
    :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <div class="dialog-header-operation">
      <el-button @click="handleBack" size="small">{{ 'btnBack' | t }}</el-button>
    </div>
    <el-form :model="initialData" label-width="120px">
      <el-form-item :label="'bankAccount' | t">
        <span> {{ initialData.accountNo }}</span>
      </el-form-item>
      <el-form-item :label="'accountName' | t">
        <span> {{ initialData.accountName }}</span>
      </el-form-item>
      <el-form-item :label="'country' | t">
        <span> {{ initialData.countryID }}</span>
      </el-form-item>
      <el-form-item :label="'bankId' | t">
        <span> {{ bankDesc }}</span>
      </el-form-item>
      <el-form-item :label="'branch' | t">
        <span> {{ initialData.branchName }}</span>
      </el-form-item>
      <el-form-item :label="'swiftCode' | t">
        <span> {{ initialData.swiftCode }}</span>
      </el-form-item>
      <el-form-item :label="'currency' | t">
        <span> {{ initialData.currencyID }}</span>
      </el-form-item>
      <el-form-item :label="'remark' | t">
        <span> {{ initialData.remark }}</span>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getOptionDescByValue } from 'apis'
import { callerSelector } from 'containers/func/listHelper'

export default {
  name: 'MemberBankAccount',
  props: [ 'show', 'initialData', 'params', 'handleBack' ],
  computed: {
    caller: function() {
      return callerSelector(this.params)
    },
    bankOptions: function() {
      return this.caller.bankOptions
    },
    bankDesc: function() {
      var self = this

      return getOptionDescByValue(self.bankOptions, self.initialData.bankID)
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-header-operation {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.el-form-item {
  margin: 0;
}
</style>
