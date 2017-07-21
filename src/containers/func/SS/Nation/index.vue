<template>
  <div>
    Nation
    <ListTable :list="list" :schema="schema" :operation="operation" :currentPage="currentPage" :pageSize="pageSize" :total="total" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange">
    </ListTable>
  </div>
</template>

<script>
import { identity, get, toMark } from 'utils/common'
import { t } from 'utils/translater'
import { toLocalDate } from 'utils/date'
import { resources } from 'apis'
import {
  listMixin, initSchema,
} from 'containers/func/listHelper'

var main = resources.chargeFeeConfig

export default {
  name: 'Nation',
  mixins: [listMixin],
  computed: {
    main: function () {
      return main
    },
    schema: function () {
      return initSchema({
        resource: main,
        columns: {
          id: {
            header: 'id', getter: get('id'), sortRank: 1, isItemId: true,
            listSetter: identity,
            dataName: 'id', defaultData: 0,
          },
          gradeID: {
            header: 'grade', getter: get('gradeID'), sortRank: 1,
            listSetter: identity,
            dataName: 'gradeID', defaultData: 'Copper',
          },
          productID: {
            header: 'product', getter: get('productID'), sortRank: 1,
            listSetter: identity,
            dataName: 'productID', defaultData: 'BTC',
          },
          orderType: {
            header: 'orderType', getter: get('orderType'), sortRank: 1,
            listSetter: (value) => (t('orderType_' + value)),
            dataName: 'orderType', defaultData: 'buyin',
          },
          manageFee: {
            header: 'manageFee', getter: get('manageFee'), sortRank: 1,
            listSetter: identity,
            dataName: 'manageFee', defaultData: 0,
          },
          chainFee: {
            header: 'chainFee', getter: get('chainFee'), sortRank: 1,
            listSetter: identity,
            dataName: 'chainFee', defaultData: 0,
          },
          status: {
            header: 'status', getter: get('status'), sortRank: 1,
            listSetter: (value) => (t('mainStatus_' + value)),
            dataName: 'status', defaultData: 'Active',
          },
          minManageFee: {
            header: 'minManageFee', getter: get('minManageFee'), sortRank: 1,
            listSetter: identity,
            dataName: 'minManageFee', defaultData: 0,
          },
          maxManageFee: {
            header: 'maxManageFee', getter: get('maxManageFee'), sortRank: 1,
            listSetter: identity,
            dataName: 'maxManageFee', defaultData: 0,
          },
          remark: {
            header: 'remark', getter: get('remark'), sortRank: 1,
            listSetter: identity,
            dataName: 'remark', defaultData: '',
          },
        }
      })
    },
    operation: function () {
      var self = this

      return {
        add: {
          title: 'add', handler: self.onItemAdd
        },
        modify: {
          title: 'modify', handler: self.onItemModify
        },
        remove: {
          title: 'remove', handler: self.onItemRemove
        },
      }
    },
  },
}
</script>
