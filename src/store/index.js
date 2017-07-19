import Vue from 'vue'

export function getUserInfo() {
  return getter('userInfo');
}

export function setUserInfo(data) {
  return setter('userInfo', data);
}

export function getUserMenu() {
  return getter('userMenu');
}

export function setUserMenu(data) {
  return setter('userMenu', data);
}

function getter(id) {
  var data = Vue.localStorage.get(id);

  return data && JSON.parse(data) || {}
}

function setter(id, data) {
  Vue.localStorage.set(id, JSON.stringify(data))

  return true
}