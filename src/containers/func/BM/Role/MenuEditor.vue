<template>
  <el-dialog :title="'modifyMenu' | t" :visible="showEditor"
    :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <div class="operations">
      <el-button @click="handleAdd" size="small">{{ 'btnCreate' | t}}</el-button>
      <el-button @click="handleRemove" size="small">{{ 'btnRemove' | t}}</el-button>
    </div>
    <el-form :model="form">
      <el-form-item v-for="(row, index) in form.menu" :key="form.roleID + '_menu_' + index + row.menuID">
        <el-row>
          <el-col :span="12">
            <el-checkbox :key="form.roleID + '_menu_' + index + row.menuID + 'selected'" v-model="row.selected"></el-checkbox>
            <el-select :key="form.roleID + '_menu_' + index + row.menuID + 'menuID'" v-model="row.menuID">
              <el-option v-for="option in menuOptions" :key="form.roleID + '_menu_' + index + option.id" :label="option.text" :value="option.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12"><el-input :key="form.roleID + '_menu_' + index + row.menuID + 'remark'" v-model="row.remark"></el-input></el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-button @click="handleSubmit" type="primary">{{ 'btnConfirm' | t }}</el-button>
    <el-button @click="handleCancel">{{ 'btnCancel' | t }}</el-button>
  </el-dialog>
</template>

<script>
import R from 'ramda'
import { resources, create } from 'apis'
import { listEditorMixin,
  processingHelper, successHelper, failedHelper,
} from 'containers/func/listHelper'

var main = resources.roleMenu

const defaultItem = {
  menuID: 0,
  remark: '',
  selected: false
};

export default {
  name: 'MenuEditor',
  mixins: [listEditorMixin],
  computed: {
    menuOptions: function() {
      return this.caller.menuOptions
    },
  },
  methods: {
    handleSubmit: function() {
      var self = this, params = self.params, 
        editingData = self.form, menu = editingData.menu

      processingHelper(params)

      create(API_HOST + '/' + main.resourceName + '/' + editingData.roleID, { menus: menu }).then((result) => {
        successHelper(params)

        self.one = editingData

        self.handleCancel()
      }).catch((error) => {
        failedHelper(params)

        self.callback = error

        return false
      });
    },
    handleAdd: function() {
      this.form.menu.push(Object.assign({}, defaultItem));
    },
    handleRemove: function() {
      this.form.menu = R.filter((row) => (!(!!row.selected)), this.form.menu)
    },
  },
}
</script>

<style lang="scss" scoped>
.operations {
  margin: 1vh 1vw;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  -webkit-box-pack: flex-end;
  -ms-flex-pack: flex-end;
  justify-content: flex-end;
}
</style>
