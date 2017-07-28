import R from 'ramda'
import { identity, get, queryParams } from 'utils/common'
import { t } from 'utils/translater'
import { getList, create, update, remove } from 'apis'
import ListTable from 'components/ListTable'

export var callerSelector = get('caller')
var dataSelector = get('data')
var metaDataSelector = get('metaData')
var urlSelector = get('url')

var defaultSchema = {
  resource: {},
  columns: {},
}

export function initSchema(schema) {
  return Object.assign({}, defaultSchema, schema)
}

var hasHeader = (pairs) => (R.has('header', pairs[1]))
var hasDataName = (pairs) => (R.has('dataName', pairs[1]))
var toListColumn = (pairs) => ({
  prop: pairs[0], label: pairs[1].header, mapper: R.compose(pairs[1].listSetter, pairs[1].getter),
  extend: pairs[1].listExpnd
})
var toDataColumn = (pairs) => ({ prop: pairs[1].dataName, mapper: pairs[1].getter })
var toDefaultPairs = (pairs) => ([pairs[0], pairs[1].defaultData])

var columns2ListColumn = R.compose(R.map(toListColumn), R.filter(hasHeader), R.toPairs)
var columnsHasDataPairs = R.compose(R.filter(hasDataName), R.toPairs)
var columns2DefaultItem = R.compose(R.fromPairs, R.map(toDefaultPairs), columnsHasDataPairs)
var columns2DataColumn = R.compose(R.map(toDataColumn), R.filter(hasDataName), R.toPairs)

export function getListTotalColumns(schema) {
  if ((!schema) || (!schema.columns)) return [];

  return columns2ListColumn(schema.columns)
}

export function getListUnextendColumns(schema) {
  if ((!schema) || (!schema.columns)) return [];

  return R.filter((column) => (!column.extend), columns2ListColumn(schema.columns))
}

export function getListExtendColumns(schema) {
  if ((!schema) || (!schema.columns)) return [];

  return R.filter((column) => (column.extend), columns2ListColumn(schema.columns))
}

export function getListData(schema, list) {
  if ((!schema) || (!schema.columns) || !list || list.length <= 0) return [];

  var listColumns = getListTotalColumns(schema)

  return R.map((row) => (R.fromPairs(R.map((column) => ([column.prop, column.mapper(row)]), listColumns))), list)
}

export function getEditingData(schema, item) {
  if ((!schema) || (!schema.columns) || !item) return {};

  var dataColumns = columns2DataColumn(schema.columns)

  return R.fromPairs(R.map((column) => ([column.prop, column.mapper(item)]), dataColumns))
}

function getDefaultColumnPairs(schema) {
  if ((!schema) || (!schema.columns)) return [];

  return columnsHasDataPairs(schema.columns)
}

function getDefaultItem(schema) {
  if ((!schema) || (!schema.columns)) return {};

  return columns2DefaultItem(schema.columns);
}

function initState(state) {
  return Object.assign({
    editingCondition: {},
    condition: {},
    showEditor: false,
    isAdding: false,
    isModifying: false,
    initialData: {},
    metaData: {},
    isDirty: false,
    waiting: false,
    error: false,
    list: [],
    currentPage: 1,
    pageSize: 10,
    total: 0,
    one: {},
    callback: {},
  }, state)
}

export function getOPs(op) {
  if (!op) return [];

  return R.values(op)
}

function mainQueryInit(params) {
  var self = callerSelector(params)

  self.condition = {}
  self.editingCondition = {}

  return true
}

function mainQueryConditionChange(params, data) {
  var self = callerSelector(params), editingCondition = self.editingCondition,
    newCondition = Object.assign({}, editingCondition, data)

  params.data = newCondition;

  return mainQueryChanging(params) && mainQueryChanged(params);
}

function mainQueryChanging(params) {
  var self = callerSelector(params)

  self.editingCondition = dataSelector(params)

  return true
}

function mainQueryChanged(params) {
  var self = callerSelector(params)

  self.condition = self.editingCondition

  return true;
}

var mainStatusOptions = [
  { id: 0, text: t('mainStatus_Active'), value: 'Active'},
  { id: 1, text: t('mainStatus_Invalid'), value: 'Invalid'},
];

export var mainEditorName = 'MainEditor'

export function mainEditStart(params, item, meta) {
  var self = callerSelector(params)

  self.showEditor = true
  self.isAdding = !!meta.isAdding
  self.isModifying = !meta.isAdding
  self.initialData = Object.assign({}, item)
  self.metaData = Object.assign({}, meta)

  return true
}

function mainEditEnd(params) {
  var self = callerSelector(params)

  self.showEditor = false
  self.metaData = {}

  return true;
}

function mainItemRemove(params, data) {
  var self = callerSelector(params)

  params.url = getResourceURL(self.schema.resource, data, false)

  return mainRemove(params)
}

