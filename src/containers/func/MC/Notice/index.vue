<template>
  <div class="list-page">
    <el-row>
      <el-col :span="6">{{ 'noticeManage' | t }}</el-col>
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
import { identity, get, toMark } from 'utils/common'
import { t } from 'utils/translater'
import { toLocalDate } from 'utils/date'
import { resources, getAllOptions, getOptionDescByValue } from 'apis'
import { listMixin, initSchema } from 'containers/func/listHelper'
import MainEditor from './MainEditor'

var main = resources.notice, noticeType = resources.noticeType

export default {
  name: 'ChargeFeeConfig',
  mixins: [listMixin],
  components: {
    MainEditor
  },
  data() {
    return {
      noticeTypeOptions: [],
    }
  },
  created() {
    var self = this

    getAllOptions(noticeType, true, true).then((options) => {
      self.noticeTypeOptions = options
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
          noticeType: {
            header: 'noticeType', getter: get('noticeType'), sortRank: 1,
            listSetter: (value) => (getOptionDescByValue(self.noticeTypeOptions, value)),
            dataName: 'noticeType', defaultData: 'message',
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
          receiveList: {
            getter: get('receiveList'), sortRank: 1,
            dataName: 'receiveList', defaultData: '',
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
