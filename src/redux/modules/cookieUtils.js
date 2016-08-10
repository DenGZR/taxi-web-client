import { fetchInfo } from './auth'
import { getCurrentOrder } from './order'

export const PARSED_COOKIE = 'PARSED_COOKIE'
export const HAS_COOKIE = 'HAS_COOKIE'
export const CLEAR_COOKIES_STATE = 'CLEAR_COOKIES_STATE'

export function clearCookiesState (data = {}) {
  return {
    type: CLEAR_COOKIES_STATE,
    payload: data
  }
}
export function parseCookie (data = {}) {
  return {
    type: PARSED_COOKIE,
    payload: data
  }
}
export function isCookiePresent (data = {}) {
  return {
    type: HAS_COOKIE,
    payload: data
  }
}

// cookie helper
export function getCookie (sKey) {
  if (!sKey || !hasCookie(sKey)) {
    return null
  }
  return unescape(document.cookie.replace(new RegExp('(?:^|.*;\\s*)' +
  escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
  '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'), '$1'))
}

export function setCookie (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
  if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/.test(sKey)) {
    return
  }
  var sExpires = ''
  if (vEnd) {
    switch (typeof vEnd) {
      case 'number': sExpires = '; max-age=' + vEnd; break
      case 'string': sExpires = '; expires=' + vEnd; break
      case 'object': if (vEnd.hasOwnProperty('toGMTString')) { sExpires = '; expires=' + vEnd.toGMTString() } break
    }
  }
  document.cookie = escape(sKey) + '=' + escape(sValue) + sExpires +
  (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') +
  (bSecure ? '; secure' : '')
}

export function removeCookie (sKey) {
  if (!sKey || !hasCookie(sKey)) { return }
  var oExpDate = new Date()
  oExpDate.setDate(oExpDate.getDate() - 1)
  document.cookie = escape(sKey) + '=; expires=' + oExpDate.toGMTString() + '; path=/'
}

export function hasCookie (sKey) {
  return (new RegExp('(?:^|;\\s*)' + escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
}

export function getMyCookie (sKey) {
  return function (dispatch) {
    if (!sKey || (new RegExp('(?:^|;\\s*)' +
    escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
    '\\s*\\=')).test(document.cookie)) {
      return dispatch(isCookiePresent({cookiePresent: false}))
    }
    let result = unescape(document.cookie.replace(new RegExp('(?:^|.*;\\s*)' +
    escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
    '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'), '$1'))
    dispatch(isCookiePresent({cookiePresent: true, cookieToken: result}))
  }
}

export function cookieCheker (searchWord = '') {
  return function (dispatch) {
    let result = (new RegExp('(?:^|;\\s*)' +
    escape(searchWord).replace(/[\-\.\+\*]/g, '\\$&') +
    '\\s*\\=')).test(document.cookie)
    let token = null
    let userType = null
    if (result) {
      token = unescape(document.cookie.replace(new RegExp('(?:^|.*;\\s*)' +
      escape(searchWord).replace(/[\-\.\+\*]/g, '\\$&') +
      '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'), '$1'))
      userType = unescape(document.cookie.replace(new RegExp('(?:^|.*;\\s*)' +
      escape('userType').replace(/[\-\.\+\*]/g, '\\$&') +
      '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'), '$1'))
    }
    dispatch(isCookiePresent({cookiePresent: result, cookieToken: token, userType: userType}))
    const path = userType === 'passenger' ? '/client/' : '/driver/'
    if (token) {
      dispatch(fetchInfo(path))
    }
    if (userType === 'passenger') {
      dispatch(getCurrentOrder())
    }
    return result
  }
}

export const actions = {
  getCookie,
  setCookie,
  removeCookie,
  hasCookie,
  parseCookie,
  isCookiePresent,
  cookieCheker,
  getMyCookie,
  clearCookiesState
}

const ACTION_HANDLERS = {
  [PARSED_COOKIE]: (state, action) => Object.assign({}, state, action.payload),
  [HAS_COOKIE]: (state, action) => Object.assign({}, state, action.payload),
  [CLEAR_COOKIES_STATE]: (state, action) => Object.assign({}, state, action.payload)
}

const initial = {
  cookieToken: null,
  cookiePresent: false,
  userType: null
}

export default function cookieUtils (state = initial, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
