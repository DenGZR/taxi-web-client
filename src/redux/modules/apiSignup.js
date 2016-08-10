import axios from 'axios'
import { push } from 'react-router-redux'
import { fetchInfo, fetchingData } from './auth'
import { setCookie } from './cookieUtils'

const ROOT_URL = 'https://api.psyco.com.ua:443/api'

export const USER_SIGNUP = 'USER_SIGNUP'
export const CONFIRM_SIGNUP_LOGIN = 'CONFIRM_SIGNUP_LOGIN'
export const RECEIVE_OTP = 'RECEIVE_OTP'
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN'
export const REMOVE_OTP = 'REMOVE_OTP'

var config = {
  headers: {'Content-Type': 'application/json; charset=utf-8'}
}
/* Actions */
export function receiveOtp (data = {}) {
  console.log(data.data.note)
  Object.assign(data, {OTP: data.data.note.split(/\D+/)[1]})
  // console.log(data)
  return {
    type: RECEIVE_OTP,
    payload: data
  }
}
export function removeOTP (data = {}) {
  return {
    type: REMOVE_OTP,
    payload: data
  }
}

export function userSignup (data = {}) {
  return {
    type: USER_SIGNUP,
    payload: data
  }
}
export function receiveToken (token = {}) {
  // console.log(token)
  return {
    type: RECEIVE_TOKEN,
    payload: token
  }
}
export function fetchSignup (data = {}, path = '/client/') {
  return function (dispatch) {
    return axios.post(`${ROOT_URL}${path}signup/`,
      JSON.stringify(Object.assign(data, {login: data.login.replace(/[\-\(\)]/g, '')})), config)
      .then(function (response) {
        // console.log(response.data)
        dispatch(fetchingData({isFetching: false, otpSend: true}))
        dispatch(receiveOtp(response))
      })
  }
}

// LohinAS aka login after signup
export function loginAS (data = {}, path = '/client/', pushRequire = true, instantlyLogin = false) {
  return function (dispatch) {
    //debugger;
    console.log("loginAS send login and otp -> response token");
    console.log("path",`${ROOT_URL}${path}login/`);
    console.log("send data", JSON.stringify(data));
    return axios.post(`${ROOT_URL}${path}login/`, JSON.stringify(data), config)
      .then((response) => {
        console.log(response)
        const { token } = response.data
        console.log("token",token)
        // Переделать что бы токен хранился в куки недельной живучести
        let userType = (path === '/client/' ? '/passenger/' : '/driver/')
        setCookie('token', token, 6048e2, '/')
        setCookie('userType', userType.replace(/[\/]/g, ''), 6048e2, '/')
        // window.localStorage.setItem('token', token)
        // window.localStorage.setItem('userType', userType.replace(/[\/]/g, ''))
        dispatch(receiveToken({token}))
        // console.log('fetching infos')
        dispatch(fetchInfo(path))
        if (pushRequire) {
          // console.log(`pushing to ${(path === '/client/' ? '/passenger/' : '/driver/')}`)
          dispatch(push((path === '/client/' ? '/passenger/' : '/driver/')))
        }
      })
      .catch(error => {
        console.log("loginAS response error", error );
      })
  }
}

export const actions = {
  fetchSignup,
  receiveOtp,
  receiveToken,
  loginAS,
  removeOTP
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_SIGNUP]: (state, action) => console.log(action.payload),
  [CONFIRM_SIGNUP_LOGIN]: (state, action) => Object.assign({}, state, {response: action.payload}),
  [RECEIVE_OTP]: (state, action) => Object.assign({}, state, action.payload),
  [RECEIVE_TOKEN]: (state, action) => Object.assign({}, state, action.payload),
  [REMOVE_OTP]: (state, action) => Object.assign({}, state, action.payload)
}
var data = {
  OTP: null,
  error: null,
  notice: null
}

export default function apiSignup (state = data, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
