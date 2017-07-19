import axios from 'axios'
import R from 'ramda'

export function postForm(url, data, options) {
  return axios({
    method: 'post',
    url: url,
    headers: options.headers,
    data: formData(data),
  }).then(parseResponse).catch(catchError)
}

export function getJSON(url, options) {
  return axios({
    method: 'get',
    url: url,
    headers: options.headers,
  }).then(parseResponse).catch(catchError)
}

function parseResponse(response) {
  if (response.status === 500) throw new Error('Backend Error') //TODO:translation
  
  if (response.statusText === 'OK') return response.status !== 204 ? (R.path(['data', 'data', 'rows'], response) || R.path(['data', 'data'], response)) : true
  
  throw new Error(response.data.message)
}

function catchError(error) {
  console.error(error.stack)
  throw new Error(error.response && error.response.data ? error.response.data.message : error.message)
}

function queryParams(params) {
  Object.keys(params).forEach((k) => {
    if (!params[k]) delete params[k]
  })

  return '?' + Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&')
}

function formData(params) {
  Object.keys(params).forEach((k) => {
    if (!params[k]) delete params[k]
  })

  return Object.keys(params)
    .map(k => k + '=' + params[k])
    .join('&')
}
