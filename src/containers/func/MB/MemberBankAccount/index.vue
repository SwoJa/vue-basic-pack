<template>
  <div class="list-page">
    <el-row>
      <el-col :span="6">{{ 'memberBankAccountManage' | t }}</el-col>
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
import { identity, get } from 'utils/common'
import { t } from 'utils/translater'
import { resources, getAllOptions } from 'apis'
import { listMixin, initSchema } from 'containers/func/listHelper'
import MainEditor from './MainEditor'

var main = resources.memberBankAccount,
  member = resources.member, country = resources.country, bank = resources.bank, currency = resources.currency

export default {
  name: 'MemberBankAccount',
  mixins: [listMixin],
  components: {
    MainEditor
  },
  data() {
    return {
      memberOptions: [],
      countryOptions: [],
      bankOptions: [],
      currencyOptions: [],
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

    getAllOptions(bank, true, true).then((options) => {
      self.bankOptions = options
    }).catch(self.callError)

    getAllOptions(currency, true, true).then((options) => {
      self.currencyOptions = options
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
          accountNo: {
            header: 'bankAccount', getter: get('accountNo'), sortRank: 1,
            listSetter: identity,
            dataName: 'accountNo', defaultData: '',
          },
          accountName: {
            header: 'accountName', getter: get('accountName'), sortRank: 1,
            listSetter: identity,
            dataName: 'accountName', defaultData: '',
          },
          countryID: {
            header: 'countryID', getter: get('countryID'), sortRank: 1,
            listSetter: identity,
            dataName: 'countryID', defaultData: '',
          },
          bankID: {
            header: 'bankId', getter: get('bankID'), sortRank: 1,
            listSetter: identity,
            dataName: 'bankID', defaultData: '',
          },
          branchName: {
            header: 'branch', getter: get('branchName'), sortRank: 1,
            listSetter: identity,
            dataName: 'branchName', defaultData: '',
          },
          swiftCode: {
            header: 'swiftCode', getter: get('swiftCode'), sortRank: 1,
            listSetter: identity,
            dataName: 'swiftCode', defaultData: '',
          },
          currencyID: {
            header: 'currencyID', getter: get('currencyID'), sortRank: 1,
            listSetter: identity,
            dataName: 'currencyID', defaultData: '',
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
          title: 'remove', handler: self.onItemRemove, type: 'primary'
        },
      }
    },
  },
}
</script>

<style src="containers/func/list.scss" scoped></style>
