<template>
  <div class="list-page">
    <el-row>
      <el-col :span="6">{{ 'roleManage' | t }}</el-col>
      <el-col :span="1" :offset="17">
        <el-button @click="onItemAdd()" size="small">{{ 'add' | t}}</el-button>
      </el-col>
    </el-row>
    <ListTable :list="list" :schema="schema" :listHeight="listHeight" :operation="operation" :currentPage="currentPage" :pageSize="pageSize" :total="total" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange">
    </ListTable>
    <MainEditor :showEditor="showEditor && metaData.showingModalName === mainEditorName" :initialData="getInitialData(getParams())" :params="getParams()"></MainEditor>
    <MenuEditor :showEditor="showEditor && metaData.showingModalName === menuEditorName" :initialData="getInitialData(getParams())" :params="getParams()"></MenuEditor>
  </div>
</template>

<script>
import R from 'ramda'
import { identity, get } from 'utils/common'
import { toLocal12Time } from 'utils/date'
import { t } from 'utils/translater'
import { resources, getAll, getAllOptions } from 'apis'
import { listMixin, initSchema, mainEditStart, getEditingData } from 'containers/func/listHelper'
import MainEditor from './MainEditor'
import MenuEditor from './MenuEditor'

var main = resources.role, menu = resources.menu, roleMenu = resources.roleMenu

var menuEditorName = 'MenuEditor'
var menuID2ArrayItem = R.compose(R.toString, R.prop('menuID'))

export default {
  name: 'Role',
  mixins: [listMixin],
  components: {
    MainEditor,
    MenuEditor
  },
  data() {
    return {
      menu: [],
      menuOptions: [],
    }
  },
  created() {
    var self = this

    getAllOptions(menu, false, true).then((options) => {
      self.menuOptions = options
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
          roleID: {
            getter: get('id'), sortRank: 1,
            dataName: 'roleID', defaultData: '',
          },
          roleName: {
            header: 'roleName', getter: get('roleName'), sortRank: 1,
            listSetter: identity,
            dataName: 'roleName', defaultData: '',
          },
          roleStatus: {
            header: 'roleStatus', getter: get('roleStatus'), sortRank: 1,
            listSetter: (value) => (t('mainStatus_' + value)),
            dataName: 'roleStatus', defaultData: 'Active',
          },
          modifyDate: {
            header: 'modifyDate', getter: get('modifyDate'), sortRank: 1,
            listSetter: (value) => (toLocal12Time(value)),
          },
          modifyID: {
            header: 'modifyID', getter: get('modifyID'),  sortRank: 1,
            listSetter: identity,
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
        modifyMenu: {
          title: 'modifyMenu', handler: self.onItemMenuModify, size: 3
        },
      }
    },
    menuEditorName: function() {
      return menuEditorName
    },
  },
  methods: {
    onItemMenuModify: function(index) {
      var self = this
      
      getAll(roleMenu, (self.list[index]).id).then((result) => {
        var initialData = getEditingData(self.schema, self.list[index])
        initialData.menu = R.map(menuID2ArrayItem, result) || []

        return mainEditStart(self.getParams(), initialData, {
          isAdding: false,
          showingModalName: menuEditorName,
        })
      })
    }
  }
}
</script>

<style src="containers/func/list.scss" scoped></style>
