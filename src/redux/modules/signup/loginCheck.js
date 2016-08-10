import axios from 'axios'

export const CHECK_RESULT = 'CHECK_RESULT'

export function checkResult (answer: boolean = true) {
  return {
    action: CHECK_RESULT,
    payload: answer
  }
}

export function checkLogin (login: number = null) {
  return function (dispatch) {
    return axios.get(`https://api.psyco.com.ua:443/api/client/check/?login=${login}`)
      .then(function (response) {
        let answer = (response.result === 'user_exist') ? true : false
        dispatch(checkResult(answer))
      })
  }
}

export const actions = {
  checkLogin
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHECK_RESULT]: (state, action) => Object.assign({}, state, {response: action.payload})
}
var loginStatus = {
  free: true
}

export default function registrationReducer (state = loginStatus, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
