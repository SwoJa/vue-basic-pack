<template>
  <div class="list-page">
    <el-row>
      <el-col :span="6">{{ 'queryOrder' | t }}</el-col>
    </el-row>
    <ListTable :list="list" :schema="schema" :listHeight="listHeight" :operation="operation" :currentPage="currentPage" :pageSize="pageSize" :total="total" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange">
      <div slot="outside-inputs">
        <label>{{ 'userName' | t }}</label>
        <el-select v-model="sysID" filterable clearable size="small">
          <el-option v-for="option in memberOptions" :key="option.id" :label="option.text" :value="option.value"></el-option>
        </el-select>
      </div>
      <div slot="outside-buttons">
        <el-button @click="reloadList" :loading="waiting" type="primary" size="small">{{ 'search' | t }}</el-button>
      </div>
    </ListTable>
    <MainDetail :show="showMainDetail" :initialData="initialData" :params="getParams()" :handleBack="handleCloseMainDetail"></MainDetail>
    <MemberAsset :show="showMemberAsset" :initialData="initialData" :params="getParams()" :handleBack="handleCloseMemberAsset"></MemberAsset>
    <MemberBankAccount :show="showMemberBankAccount" :initialData="initialData" :params="getParams()" :handleBack="handleCloseMemberBankAccount"></MemberBankAccount>
  </div>
</template>

<script>
import { identity, get, toMark } from 'utils/common'
import { t } from 'utils/translater'
import { toLocal12Time } from 'utils/date'
import { resources, getAll, getAllOptions, getOptionDescByValue } from 'apis'
import { listMixin, initSchema, listMetaType } from 'containers/func/listHelper'
import MainDetail from './MainDetail'
import MemberAsset from './MemberAsset'
import MemberBankAccount from './MemberBankAccount'

var main = resources.order, orderDetail = resources.orderDetail,
  member = resources.member, orderType = resources.orderType, orderStatus = resources.orderStatus,
  memberAsset = resources.memberAsset, memberBankAccount = resources.memberBankAccount,
  bank = resources.bank, currency = resources.currency,
  product = resources.product, country = resources.country

