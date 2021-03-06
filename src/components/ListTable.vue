<template>
  <div class="list-table">
    <el-row type="flex" align="middle">
      <div class="list-table-header">
        <div class="outside-inputs">
          <slot name="outside-inputs"></slot>
        </div>
        <div class="outside-buttons">
          <slot name="outside-buttons"></slot>
        </div>
      </div>
    </el-row>
    <el-table :data="listData" style="width: 100%" :height="listHeight">
      <el-table-column v-if="listExtendColumns.length > 0" type="expand">
        <template scope="scope">
          <el-form inline class="table-expand" label-width="140px">
            <el-form-item v-for="column in listExtendColumns" :key="column.prop" :label="column.label | t">
              <span v-if="column.meta.type === listMetaType.text">{{ column.mapper(scope.row) }}</span>
              <el-button v-if="column.meta.type === listMetaType.dialogLink && column.mapper(scope.row)" @click="column.meta.clickHandler(column.mapper(scope.row))" type="text">{{ column.meta.desc | t }}</el-button>
            </el-form-item>            
          </el-form>
        </template>
      </el-table-column>
      <el-table-column v-for="column in listUnextendColumns" :key="column.prop" :prop="column.prop" :label="column.label | t"></el-table-column>
      <el-table-column v-if="ops.length > 0" :width="opsWidth" fixed="right" :label="'operation' | t">
        <template scope="scope">
          <el-button v-for="(op, index) in ops" :key="index" @click.native.prevent="op.handler(scope.$index)" :type="op.type" size="small">
            {{ op.title | t }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import R from 'ramda'
import {
  getOPs, getListUnextendColumns, getListExtendColumns, getListData, listMetaType
} from 'containers/func/listHelper'

export default {
  name: 'ListTable',
  props: ['list', 'schema', 'listHeight', 'operation', 'currentPage', 'pageSize', 'total', 'handleSizeChange', 'handleCurrentChange'],
  computed: {
    ops: function () {
      return getOPs(this.operation)
    },
    opsWidth: function () {
      var self = this, sizes = 0

      if (!self.ops) return 0;

      sizes = R.reduce((seed, op) => (seed + (op.size || 2)), 0, self.ops)

      return 28 + 27 * sizes + (self.listExtendColumns && self.listExtendColumns.length > 0 ? 24 : 0)
    },
    listMetaType: function() {
      return listMetaType
    },
    listUnextendColumns: function() {
      return getListUnextendColumns(this.schema)
    },
    listExtendColumns: function () {
      return getListExtendColumns(this.schema)
    },
    listData: function () {
      return getListData(this.schema, this.list)
    },
  },
}
</script>

<style lang="scss" scoped>
.list-table {
  > .el-row {
    margin: 1vh 1vw;
  }

  .list-table-header {
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .table-expand .el-form-item {
    width: 33%;
    margin: 0;
  }
}
</style>
