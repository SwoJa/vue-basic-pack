<template>
  <div class="list-page">
    <el-row>
      <el-col :span="6">{{ 'orderAmountLimitManage' | t }}</el-col>
      <el-col :span="1" :offset="17">
        <el-button @click="onItemAdd()" size="small">{{ 'add' | t}}</el-button>
      </el-col>
    </el-row>
    <ListTable :list="list" :schema="schema" :listHeight="listHeight" :operation="operation" :currentPage="currentPage" :pageSize="pageSize" :total="total" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange">
    </ListTable>
    <MainEditor :showEditor="showEditor" :initialData="getInitialData(getParams())" :params="getParams()"></MainEditor>
  </div>
</template>

<script>
import { identity, get } from 'utils/common'
import { t } from 'utils/translater'
import { resources, getAllOptions } from 'apis'
import { listMixin, initSchema } from 'containers/func/listHelper'
import MainEditor from './MainEditor'

var main = resources.orderAmountLimit,
  country = resources.country, currency = resources.currency

export default {
  name: 'OrderAmountLimit',
  mixins: [listMixin],
  components: {
    MainEditor
  },
  data() {
    return {
      countryOptions: [],
      currencyOptions: [],
    }
  },
  created() {
    var self = this

    getAllOptions(country, true, true).then((options) => {
      self.countryOptions = options
    }).catch(self.callError)

    getAllOptions(currency, true, true).then((options) => {
      self.currencyOptions = options
    }).catch(self.callError)
  },
  computed: {
    schema: function () {
      return initSchema({
        resource: main,
        columns: {
          id: {
            getter: (value) => (value.countryID + ',' + value.currencyID), sortRank: 1,
          },
          countryID: {
            header: 'country', getter: get('countryID'), sortRank: 1,
            listSetter: identity,
            dataName: 'countryID', defaultData: 'CN',
          },
          currencyID: {
            header: 'currency', getter: get('currencyID'), sortRank: 1,
            listSetter: identity,
            dataName: 'currencyID', defaultData: 'RMB',
          },
          lowestBid: {
            header: 'lowestBid', getter: get('lowestBid'), sortRank: 1,
            listSetter: identity,
            dataName: 'lowestBid', defaultData: 0,
          },
          highestBid: {
            header: 'highestBid', getter: get('highestBid'), sortRank: 1,
            listSetter: identity,
            dataName: 'highestBid', defaultData: 0,
          },
          lowestUnitBidPercentage: {
            header: 'lowestUnitBidPercentage', getter: get('lowestUnitBidPercentage'), sortRank: 1,
            listSetter: identity,
            dataName: 'lowestUnitBidPercentage', defaultData: 0,
          },
          highestUnitBidPercentage: {
            header: 'highestUnitBidPercentage', getter: get('highestUnitBidPercentage'), sortRank: 1,
            listSetter: identity,
            dataName: 'highestUnitBidPercentage', defaultData: 0,
          },
          status: {
            header: 'status', getter: get('status'), sortRank: 1,
            listSetter: (value) => (t('mainStatus_' + value)),
            dataName: 'status', defaultData: 'Active',
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

<style src="containers/func/list.scss" scoped></style>
