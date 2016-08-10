import axios from 'axios'
// import { push } from 'react-router-redux'
import { fetchInfo } from './auth'
import { getCookie } from './cookieUtils'
import { incomingNotice } from './notifier'

export const ROOT_URL = 'https://api.psyco.com.ua:443/api'

export const SEND_DATA = 'SEND_DATA'
export const OLD_DATA = 'OLD_DATA'
export const CHANGED = 'CHANGED'

export const DRIVER_TOKEN = '9ed88cf6fad557e49bb893dc74e796c1'
export const CLIENT_TOKEN = 'b477336a629e01df8e4e8ffb38a67114'

const config = {
  headers: {'Content-Type': 'application/json; charset=utf-8',
            'Authorization-Token': getCookie('token')}
}

// const headersConfig = {
//   headers: {'Content-Type': 'application/json; charset=utf-8'}
// }
/* Actions */
export function correctData (data = {}) {
  return {
    type: SEND_DATA,
    payload: data
  }
}
export function oldDataReceive (data = {}) {
  return {
    type: OLD_DATA,
    payload: data
  }
}
export function profileUpdate (data = {}) {
  return {
    type: CHANGED,
    payload: data
  }
}
export function sendUserSettings (data = {}, path = '/client/') {
  console.log(data, path)
  return function (dispatch) {
    return axios.get(`${ROOT_URL}${path}getinfo/`, config)
    .then(function (response) {
      console.log(response)
      dispatch(oldDataReceive(response.data))
      return axios.post(`${ROOT_URL}${path}updateinfo`, JSON.stringify(data), config)
      .then(function (response) {
        console.log(response)
        if (response.data.error) {
          dispatch(profileUpdate({change: false, error: response.data.error}))
        } else {
           // notice: response.data.note
          dispatch(profileUpdate({change: true, error: null, notice: 'Информация обновлена на сервере.'}))
          dispatch(incomingNotice({
            isFail: false,
            errorMessage: null,
            errorCode: null,
            notice: 'Информация обновлена на сервере.'
          }))
          dispatch(fetchInfo(path))
          console.log(response.data.note)
        }
      })
    })
  }
}
export const actions = {
  sendUserSettings,
  correctData,
  profileUpdate
}

const ACTION_HANDLERS = {
  [SEND_DATA]: (state, action) => Object.assign({}, state, {sendData: action.payload}),
  [OLD_DATA]: (state, action) => Object.assign({}, state, {oldData: action.payload}),
  [CHANGED]: (state, action) => Object.assign({}, state, {
    profileUpdate: action.payload.change,
    error: action.payload.error,
    notice: action.payload.note
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initial = {
  profileUpdate: false,
  sendData: null,
  oldData: null,
  error: null,
  notice: null
}

export default function fieldsUtils (state = initial, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
