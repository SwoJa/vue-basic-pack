import { postForm } from 'apis/common'

export function login(userName, password) {
  var data = {
    username: userName,
    password: password,
    grant_type: 'password',
  }, url = API_HOST + '/Login'

  return postForm(url, data, {})
}

export function logout(user) {
  return postForm(API_HOST + '/BM/User/logout', {}, {
    headers: {
      Authorization: 'Bearer ' + user.token
    }
  })
}