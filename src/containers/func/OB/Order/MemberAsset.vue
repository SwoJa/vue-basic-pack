<template>
  <el-dialog :title="'memberAsset' | t" :visible="show"
    :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <div class="dialog-header-operation">
      <el-button @click="handleBack" size="small">{{ 'btnBack' | t }}</el-button>
    </div>
    <el-form :model="initialData" label-width="120px">
      <el-form-item :label="'address' | t">
        <span> {{ initialData.address }}</span>
      </el-form-item>
      <el-form-item :label="'amountWaiting' | t">
        <span> {{ initialData.amountWaiting }}</span>
      </el-form-item>
      <el-form-item :label="'amountUseful' | t">
        <span> {{ initialData.amountUseful }}</span>
      </el-form-item>
      <el-form-item :label="'amountShelved' | t">
        <span> {{ initialData.amountShelved }}</span>
      </el-form-item>
      <el-form-item :label="'product' | t">
        <span> {{ initialData.productID }}</span>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'MemberAsset',
  props: [ 'show', 'initialData', 'params', 'handleBack' ],
}
</script>

<style lang="scss" scoped>
.dialog-header-operation {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.el-form-item {
  margin: 0;
}
</style>
