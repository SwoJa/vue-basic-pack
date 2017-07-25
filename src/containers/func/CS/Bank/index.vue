<template>
  <div class="list-page">
    <el-row>
      <el-col :span="6">{{ 'bankManage' | t }}</el-col>
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

var main = resources.bank, country = resources.country

export default {
  name: 'Bank',
  mixins: [listMixin],
  components: {
    MainEditor
  },
  data() {
    return {
      countryOptions: [],
    }
  },
  created() {
    var self = this

    getAllOptions(country, true, true).then((options) => {
      self.countryOptions = options
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
          bankName: {
            header: 'bankName', getter: get('bankName'), sortRank: 1,
            listSetter: identity,
            dataName: 'bankName', defaultData: '',
          },
          countryID: {
            header: 'countryID', getter: get('countryID'), sortRank: 1,
            listSetter: identity,
            dataName: 'countryID', defaultData: 'CN',
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
