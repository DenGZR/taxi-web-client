export const WSS_ROOT = 'api.psyco.com.ua/api/client/connect/?token='

export const CONNECTION_ESTABLISHED = 'CONNECTION_ESTABLISHED'
export const SOCKET_MSG = 'SOCKET_MSG'

export function connectionStatus (data = {}) {
  return {
    type: CONNECTION_ESTABLISHED,
    payload: data
  }
}
export function socketMessage (data = {}) {
  return {
    type: SOCKET_MSG,
    payload: data
  }
}

export const createConnectionWS = (response = {}) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      const TOKEN = getState().cookieUtils.cookieToken
      const userType = getState().cookieUtils.userType
      const socketOpen = getState().websockets.socketStatus.open
      // prevent double socket creation
      if (socketOpen) { return resolve() }
      // prevent socket creation when no token given or userType Driver

      if (userType !== 'passenger' && !TOKEN) { return resolve() }
      const socket = new WebSocket(`wss:${WSS_ROOT}${TOKEN}`)
      window.openConnection = socket

      socket.onopen = function () {
        dispatch(connectionStatus({
          open: true,
          close: false
        }))
        console.log('Соединение установлено.')
      }

      socket.onclose = function (event) {
        if (event.wasClean) {
          dispatch(connectionStatus({
            open: false,
            close: true
          }))
          console.log('Соединение закрыто чисто')
        } else {
          console.log('Обрыв соединения') // например, 'убит' процесс сервера
          window.localStorage.setItem('socetCloseClean', false)
          dispatch(connectionStatus({
            open: false,
            close: true,
            reason: event.reason,
            code: event.code
          }))
        }
      }

      socket.onmessage = function (event) {
        dispatch(socketMsgParser(JSON.parse(event.data)))
      }

      socket.onerror = function (error) {
        console.log('Ой, а мы вас не ждали!' + error.message)
      }
      resolve()
    })
  }
}

export const socketMsgParser = (result = {}) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      // console.log(result)
      if (result['message']) {
        console.log(result.message)
      }
      resolve()
    })
  }
}
export const closeSocketConnection = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      window.openConnection.close()
      resolve()
    })
  }
}

export const actions = {
  connectionStatus,
  createConnectionWS,
  socketMsgParser,
  socketMessage
}

const ACTION_HANDLERS = {
  [CONNECTION_ESTABLISHED]: (state, action) => {
    const socketStatus = Object.assign({}, state.socketStatus, action.payload)
    return Object.assign({}, state, {socketStatus: socketStatus})
  },
  [SOCKET_MSG]: (state, action) => Object.assign({}, state, action.payload)
}

const initial = {
  socketStatus: {
    open: false,
    close: true,
    reason: null,
    code: null
  },
  socketMsg: {
    state: null
  }
}

export default function websockets (state = initial, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
