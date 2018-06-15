import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

import {
  API_ROOT
} from './constants'

const superagent = superagentPromise(_superagent, global.Promise)

const responseBody = res => res.body

let token = null
const tokenPlugin = req => {
  if(token){
    req.set('authorization', `Token ${token}`)
  }
}

const requests = {
  get: url => 
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
}

const Articles =  {
  all: (page) => 
    requests.get(`/articles?limit=2`)
}

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (username, password) =>
    requests.post('/users/login', { user: { username: username, password: password }})
}

export default {
  Articles,
  Auth,
  setToken: _token => { token = _token }
}