export default {
  name: 'Order',
  mixins: [listMixin],
  components: {
    MainDetail, MemberAsset, MemberBankAccount,
  },
  data() {
    return {
      memberOptions: [],
      orderTypeOptions: [],
      orderStatusOptions: [],
      bankOptions: [],
      showMainDetail: false,
      showMemberAsset: false,
      showMemberBankAccount: false,
      sysID: '',
    }
  },
  created() {
    var self = this

    getAllOptions(member, true, true).then((options) => {
      self.memberOptions = options
    }).catch(self.callError)

    getAllOptions(orderType, true, true).then((options) => {
      self.orderTypeOptions = options
    }).catch(self.callError)

    getAllOptions(orderStatus, true, true).then((options) => {
      self.orderStatusOptions = options
    }).catch(self.callError)

    getAllOptions(bank, true, true).then((options) => {
      self.bankOptions = options
    }).catch(self.callError)
  },
  computed: {
    schema: function () {
      var self = this

      return initSchema({
        resource: main,
        columns: {
          id: {
            getter: get('id'), sortRank: 1,
            dataName: 'id', defaultData: 0,
          },
          sysID: {
            header: 'userName', getter: get('sysID'), sortRank: 1,
            listSetter: (value) => (getOptionDescByValue(self.memberOptions, value)),
            dataName: 'sysID', defaultData: '',
          },
          orderDate: {
            header: 'orderDateTime', getter: get('orderDate'), sortRank: 1,
            listSetter: toLocal12Time,
            dataName: 'orderDate', defaultData: new Date(),
          },
          orderType: {
            header: 'orderType', getter: get('orderType'), sortRank: 1,
            listSetter: (value) => (getOptionDescByValue(self.orderTypeOptions, value)),
            dataName: 'orderType', defaultData: 'sellout',
          },
          orderStatus: {
            header: 'orderStatus', getter: get('orderStatus'), sortRank: 1,
            listSetter: (value) => (getOptionDescByValue(self.orderStatusOptions, value)),
            dataName: 'orderStatus', defaultData: '',
          },
          payMethod: {
            getter: get('payMethod'), sortRank: 1,
            dataName: 'payMethod', defaultData: null,
          },
          totalAmount: {
            header: 'totalAmount', getter: get('totalAmount'), sortRank: 1,
            listSetter: identity,
            dataName: 'totalAmount', defaultData: 0,
          },
          limitTransAmount: {
            header: 'limitTransAmount', getter: get('limitTransAmount'), sortRank: 1,
            listSetter: identity,
            dataName: 'limitTransAmount', defaultData: 0,
          },
          remainingAmount: {
            header: 'remainingAmount', getter: get('remainingAmount'), sortRank: 1,
            listSetter: identity,
            dataName: 'remainingAmount', defaultData: 0,
          },
          unitPrice: {
            header: 'unitPrice', getter: get('unitPrice'), sortRank: 1,
            listSetter: identity, listExpnd: true,
            dataName: 'unitPrice', defaultData: 0,
          },
          front_End_Comm: {
            getter: get('front_End_Comm'), sortRank: 1,
            dataName: 'front_End_Comm', defaultData: null,
          },
          isTradeTimeLimited: {
            header: 'isTradeTimeLimited', getter: get('isTradeTimeLimited'), sortRank: 1,
            listSetter: toMark, listExpnd: true,
            dataName: 'isTradeTimeLimited', defaultData: false,
          },
          memberAssetID: {
            header: 'memberAsset', getter: get('memberAssetID'), sortRank: 1,
            listSetter: identity, listExpnd: true, metaData: { type: listMetaType.dialogLink, desc: 'detail', clickHandler: self.handleOpenMemberAssetDialog },
            dataName: 'memberAssetID', defaultData: null,
          },
          memberBankAccountID: {
            header: 'memberBankAccount', getter: get('memberBankAccountID'), sortRank: 1,
            listSetter: identity, listExpnd: true, metaData: { type: listMetaType.dialogLink, desc: 'detail', clickHandler: self.handleOpenMemberBankAccountDialog },
            dataName: 'memberBankAccountID', defaultData: null,
          },
          currencyID: {
            header: 'currency', getter: get('currencyID'), sortRank: 1,
            listSetter: identity, listExpnd: true,
            dataName: 'currencyID', defaultData: 'RMB',
          },
          productID: {
            header: 'product', getter: get('productID'), sortRank: 1,
            listSetter: identity, listExpnd: true,
            dataName: 'productID', defaultData: 'BTC',
          },
          countryID: {
            header: 'country', getter: get('countryID'), sortRank: 1,
            listSetter: identity, listExpnd: true,
            dataName: 'countryID', defaultData: 'CN',
          },
          manageFee: {
            header: 'manageFee', getter: get('manageFee'), sortRank: 1,
            listSetter: identity, listExpnd: true,
            dataName: 'manageFee', defaultData: 0,
          },
          chainFee: {
            header: 'chainFee', getter: get('chainFee'), sortRank: 1,
            listSetter: identity, listExpnd: true,
            dataName: 'chainFee', defaultData: 0,
          },
          allowTransWaitingTime: {
            header: 'allowTransWaitingTime', getter: get('allowTransWaitingTime'), sortRank: 1,
            listSetter: identity, listExpnd: true,
            dataName: 'allowTransWaitingTime', defaultData: 0,
          },
          allowGradeValue: {
            header: 'allowGradeValue', getter: get('allowGradeValue'), sortRank: 1,
            listSetter: identity, listExpnd: true,
            dataName: 'allowGradeValue', defaultData: 0,
          },
          remark: {
            header: 'remark', getter: get('remark'), sortRank: 1,
            listSetter: identity, listExpnd: true,
            dataName: 'remark', defaultData: '',
          },
        }
      })
    },
    operation: function () {
      var self = this

      return {
        modify: {
          title: 'queryOrderDetail', handler: self.handleQueryOrderDetail
        },
      }
    },
  },
  methods: {
    handleQueryOrderDetail: function(index) {
      var self = this
      
      getAll(orderDetail, null, { orderID: (self.list[index]).id }).then((result) => {
        self.showMainDetail = true
        self.initialData = Object.assign({}, self.list[index], { details : result })
      })
    },
    handleCloseMainDetail: function() {
      var self = this

      self.showMainDetail = false
      self.initialData = {}
    },
    handleCloseMemberAsset: function() {
      var self = this

      self.showMemberAsset = false
      self.initialData = {}
    },
    handleCloseMemberBankAccount: function() {
      var self = this

      self.showMemberBankAccount = false
      self.initialData = {}
    },
    handleOpenMemberAssetDialog: function(id) {
      var self = this

      getAll(memberAsset, id).then((result) => {
        self.showMemberAsset = true
        self.initialData = result
      })
    },
    handleOpenMemberBankAccountDialog: function(id) {
      var self = this

      getAll(memberBankAccount, id).then((result) => {
        self.showMemberBankAccount = true
        self.initialData = result
      })
    },
    updateCondition: function(newValue) {
      var self = this

      self.conditions.sysID = newValue
    }
  },
  watch: {
    sysID: function (newValue) {
      var self = this

      self.conditions = Object.assign({}, self.conditions, { sysID: newValue })
    },
  },
}
</script>

<style src="containers/func/list.scss" scoped></style>

