<template>
  <div class="list-page">
    <el-row>
      <el-col :span="6">{{ 'chargeFeeConfigManage' | t }}</el-col>
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
import { toLocalDate } from 'utils/date'
import { resources, getAllOptions } from 'apis'
import { listMixin, initSchema } from 'containers/func/listHelper'
import MainEditor from './MainEditor'

var main = resources.chargeFeeConfig,
  grade = resources.grade, product = resources.product, orderType = resources.orderType

export default {
  name: 'ChargeFeeConfig',
  mixins: [listMixin],
  components: {
    MainEditor
  },
  data() {
    return {
      gradeOptions: [],
      productOptions: [],
      orderTypeOptions: [],
    }
  },
  created() {
    var self = this

    getAllOptions(grade, true, true).then((options) => {
      self.gradeOptions = options
    }).catch(self.callError)

    getAllOptions(product, true, true).then((options) => {
      self.productOptions = options
    }).catch(self.callError)

    getAllOptions(orderType, true, true).then((options) => {
      self.orderTypeOptions = options
    }).catch(self.callError)
  },
  computed: {
    schema: function () {
      return initSchema({
        resource: main,
        columns: {
          id: {
            getter: get('id'), sortRank: 1,
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

<<style lang="scss" scoped>
.list-page > .el-row {
  margin: 1vh 1vw;
}
</style>
