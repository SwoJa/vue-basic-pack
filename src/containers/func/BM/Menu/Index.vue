<template>
  <div class="list-page">
    <el-row>
      <el-col :span="6">{{ 'menuManage' | t }}</el-col>
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
import { resources, getAllOptions, getOptionDescById } from 'apis'
import { listMixin, initSchema } from 'containers/func/listHelper'
import MainEditor from './MainEditor'

var main = resources.menu

export default {
  name: 'Menu',
  mixins: [listMixin],
  components: {
    MainEditor
  },
  data() {
    return {
      menuOptions: [],
    }
  },
  created() {
    var self = this

    getAllOptions(main, true, true).then((options) => {
      self.menuOptions = options
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
          description: {
            header: 'description', getter: get('description'), sortRank: 1,
            listSetter: t,
            dataName: 'description', defaultData: '',
          },
          url: {
            header: 'url', getter: get('url'), sortRank: 1,
            listSetter: identity,
            dataName: 'url', defaultData: '',
          },
          parentID: {
            header: 'parent', getter: get('parentID'), sortRank: 1,
            listSetter: (value) => (getOptionDescById(self.menuOptions, value)),
            dataName: 'url', defaultData: 0,
          },
          menuType: {
            header: 'menuType', getter: get('menuType'), sortRank: 1,
            listSetter: (value) => (t('menuType_' + value)),
            dataName: 'menuType', defaultData: 1,
          },
          orderSerial: {
            header: 'orderSerial', getter: get('orderSerial'), sortRank: 1,
            listSetter: identity,
            dataName: 'orderSerial', defaultData: 0,
          },
          menuStatus: {
            header: 'menuStatus', getter: get('menuStatus'), sortRank: 1,
            listSetter: (value) => (t('mainStatus_' + value)),
            dataName: 'menuStatus', defaultData: 'Active',
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
