<template>
  <el-dialog :title="title | t" :visible="showEditor"
    :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <el-form :model="form" label-width="120px">
      <el-form-item :label="'country' | t">
        <el-select v-model="form.countryID" :disabled="!isAdding">
          <el-option v-for="option in countryOptions" :key="'country' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'currencyID' | t">
        <el-select v-model="form.currencyID" :disabled="!isAdding">
          <el-option v-for="option in currencyOptions" :key="'currencyID' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'lowestBid' | t">
        <el-input-number v-model="form.lowestBid"></el-input-number>
      </el-form-item>
      <el-form-item :label="'highestBid' | t">
        <el-input-number v-model="form.highestBid"></el-input-number>
      </el-form-item>
      <el-form-item :label="'lowestUnitBidPercentage' | t">
        <el-input-number v-model="form.lowestUnitBidPercentage" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item :label="'highestUnitBidPercentage' | t">
        <el-input-number v-model="form.highestUnitBidPercentage" :min="0"></el-input-number>
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
  computed: {
    countryOptions: function() {
      return this.caller.countryOptions
    },
    currencyOptions: function() {
      return this.caller.currencyOptions
    },
  },
}
</script>
