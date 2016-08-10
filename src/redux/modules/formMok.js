/* Constants */
export const POST_LOGIN = 'POST_LOGIN'

/* Actions */
export function formAdd (props: object = {}): Action {
  console.log(props)

  return {
    type: POST_LOGIN,
    payload: props
  }
}

export const actions = {
  formAdd
}
