<template>
  <div class="list-page">
    <el-row>
      <el-col :span="6">{{ 'configManage' | t }}</el-col>
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

var main = resources.config

export default {
  name: 'Config',
  mixins: [listMixin],
  components: {
    MainEditor
  },
  computed: {
    schema: function () {
      return initSchema({
        resource: main,
        columns: {
          id: {
            getter: get('id'), sortRank: 1,
            dataName: 'id', defaultData: '',
          },
          configName: {
            header: 'configName', getter: get('configName'), sortRank: 1,
            listSetter: identity,
            dataName: 'configName', defaultData: '',
          },
          description: {
            header: 'description', getter: get('description'), sortRank: 1,
            listSetter: identity,
            dataName: 'description', defaultData: '',
          },
          value: {
            header: 'configValue', getter: get('value'), sortRank: 1,
            listSetter: identity,
            dataName: 'value', defaultData: '',
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
