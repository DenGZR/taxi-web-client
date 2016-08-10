import axios from 'axios'
import { push } from 'react-router-redux'
import { removeOTP, receiveOtp } from './apiSignup'
import { setCookie, getCookie, removeCookie, hasCookie, clearCookiesState, cookieCheker } from './cookieUtils'
import { clearOrderId } from './order'
import { closeSocketConnection } from './websockets'

const ROOT_URL = 'https://api.psyco.com.ua:443/api'

export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const FETCHING = 'FETCHING'
export const LOGIN_COMPLETE = 'LOGIN_COMPLETE'

const config = {
  headers: {'Content-Type': 'application/json; charset=utf-8',
            'Authorization-Token': getCookie('token')}
}
const headersConfig = {
  headers: {'Content-Type': 'application/json; charset=utf-8'}
}
/* Actions */
export function fetchingData (data = {}) {
  // console.log(data)
  return {
    type: FETCHING,
    payload: data
  }
}

export function logged (data = {}) {
  // console.log(data)
  return {
    type: LOG_IN,
    payload: {logged: true, profile: data}
  }
}
export function loginComplete (data = {}) {
  // console.log(data)
  return {
    type: LOGIN_COMPLETE,
    payload: data
  }
}
export function logoutUtil (profile = {}) {
  // console.log(profile)
  return {
    type: LOG_OUT,
    payload: profile
  }
}

export function login (data = {}, path = '/client/', pushRequire = false) {
  return function (dispatch) {
    dispatch(fetchingData({isFetching: true}))
    return axios.post(`${ROOT_URL}${path}login/`, JSON.stringify(data), config)
      .then(function (response) {
        const { token } = response.data
        console.log('response.data');
        let userType = (path === '/client/' ? '/passenger/' : '/driver/')

        setCookie('token', token, 6048e2, '/')
        setCookie('userType', userType.replace(/[\/]/g, ''), 6048e2, '/')
        // console.log(token)
        dispatch(loginComplete({'token': token}))
        // dispatch(fetchInfo(path, token))
        dispatch(cookieCheker('token'))
        if (pushRequire) {
          // console.log(`pushing to ${(path === '/client/' ? '/passenger/' : '/driver/')}`)
          dispatch(push((path === '/client/' ? '/passenger/' : '/driver/')))
        }
        dispatch(fetchingData({isFetching: false}))
      })
  }
}

export function getOtp (data = {}, path = '/client/') {
  // console.log(data, path)
  return function (dispatch) {
    debugger
    dispatch(fetchingData({isFetching: true}))
    return axios.post(`${ROOT_URL}${path}getotp/`, JSON.stringify(data), headersConfig)
      .then(function (response) {
        console.log(response)
        if (response.data.error) {
          dispatch(fetchingData({isFetching: false, otpSend: false}))
          console.log(response.data.note)
        } else {
          dispatch(receiveOtp(response))
          dispatch(fetchingData({isFetching: false, otpSend: true}))
          console.log(response.data.note)
        }
      })
  }
}

export function fetchInfo (path = '/client/', token = null) {
  return function (dispatch) {
    dispatch(fetchingData({isFetching: true}))
    return axios.get(`${ROOT_URL}${path}getinfo/`, {
      headers: {'Content-Type': 'application/json; charset=utf-8',
                'Authorization-Token': getCookie('token')}
    })
      .then(function (response) {
        dispatch(fetchingData({isFetching: false}))
        dispatch(logged(response.data))
        // нужно посмотреть зачем был пуш при каких условиях, а то когда залогинен пушит даже если не надо
        // dispatch(push((path === '/client/' ? '/passenger/' : '/driver/')))
      })
  }
}

export function logout (path = '', token = null) {
  // console.log(path, token)
  return function (dispatch, getState) {
    dispatch(fetchingData({isFetching: true}))
    return axios.get(`${ROOT_URL}${path}logout/`, {
      headers: {'Content-Type': 'application/json; charset=utf-8',
                'Authorization-Token': getState().cookieUtils.cookieToken}
    })
      .then(function (response) {
        // console.log(response)
        dispatch(clearOrderId({orderId: null}))
        dispatch(clearCookiesState({
          cookieToken: null,
          cookiePresent: false,
          userType: null
        }))
        dispatch(logoutUtil({logged: false, profile: null, otpSend: false}))
        dispatch(removeOTP({OTP: null}))
        dispatch(push((path === '/client/' ? '/passenger/' : '/driver/')))
        dispatch(closeSocketConnection())
        if (hasCookie('token')) {
          window.localStorage.removeItem('currentOrderId')
          removeCookie('token')
          removeCookie('userType')
        }
        dispatch(fetchingData({isFetching: false}))
      })
  }
}

export const actions = {
  fetchInfo,
  login,
  logged,
  logout,
  logoutUtil,
  fetchingData,
  getOtp,
  loginComplete
}

const ACTION_HANDLERS = {
  [LOG_IN]: (state, action) => Object.assign({}, state, {logged: true}, action.payload),
  [LOG_OUT]: (state, action) => Object.assign({}, state, action.payload),
  [FETCHING]: (state, action) => Object.assign({}, state, action.payload),
  [LOGIN_COMPLETE]: (state, action) => Object.assign({}, state, action.payload)
}

// ------------------------------------
// Reducer
// ------------------------------------
const initial = {
  logged: false,
  isFetching: false,
  profile: null,
  otpSend: false,
  token: null,
  error: null,
  notice: null
}

export default function auth (state = initial, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
