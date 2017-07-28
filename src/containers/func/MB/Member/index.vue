<template>
  <div class="list-page">
    <el-row>
      <el-col :span="6">{{ 'memberManage' | t }}</el-col>
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
import { identity, get, toMark } from 'utils/common'
import { toLocalDate } from 'utils/date'
import { t } from 'utils/translater'
import { resources, getAllOptions, getOptionDescByValue } from 'apis'
import { listMixin, initSchema } from 'containers/func/listHelper'
import MainEditor from './MainEditor'

var main = resources.member,
  user = resources.user, grade = resources.grade, country = resources.country, nation = resources.nation

export default {
  name: 'Member',
  mixins: [listMixin],
  components: {
    MainEditor
  },
  data() {
    return {
      userOptions: [],
      gradeOptions: [], 
      countryOptions: [],
      nationOptions: [],
    }
  },
  created() {
    var self = this

    getAllOptions(user, true, true).then((options) => {
      self.userOptions = options
    }).catch(self.callError)

    getAllOptions(grade, true, true).then((options) => {
      self.gradeOptions = options
    }).catch(self.callError)

    getAllOptions(country, true, true).then((options) => {
      self.countryOptions = options
    }).catch(self.callError)

    getAllOptions(nation, true, true).then((options) => {
      self.nationOptions = options
    }).catch(self.callError)
  },
  computed: {
    schema: function () {
      var self = this

      return initSchema({
        resource: main,
        columns: {
          sysID: {
            header: 'sysID', getter: get('sysID'), sortRank: 1,
            listSetter: identity,
            dataName: 'sysID', defaultData: '',
          },
          userName: {
            header: 'userName', getter: get('userName'), sortRank: 1,
            listSetter: identity,
            dataName: 'userName', defaultData: '',
          },
          loginAccount: {
            header: 'loginAccount', getter: get('loginAccount'), sortRank: 1,
            listSetter: identity,
            dataName: 'loginAccount', defaultData: '',
          },
          validateType: {
            getter: get('validateType'), sortRank: 1,
            dataName: 'validateType', defaultData: 1,
          },
          mobile: {
            getter: get('mobile'), sortRank: 1,
            dataName: 'mobile', defaultData: '',
          },
          email: {
            getter: get('email'), sortRank: 1,
            dataName: 'email', defaultData: '',
          },
          media: {
            getter: get('media'), sortRank: 1,
            dataName: 'media', defaultData: '',
          },
          birthday: {
            getter: get('birthday'), sortRank: 1,
            dataName: 'birthday', defaultData: null,
          },
          registerDate: {
            header: 'registerDate', getter: get('registerDate'), sortRank: 1,
            listSetter: toLocalDate,
            dataName: 'registerDate', defaultData: null,
          },
          gradeID: {
            header: 'grade', getter: get('gradeID'), sortRank: 1,
            listSetter: identity,
            dataName: 'gradeID', defaultData: '',
          },
          countryID: {
            getter: get('countryID'), sortRank: 1,
            dataName: 'countryID', defaultData: '',
          },
          idVerifyStatus: {
            header: 'idVerifyStatus', getter: get('idVerifyStatus'), sortRank: 1,
            listSetter: (value) => (t('idVerifyStatus_' + value)),
            dataName: 'idVerifyStatus', defaultData: 0,
          },
          memberIsLock: {
            header: 'memberIsLock', getter: get('memberIsLock'), sortRank: 1,
            listSetter: toMark,
            dataName: 'memberIsLock', defaultData: false,
          },
          nationID: {
            header: 'nation', getter: get('nationID'), sortRank: 1,
            listSetter: (value) => (getOptionDescByValue(self.nationOptions, value)),
            dataName: 'nationID', defaultData: '1',
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
