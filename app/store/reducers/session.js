import {get as getPersisted, set as setPersisted} from "local-preferences"

const defaultState = {
  token: getPersisted("token", null),
  user: getPersisted("user", null)
}

export default function sessionReducer(state = defaultState, action) {
  if (action.type === "AUTHENTICATE_SESSION") {
    setPersisted("token", action.token)
    setPersisted("user", action.user)

    return {
      ...state,
      token: action.token,
      user: action.user
    }
  }

  if (action.type === "UNAUTHENTICATE_SESSION") {
    return {
      ...state,
      token: null
    }
  }

  return state
}
