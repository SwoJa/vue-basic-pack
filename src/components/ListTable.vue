<template>
  <div>
    <el-table :data="listData" style="width: 100%" :height="listHeight">
      <el-table-column v-for="column in listColumns" :key="column.prop" :prop="column.prop" :label="column.label | t"></el-table-column>
      <el-table-column v-if="ops.length > 0" :width="opsWidth" fixed="right" :label="'operation' | t">
        <template scope="scope">
          <el-button v-for="(op, index) in ops" :key="index"
            @click.native.prevent="op.handler(scope.$index)" size="small">
            {{ op.title | t }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import R from 'ramda'
import { getOPs, getListColumns, getListData } from 'containers/func/listHelper'

export default {
  name: 'ListTable',
  props: ['list', 'schema', 'listHeight', 'operation', 'currentPage', 'pageSize', 'total', 'handleSizeChange', 'handleCurrentChange' ],
  computed: {
    ops: function () {
      return getOPs(this.operation)
    },
    opsWidth: function() {
      var self = this, sizes = 0

      if (!self.ops) return 0;

      sizes = R.reduce((seed, op) => (seed + (op.size || 2)), 0, self.ops)

      return 28 + 27 * sizes
    },
    listColumns: function() {
      return getListColumns(this.schema)
    },
    listData: function() {
      return getListData(this.schema, this.list)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
