<template>
  <div class="list-page">
    <el-row>
      <el-col :span="6">{{ 'billboardManage' | t }}</el-col>
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
import { identity, get, toMark } from 'utils/common'
import { t } from 'utils/translater'
import { toLocalDate } from 'utils/date'
import { resources, getAllOptions, getOptionDescByValue } from 'apis'
import { listMixin, initSchema } from 'containers/func/listHelper'
import MainEditor from './MainEditor'

var main = resources.billboard, billboardType = resources.billboardType

export default {
  name: 'ChargeFeeConfig',
  mixins: [listMixin],
  components: {
    MainEditor
  },
  data() {
    return {
      billboardTypeOptions: [],
    }
  },
  created() {
    var self = this

    getAllOptions(billboardType, true, true).then((options) => {
      self.billboardTypeOptions = options
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
            dataName: 'id', defaultData: '',
          },
          billBoardType: {
            header: 'billBoardType', getter: get('billBoardType'), sortRank: 1,
            listSetter: (value) => (getOptionDescByValue(self.billboardTypeOptions, value)),
            dataName: 'billBoardType', defaultData: 'news',
          },
          beginDate: {
            header: 'beginDate', getter: get('beginDate'), sortRank: 1,
            listSetter: toLocalDate,
            dataName: 'beginDate', defaultData: new Date(),
          },
          endDate: {
            header: 'endDate', getter: get('endDate'), sortRank: 1,
            listSetter: toLocalDate,
            dataName: 'endDate', defaultData: new Date(),
          },
          isWEB: {
            header: 'isWEB', getter: get('isWEB'), sortRank: 1,
            listSetter: toMark,
            dataName: 'isWEB', defaultData: true,
          },
          isAPP: {
            header: 'isAPP', getter: get('isAPP'), sortRank: 1,
            listSetter: toMark,
            dataName: 'isAPP', defaultData: true,
          },
          isEmail: {
            header: 'isEmail', getter: get('isEmail'), sortRank: 1,
            listSetter: toMark,
            dataName: 'isEmail', defaultData: true,
          },
          isTextMessage: {
            header: 'isTextMessage', getter: get('isTextMessage'), sortRank: 1,
            listSetter: toMark,
            dataName: 'isTextMessage', defaultData: true,
          },
          subject: {
            header: 'subject', getter: get('subject'), sortRank: 1,
            listSetter: identity,
            dataName: 'subject', defaultData: '',
          },
          content: {
            getter: get('content'), sortRank: 1,
            dataName: 'content', defaultData: '',
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
