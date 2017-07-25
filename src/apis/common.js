import axios from 'axios'
import R from 'ramda'
import { formData } from 'utils/common'
import { t } from 'utils/translater'

export function postForm(url, data, options) {
  return callForm('post', url, data, options)
}

export function putForm(url, data, options) {
  return callForm('put', url, data, options)
}

export function getJSON(url, options) {
  return callJSON('get', url, null, options)
}

export function postJSON(url, data, options) {
  return callJSON('post', url, data, options)
}

export function putJSON(url, data, options) {
  return callJSON('put', url, data, options)
}

export function removeJSON(url, options) {
  return callJSON('delete', url, null, options)
}

function callForm(method, url, data, options) {
  return axios({
    method: method,
    url: url,
    headers: Object.assign({
      'Content-Type': 'application/x-www-form-urlencoded'
    }, options.headers),
    data: formData(data),
  }).then(parseResponse)
}

function callJSON(method, url, data, options) {
  return axios({
    method: method,
    url: url,
    headers: Object.assign({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, options.headers),
    data: data,
  }).then(parseResponse)
}

var getTotal = R.path(['data', 'data', 'total'])
var getRows = R.path(['data', 'data', 'rows'])
var getData = R.path(['data', 'data'])

function parseResponse(response) {
  if (response.status === 500) throw new Error(t('backendError') + '(' + response.status + ')')
  
  if (response.statusText === 'OK') return response.status !== 204 ? (getRowsNTotal(response) || getData(response) || response.data) : true
  
  throw new Error(response.data.message)
}

function getRowsNTotal(response) {
  var rows = getRows(response)

  if (!rows) return null;

  rows.total = getTotal(response)

  return rows
}
