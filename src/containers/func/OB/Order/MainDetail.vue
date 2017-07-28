<template>
  <el-dialog :title="'orderDetailList' | t" :visible="show" size="large"
    :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <div class="dialog-header-operation">
      <el-button @click="handleBack" size="small">{{ 'btnBack' | t }}</el-button>
    </div>
    <ListTable :list="list" :schema="schema" :listHeight="listHeight" :operation="operation" :currentPage="currentPage" :pageSize="pageSize" :total="total" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange">
    </ListTable>
  </el-dialog>
</template>

<script>
import R from 'ramda'
import { resources, getOptionDescByValue } from 'apis'
import { toLocal12Time } from 'utils/date'
import { identity, get } from 'utils/common'
import ListTable from 'components/ListTable'
import { initSchema, callerSelector } from 'containers/func/listHelper'

var main = resources.orderDetail

export default {
  name: 'MainDetail',
  components: {
    ListTable,
  },
  props: [ 'show', 'initialData', 'params', 'handleBack' ],
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
    }
  },
  computed: {
    caller: function() {
      return callerSelector(this.params)
    },
    memberOptions: function() {
      return this.caller.memberOptions
    },
    orderStatusOptions: function() {
      return this.caller.orderStatusOptions
    },
    schema: function() {
      var self = this

      return initSchema({
        resource: main,
        columns: {
          id: {
            getter: get('id'), sortRank: 1,
            dataName: 'id', defaultData: 0,
          },          
          orderID: {
            getter: get('orderID'), sortRank: 1,
            dataName: 'orderID', defaultData: '',
          },
          sysID: {
            header: 'userName', getter: get('sysID'), sortRank: 1,
            listSetter: (value) => (getOptionDescByValue(self.memberOptions, value)),
            dataName: 'sysID', defaultData: '',
          },
          orderDetailDate: {
            header: 'orderDetailDate', getter: get('orderDetailDate'), sortRank: 1,
            listSetter: toLocal12Time,
            dataName: 'orderDetailDate', defaultData: new Date(),
          },
          transAmount: {
            header: 'transAmount', getter: get('transAmount'), sortRank: 1,
            listSetter: identity,
            dataName: 'transAmount', defaultData: 0,
          },
          totalPayment: {
            header: 'totalPayment', getter: get('totalPayment'), sortRank: 1,
            listSetter: identity,
            dataName: 'totalPayment', defaultData: 0,
          },
          expiryDate: {
            header: 'expiryDate', getter: get('expiryDate'), sortRank: 1,
            listSetter: toLocal12Time,
            dataName: 'expiryDate', defaultData: new Date(),
          },
          orderDetailStatus: {
            header: 'orderDetailStatus', getter: get('orderDetailStatus'), sortRank: 1,
            listSetter: (value) => (getOptionDescByValue(self.orderStatusOptions, value)),
            dataName: 'orderDetailStatus', defaultData: '',
          },
          orderPrice: {
            header: 'orderPrice', getter: get('orderPrice'), sortRank: 1,
            listSetter: identity,
            dataName: 'orderPrice', defaultData: 0,
          },
          remark: {
            header: 'remark', getter: get('remark'), sortRank: 1,
            listSetter: identity,
            dataName: 'remark', defaultData: '',
          },
        },
      })
    },
    list: function() {
      var self = this, skipCount = self.pageSize * (self.currentPage - 1), takeCount = self.pageSize

      return self.initialData && self.initialData.details && R.take(takeCount, R.drop(skipCount, self.initialData.details)) || []
    },
    total: function() {
      return this.initialData && this.initialData.details && this.initialData.details.length || 0
    },
    listHeight: function() {
      return window && (window.innerHeight - 280) || 380
    },
    operation: function () {
      var self = this

      return {}
    },
  },
  methods: {
    handleSizeChange: function(newValue) {
      this.pageSize = newValue
    },
    handleCurrentChange: function(newValue) {
      this.currentPage = newValue
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
</style>
