<template>
  <div class="list-page">
    <el-row>
      <el-col :span="6">{{ 'memberAssetManage' | t }}</el-col>
    </el-row>
    <ListTable :list="list" :schema="schema" :listHeight="listHeight" :operation="operation" :currentPage="currentPage" :pageSize="pageSize" :total="total" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange">
    </ListTable>
  </div>
</template>

<script>
import { identity, get } from 'utils/common'
import { t } from 'utils/translater'
import { resources } from 'apis'
import { listMixin, initSchema } from 'containers/func/listHelper'

var main = resources.memberAsset

export default {
  name: 'MemberAsset',
  mixins: [listMixin],
  computed: {
    schema: function () {
      return initSchema({
        resource: main,
        columns: {
          id: {
            getter: get('id'), sortRank: 1,
            dataName: 'id', defaultData: '',
          },
          sysID: {
            header: 'sysID', getter: get('sysID'), sortRank: 1,
            listSetter: identity,
            dataName: 'sysID', defaultData: '',
          },
          address: {
            header: 'address', getter: get('address'), sortRank: 1,
            listSetter: identity,
            dataName: 'address', defaultData: '',
          },
          amountWaiting: {
            header: 'amountWaiting', getter: get('amountWaiting'), sortRank: 1,
            listSetter: identity,
            dataName: 'amountWaiting', defaultData: 0,
          },
          amountUseful: {
            header: 'amountUseful', getter: get('amountUseful'), sortRank: 1,
            listSetter: identity,
            dataName: 'amountUseful', defaultData: 0,
          },
          amountShelved: {
            header: 'amountShelved', getter: get('amountShelved'), sortRank: 1,
            listSetter: identity,
            dataName: 'amountShelved', defaultData: 0,
          },
          productID: {
            header: 'product', getter: get('productID'), sortRank: 1,
            listSetter: identity,
            dataName: 'productID', defaultData: '',
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
      return {}
    },
  },
}
</script>

<style src="containers/func/list.scss" scoped></style>
