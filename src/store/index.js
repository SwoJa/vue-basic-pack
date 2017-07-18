import Vue from 'vue'

export function getUserInfo() {
  return JSON.parse(Vue.localStorage.get('userInfo'))
}

export function setUserInfo(info) {
  Vue.localStorage.set('userInfo', JSON.stringify(info))

  return true
}