import { postForm } from 'apis/common'

export function login(userName, password) {
  var data = {
    username: userName,
    password: password,
    grant_type: 'password',
  }, url = API_HOST + '/Login'

  return postForm(url, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}