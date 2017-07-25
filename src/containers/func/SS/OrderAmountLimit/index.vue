<template>
  <div class="list-page">
    <el-row>
      <el-col :span="6">{{ 'orderAmountLimitManage' | t }}</el-col>
    </el-row>
    <ListTable :list="list" :schema="schema" :listHeight="listHeight" :operation="operation" :currentPage="currentPage" :pageSize="pageSize" :total="total" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange">
      <div slot="outsideOperations">
        <el-button @click="reloadList" :loading="waiting" type="primary" size="small">{{ 'search' | t}}</el-button>
        <el-button @click="onItemAdd()" size="small">{{ 'add' | t}}</el-button>
      </div>
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

var main = resources.orderAmountLimit, product = resources.product

export default {
  name: 'OrderAmountLimit',
  mixins: [listMixin],
  components: {
    MainEditor
  },
  data() {
    return {
      productOptions: [],
    }
  },
  created() {
    var self = this

    getAllOptions(product, true, true).then((options) => {
      self.productOptions = options
    }).catch(self.callError)
  },
  computed: {
    schema: function () {
      return initSchema({
        resource: main,
        columns: {
          id: {
            getter: get('id'), sortRank: 1,
            dataName: 'id', defaultData: 0
          },
          productID: {
            header: 'product', getter: get('productID'), sortRank: 1,
            listSetter: identity,
            dataName: 'productID', defaultData: 'BTC',
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
          title: 'remove', handler: self.onItemRemove, type: 'primary'
        },
      }
    },
  },
}
</script>

<style src="containers/func/list.scss" scoped></style>
