<template>
  <div class="list-page">
    <el-row>
      <el-col :span="6">{{ 'countryManage' | t }}</el-col>
    </el-row>
    <ListTable :list="list" :schema="schema" :listHeight="listHeight" :operation="operation" :currentPage="currentPage" :pageSize="pageSize" :total="total" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange">
      <div slot="outsideOperations" class="outside-conditions">
        <div class="outside-inputs"></div>
        <div class="outside-buttons">
          <el-button @click="reloadList" :loading="waiting" type="primary" size="small">{{ 'search' | t}}</el-button>
          <el-button @click="onItemAdd()" size="small">{{ 'add' | t}}</el-button>
        </div>
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

var main = resources.country, currency = resources.currency

export default {
  name: 'Country',
  mixins: [listMixin],
  components: {
    MainEditor
  },
  data() {
    return {
      currencyOptions: [],
    }
  },
  created() {
    var self = this

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
            header: 'id', getter: get('id'), sortRank: 1,
            listSetter: identity,
            dataName: 'id', defaultData: '',
          },
          countryCode: {
            header: 'countryCode', getter: get('countryCode'), sortRank: 1,
            listSetter: identity,
            dataName: 'countryCode', defaultData: '',
          },
          currencyID: {
            header: 'currencyID', getter: get('currencyID'), sortRank: 1,
            listSetter: identity,
            dataName: 'currencyID', defaultData: 'RMB',
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
      }
    },
  },
}
</script>

<style src="containers/func/list.scss" scoped></style>
