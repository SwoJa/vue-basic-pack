<template>
  <div class="list-page">
    <el-row>
      <el-col :span="6">{{ 'preferTransCountryManage' | t }}</el-col>
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
import { resources, getAllOptions } from 'apis'
import { listMixin, initSchema } from 'containers/func/listHelper'
import MainEditor from './MainEditor'

var main = resources.preferTransCountry,
  member = resources.member, country = resources.country

export default {
  name: 'PreferTransCountry',
  mixins: [listMixin],
  components: {
    MainEditor
  },
  data() {
    return {
      memberOptions: [],
      countryOptions: [],
    }
  },
  created() {
    var self = this

    getAllOptions(member, true, true).then((options) => {
      self.memberOptions = options
    }).catch(self.callError)

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
            getter: get('id'), sortRank: 1,
            dataName: 'id', defaultData: 0,
          },
          sysID: {
            header: 'sysID', getter: get('sysID'), sortRank: 1,
            listSetter: identity,
            dataName: 'sysID', defaultData: '',
          },
          countryID: {
            header: 'countryID', getter: get('countryID'),  sortRank: 1,
            listSetter: identity,
            dataName: 'countryID', defaultData: 'CN',
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

<style src="containers/func/list.scss" scoped></style>
