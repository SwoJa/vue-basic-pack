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
