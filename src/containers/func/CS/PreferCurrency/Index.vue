<template>
  <div class="list-page">
    <el-row>
      <el-col :span="6">{{ 'preferCurrencyManage' | t }}</el-col>
    </el-row>
    <ListTable :list="list" :schema="schema" :listHeight="listHeight" :operation="operation" :currentPage="currentPage" :pageSize="pageSize" :total="total" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange">
      <div slot="outside-buttons">
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

var main = resources.preferCurrency,
  member = resources.member, currency = resources.currency

export default {
  name: 'PreferCurrency',
  mixins: [listMixin],
  components: {
    MainEditor
  },
  data() {
    return {
      memberOptions: [],
      currencyOptions: [],
    }
  },
  created() {
    var self = this

    getAllOptions(member, true, true).then((options) => {
      self.memberOptions = options
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
            getter: get('id'), sortRank: 1,
            dataName: 'id', defaultData: 0,
          },
          sysID: {
            header: 'sysID', getter: get('sysID'), sortRank: 1,
            listSetter: identity,
            dataName: 'sysID', defaultData: '',
          },
          currencyID: {
            header: 'currencyID', getter: get('currencyID'),  sortRank: 1,
            listSetter: identity,
            dataName: 'currencyID', defaultData: 'RMB',
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
