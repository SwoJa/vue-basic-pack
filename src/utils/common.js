import R from 'ramda'

export function identity(value) {
  return value;
}

export function get(index) {
  return R.prop(index)
}

export function optionMap(rule) {
  return R.compose(
    R.map((pair) => (rule(pair[0], pair[1]))), //do rule with value and index
    R.map((pair) => ([pair[0], parseInt(pair[1])])), //convert index type from string to integer
    R.map(R.reverse),
    R.toPairs
  )
}

export function queryParams(params) {
  Object.keys(params).forEach((k) => {
    if (!params[k]) delete params[k]
  })

  return '?' + Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&')
}

export function formData(params) {
  Object.keys(params).forEach((k) => {
    if (!params[k]) delete params[k]
  })

  return Object.keys(params)
    .map(k => k + '=' + params[k])
    .join('&')
}

export function toMark(value) {
  return value ? 'V' : '';
}