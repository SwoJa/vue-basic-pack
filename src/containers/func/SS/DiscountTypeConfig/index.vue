<template>
  <div class="list-page">
    <el-row>
      <el-col :span="6">{{ 'discountTypeConfigManage' | t }}</el-col>
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
import { toLocalDate } from 'utils/date'
import { resources, getAllOptions } from 'apis'
import { listMixin, initSchema } from 'containers/func/listHelper'
import MainEditor from './MainEditor'

var main = resources.discountTypeConfig,
  grade = resources.grade, discountType = resources.discountType

export default {
  name: 'DiscountTypeConfig',
  mixins: [listMixin],
  components: {
    MainEditor
  },
  data() {
    return {
      gradeOptions: [],
      discountTypeOptions: [],
    }
  },
  created() {
    var self = this

    getAllOptions(grade, true, true).then((options) => {
      self.gradeOptions = options
    }).catch(self.callError)

    getAllOptions(discountType, true, true).then((options) => {
      self.discountTypeOptions = options
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
          gradeID: {
            header: 'grade', getter: get('gradeID'), sortRank: 1,
            listSetter: identity,
            dataName: 'gradeID', defaultData: 'Copper',
          },
          discountType: {
            header: 'discountType', getter: get('discountType'), sortRank: 1,
            listSetter: (value) => (t('discountType_' + value)),
            dataName: 'discountType', defaultData: 'Birthday',
          },
          discountRate: {
            header: 'discountRate', getter: get('discountRate'), sortRank: 1,
            listSetter: identity,
            dataName: 'discountRate', defaultData: 0,
          },
          status: {
            header: 'status', getter: get('status'), sortRank: 1,
            listSetter: (value) => (t('mainStatus_' + value)),
            dataName: 'status', defaultData: 'Active',
          },
          startDate: {
            header: 'startDate', getter: get('startDate'), sortRank: 1,
            listSetter: toLocalDate,
            dataName: 'startDate', defaultData: new Date(),
          },
          endDate: {
            header: 'endDate', getter: get('endDate'), sortRank: 1,
            listSetter: toLocalDate,
            dataName: 'endDate', defaultData: new Date(),
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
