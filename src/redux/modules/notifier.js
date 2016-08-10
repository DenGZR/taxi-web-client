export const INCOMING_NOTICE = 'INCOMING_NOTICE'
export const CLEAR_NOTICE = 'CLEAR_NOTICE'
/* Actions */
export function incomingNotice (data = {}) {
  return {
    type: INCOMING_NOTICE,
    payload: data
  }
}
export function clearNotice (data = {}) {
  return {
    type: CLEAR_NOTICE,
    payload: data
  }
}

export const actions = {
  incomingNotice,
  clearNotice
}

const ACTION_HANDLERS = {
  [INCOMING_NOTICE]: (state, action) => Object.assign({}, state, action.payload),
  [CLEAR_NOTICE]: (state, action) => Object.assign({}, state, action.payload)

}

// messageType notice = false, error = true
const initial = {
  isFail: false,
  errorMessage: null,
  errorCode: null,
  notice: null
}

export default function notifier (state = initial, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
