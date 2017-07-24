<template>
  <el-dialog :title="title | t" :visible="showEditor"
    :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <el-form :model="form" label-width="120px">
      <el-form-item :label="'sysID' | t">
        <el-input v-model="form.sysID" :disabled="!isAdding"></el-input>
      </el-form-item>
      <el-form-item :label="'userName' | t">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item :label="'loginAccount' | t">
        <el-select v-model="form.loginAccount">
          <el-option v-for="option in userOptions" :key="'loginAccount' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'validateType' | t">
        <el-select v-model="form.validateType">
          <el-option :label="'validateType_1' | t" :value="1"></el-option>
          <el-option :label="'validateType_2' | t" :value="2"></el-option>
          <el-option :label="'validateType_3' | t" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'mobile' | t">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item :label="'email' | t">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item :label="'media' | t">
        <el-input v-model="form.media"></el-input>
      </el-form-item>
      <el-form-item :label="'birthday' | t">
        <el-date-picker v-model="form.birthday" type="date"></el-date-picker>
      </el-form-item>
      <el-form-item :label="'registerDate' | t">
        <el-date-picker v-model="form.registerDate" type="date"></el-date-picker>
      </el-form-item>
      <el-form-item :label="'grade' | t">
        <el-select v-model="form.gradeID">
          <el-option v-for="option in gradeOptions" :key="'grade' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'country' | t">
        <el-select v-model="form.countryID">
          <el-option v-for="option in countryOptions" :key="'country' + option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'idVerifyStatus' | t">
        <el-select v-model="form.idVerifyStatus">
          <el-option :label="'idVerifyStatus_0' | t" :value="0"></el-option>
          <el-option :label="'idVerifyStatus_10' | t" :value="10"></el-option>
          <el-option :label="'idVerifyStatus_20' | t" :value="20"></el-option>
          <el-option :label="'idVerifyStatus_21' | t" :value="21"></el-option>
          <el-option :label="'idVerifyStatus_30' | t" :value="30"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="'memberIsLock' | t">
        <el-switch :on-text="toMark(true)" :off-text="toMark(false)" v-model="form.memberIsLock"></el-switch>
      </el-form-item>
      <el-form-item :label="'nation' | t">
        <el-select v-model="form.nationID">
          <el-option v-for="option in nationOptions" :key="'nation' + option.id" :label="option.text" :value="option.value"></el-option>
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
import { toMark } from 'utils/common'

export default {
  name: 'MainEditor',
  mixins: [listEditorMixin],
  computed: {
    userOptions: function() {
      return this.caller.userOptions
    },
    gradeOptions: function() {
      return this.caller.gradeOptions
    },
    countryOptions: function() {
      return this.caller.countryOptions
    },
    nationOptions: function() {
      return this.caller.nationOptions
    },
  },
  methods: {
    toMark: toMark,
  },
}
</script>
