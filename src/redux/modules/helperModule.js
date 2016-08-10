export const DROPDOWN = 'DROPDOWN'

/* Actions */
export function dropdown (data = {}) {
  return {
    type: DROPDOWN,
    payload: data
  }
}

export function showMenu () {
  return function (dispatch, getState) {
    let data = getState().helperModule.dropdown.showDropdown
    dispatch(dropdown({showDropdown: !data}))
  }
}

export const actions = {
  showMenu,
  dropdown
}
const ACTION_HANDLERS = {
  [DROPDOWN]: (state, action) => Object.assign({}, state, {dropdown: action.payload})

}

const initial = {
  dropdown: {
    showDropdown: false
  }
}

export default function helperModule (state = initial, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
