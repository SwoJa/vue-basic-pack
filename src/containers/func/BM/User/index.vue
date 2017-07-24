<template>
  <div class="list-page">
    <el-row>
      <el-col :span="6">{{ 'userManage' | t }}</el-col>
      <el-col :span="1" :offset="17">
        <el-button @click="onItemAdd()" size="small">{{ 'add' | t}}</el-button>
      </el-col>
    </el-row>
    <ListTable :list="list" :schema="schema" :listHeight="listHeight" :operation="operation" :currentPage="currentPage" :pageSize="pageSize" :total="total" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange">
    </ListTable>
    <MainEditor :showEditor="showEditor && metaData.showingModalName === mainEditorName" :initialData="getInitialData(getParams())" :params="getParams()"></MainEditor>
    <PasswordEditor :showEditor="showEditor && metaData.showingModalName === passwordEditorName" :initialData="getInitialData(getParams())" :params="getParams()"></PasswordEditor>
  </div>
</template>

<script>
import { identity, get } from 'utils/common'
import { toLocal12Time } from 'utils/date'
import { t } from 'utils/translater'
import { resources, getAllOptions } from 'apis'
import { listMixin, initSchema, mainEditStart, getEditingData } from 'containers/func/listHelper'
import MainEditor from './MainEditor'
import PasswordEditor from './PasswordEditor'

var main = resources.user, role = resources.role

var passwordEditorName = 'PasswordEditor'

export default {
  name: 'Role',
  mixins: [listMixin],
  components: {
    MainEditor,
    PasswordEditor
  },
  data() {
    return {
      menu: [],
      roleOptions: [],
    }
  },
  created() {
    var self = this

    getAllOptions(role, true, true).then((options) => {
      self.roleOptions = options
    }).catch(self.callError)
  },
  computed: {
    schema: function () {
      return initSchema({
        resource: main,
        columns: {
          userID: {
            header: 'userID', getter: get('userID'), sortRank: 1,
            listSetter: identity,
            dataName: 'userID', defaultData: '',
          },
          userName: {
            header: 'userName', getter: get('userName'), sortRank: 1,
            listSetter: identity,
            dataName: 'userName', defaultData: '',
          },
          userStatus: {
            header: 'userStatus', getter: get('userStatus'), sortRank: 1,
            listSetter: (value) => (t('mainStatus_' + value)),
            dataName: 'userStatus', defaultData: 'Active',
          },
          roleName: {
            header: 'roleName', getter: get('roleName'),  sortRank: 1,
            listSetter: identity,
          },
          modifyDate: {
            header: 'modifyDate', getter: get('modifyDate'), sortRank: 1,
            listSetter: (value) => (toLocal12Time(value)),
          },
          roleID: {
            getter: get('roleID'), sortRank: 1,
            dataName: 'roleID', defaultData: 'normal',
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
        modifyPassword: {
          title: 'modifyPassword', handler: self.onItemPasswordModify, size: 3
        },
      }
    },
    passwordEditorName: function() {
      return passwordEditorName
    },
  },
  methods: {
    onItemPasswordModify: function(index) {
      var self = this, initialData = self.list[index]

      initialData.passwordType = 'login'
      initialData.newPassword = ''
      initialData.confirmPassword = ''

      mainEditStart(self.getParams(), initialData, {
        isAdding: false,
        showingModalName: passwordEditorName,
      })
    }
  }
}
</script>

<style src="containers/func/list.scss" scoped></style>
