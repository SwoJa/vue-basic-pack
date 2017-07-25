<template>
  <el-dialog :title="'modifyMenu' | t" :visible="showEditor"
    :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <el-transfer v-model="form.menu" :titles="titles" class="transfer"
      :props="{ key: 'value', label: 'text' }" :data="menuOptions">
    </el-transfer>
    <el-button @click="handleSubmit" type="primary">{{ 'btnConfirm' | t }}</el-button>
    <el-button @click="handleCancel">{{ 'btnCancel' | t }}</el-button>
  </el-dialog>
</template>

<script>
import R from 'ramda'
import { resources, create } from 'apis'
import { t } from 'utils/translater'
import { listEditorMixin,
  processingHelper, successHelper, failedHelper,
} from 'containers/func/listHelper'

var main = resources.roleMenu

export default {
  name: 'MenuEditor',
  mixins: [listEditorMixin],
  computed: {
    titles: function() {
      return [t('existedFunction'), t('givenFunction')]
    },
    menuOptions: function() {
      return this.caller.menuOptions
    },
  },
  methods: {
    handleSubmit: function() {
      var self = this, params = self.params, 
        editingData = self.form, menu = R.map((value) => ({ menuID: parseInt(value) }), editingData.menu)

      processingHelper(params)

      create(API_HOST + '/' + main.resourceName + '/' + editingData.roleID, { menus: menu }).then((result) => {
        successHelper(params)

        self.one = editingData

        self.handleCancel()
      }).catch((error) => {
        failedHelper(params)

        self.callback = error

        return false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.transfer {
  margin: 0 5vw 2vh 5vw;
}
</style>
