import R from 'ramda'
import { identity, get, queryParams } from 'utils/common'
import { getList, create, update, remove } from 'apis'
import ListTable from 'components/ListTable'

var callerSelector = get('caller')
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
var toListColumn = (pairs) => ({ prop: pairs[0], label: pairs[1].header, mapper: R.compose(pairs[1].listSetter, pairs[1].getter) })
var toDefaultPairs = (pairs) => ([pairs[0], pairs[1].defaultData])

var columns2ListColumn = R.compose(R.map(toListColumn), R.filter(hasHeader), R.toPairs)
var columnsHasDataPairs = R.compose(R.filter(hasDataName), R.toPairs)
var columns2DefaultItem = R.compose(R.fromPairs, R.map(toDefaultPairs), columnsHasDataPairs)

export function getListColumns(schema) {
  if ((!schema) || (!schema.columns)) return [];

  return columns2ListColumn(schema.columns)
}

export function getListData(schema, list) {
  if ((!schema) || (!schema.columns) || !list || list.length <= 0) return [];

  var listColumns = getListColumns(schema)

  return R.map((row) => (R.fromPairs(R.map((column) => ([column.prop, column.mapper(row)]), listColumns))), list)
}

function getDefaultColumnPairs(schema) {
  if ((!schema) || (!schema.columns)) return [];

  return columnsHasDataPairs(schema.columns)
}

export function getDefaultItem(schema) {
  if ((!schema) || (!schema.columns)) return {};

  return columns2DefaultItem(schema.columns);
}

export function initState(state) {
  return Object.assign({
    editingCondition: {},
    condition: {},
    showEditor: false,
    isAdding: false,
    isModifying: false,
    editingData: {},
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

export function mainQueryInit(params) {
  var self = callerSelector(params)

  self.condition = {}
  self.editingCondition = {}

  return true
}

export function mainQueryConditionChange(params, data) {
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

export function mainEditStart(params, item, meta) {
  var self = callerSelector(params)

  self.showEditor = true
  self.isAdding = !!meta.isAdding
  self.isModifying = !meta.isAdding
  self.editingData = Object.assign({}, item)
  self.metaData = Object.assign({}, meta)

  return true
}

export function mainEditChanging(params) {
  var self = callerSelector(params)

  self.editingData = dataSelector(params)

  return true;
}

export function mainEditEnd(params) {
  var self = callerSelector(params)

  self.showEditor = false
  self.editingData = {}
  self.metaData = {}

  return true;
}

export function mainItemRemove(params, resource, item) {
  params.url = getResourceURL(resource, item, false)

  return mainRemove(params)
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

function mainCallAPI(params, callee) {
  var self = callerSelector(params)

  processingHelper(params)

  return callee(urlSelector(params), self.editingData).then(function (result) {
    successHelper(params)

    self.showEditor = false
    self.isAdding = false
    self.isModifying = isModifying
    self.editingData = {}
    self.metaData = {}
    self.one = result

    return true
  }).catch(function (error) {
    failedHelper(params)

    self.callback = error

    return false
  })
}

function processingHelper(params) {
  var self = callerSelector(params)

  self.waiting = true
  self.error = false

  return true
}

function successHelper(params) {
  var self = callerSelector(params)

  self.waiting = false
  self.isDirty = true

  return true
}

function failedHelper(params) {
  var self = callerSelector(params)

  self.waiting = false
  self.error = true

  return true
}

export var listMixin = {
  data() {
    return initState()
  },
  mounted: function () {
    this.reloadList()
  },
  methods: {
    getParams() {
      return { caller: this }
    },
    getList,
    reloadList() {
      var self = this

      self.getList(self.main, self.currentPage, self.pageSize).then((rows) => {
        self.isDirty = false
        self.list = rows
        self.total = rows.total
      }).catch((error) => {
        self.$message.error(error.message)
      })
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
    onItemAdd() {
      var self = this

      return mainEditStart(self.getParams(), getDefaultItem(self.schema), { isAdding: true })
    },
    onItemModify(index) {
      var self = this

      return mainEditStart(self.getParams(), self.list[index], { isAdding: false })
    },
    onItemRemove(index) {
      var self = this

      return mainItemRemove(self.getParams(), self.main, self.list[index]).catch((error) => {
        self.$message.error(error.message)
      })
    },
  },
  watch: {
    isDirty: function (newValue) {
      if (newValue) this.reloadList()
    }
  },
  components: {
    ListTable
  }
}