function editorSubmitClick(params, data) {
  var self = callerSelector(params)

  params.data = data
  params.url = getResourceURL(self.schema.resource, data, self.isAdding)

  if (self.isAdding) {
    return mainCreate(params)
  } else {
    return mainUpdate(params)
  }
}

function getResourceURL(resource, data, isAdding) {
  var url = API_HOST + '/' + resource.resourceName, queryObj = {};

  if (data && !isAdding) {
    if (!resource.idName && resource.pk) { //for password changing
      R.forEach((key) => {
        queryObj[key] = data[key];
      }, resource.pk);
      url += queryParams(queryObj);
    } else { //for usual cases
      url += '/' + data[resource.idName];
    }
  }

  return url;
}

function mainCreate(params) {
  return mainCallAPI(params, create);
}

function mainUpdate(params) {
  return mainCallAPI(params, update);
}

function mainRemove(params) {
  return mainCallAPI(params, remove);
}

function mainCallListAPI(params) {
  var self = callerSelector(params)

  processingHelper(params)

  getList(self.schema.resource, self.currentPage, self.pageSize).then((rows) => {
    successHelper(params)

    self.isDirty = false
    self.list = rows
    self.total = rows.total

    return true
  }).catch(function(error) {
    failedHelper(params)

    self.callback = error

    return false
  })
}

function mainCallAPI(params, callee) {
  var self = callerSelector(params), data = dataSelector(params)

  processingHelper(params)

  return callee(urlSelector(params), data).then(function (result) {
    successHelper(params)

    self.one = result

    return true
  }).catch(function (error) {
    failedHelper(params, error)

    return false
  })
}

export function processingHelper(params) {
  var self = callerSelector(params)

  self.waiting = true
  self.callback = null
  self.error = false

  return true
}

export function successHelper(params) {
  var self = callerSelector(params)

  self.showEditor = false
  self.isAdding = false
  self.isModifying = false
  self.metaData = {}

  self.waiting = false
  self.callback = null
  self.isDirty = true

  return true
}

export function failedHelper(params, error) {
  var self = callerSelector(params)

  self.waiting = false
  self.callback = error
  self.error = true

  return true
}

export var listMixin = {
  data() {
    return initState()
  },
  computed: {
    listHeight: function() {
      return window && (window.innerHeight - 180) || 480
    },
    mainEditorName: function() {
      return mainEditorName
    },   
  },
  mounted: function () {
    this.reloadList()
  },
  methods: {
    getParams() {
      return { caller: this }
    },
    getList,
    getInitialData(params) {
      var self = callerSelector(params)

      return Object.assign({}, self.initialData)
    },
    reloadList() {
      var self = this

      return mainCallListAPI(self.getParams())
    },
    handleSizeChange(val) {
      var self = this

      self.pageSize = val

      self.$nextTick(function () {
        self.reloadList()
      })
    },
    handleCurrentChange(val) {
      var self = this

      self.currentPage = val

      self.$nextTick(function () {
        self.reloadList()
      })
    },
    callError(error) {
      this.$message.error(error.message)
    },
    onItemAdd() {
      var self = this

      return mainEditStart(self.getParams(), getDefaultItem(self.schema), {
        isAdding: true,
        showingModalName: mainEditorName,
      })
    },
    onItemModify(index) {
      var self = this

      return mainEditStart(self.getParams(), getEditingData(self.schema, self.list[index]), {
        isAdding: false,
        showingModalName: mainEditorName,
      })
    },
    onItemRemove(index) {
      var self = this

      return mainItemRemove(self.getParams(), self.list[index]).catch(self.callError)
    },
  },
  watch: {
    isDirty: function (newValue) {
      if (newValue) this.reloadList()
    },
    callback: function(newValue) {
      if (newValue) {
        processError(this, newValue)
      }
    }
  },
  components: {
    ListTable,
  },
}

export var listEditorMixin = {
  props: [ 'showEditor', 'initialData', 'params' ],
  data() {
    return {
      form: {}
    }
  },
  computed: {
    caller: function() {
      return callerSelector(this.params)
    },
    isAdding: function() {
      return this.caller.isAdding
    },
    waiting: function() {
      return this.caller.waiting
    },
    title: function() {
      return this.isAdding ? 'add' : 'modify'
    },
    mainStatusOptions: function() {
      return mainStatusOptions
    },
  },
  watch: {
    initialData: function(newVal) {
      this.form = newVal
    },
  },
  methods: {
    handleSubmit: function() {
      editorSubmitClick(this.params, this.form)
    },
    handleCancel: function() {
      mainEditEnd(this.params)
    }
  },
}

function processError(self, error) {
  console.error(error.stack)
  self.$message.error(error.message)

  if (error.response.status === 401) { // 401:unauthorized
    self.$router.push(PUBLIC_PATH + 'login') //dependency with App.vue and Top.vue login path
  }
}
