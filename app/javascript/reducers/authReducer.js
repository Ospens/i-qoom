import {
  SIGN_IN_USER,
  SIGN_OUT_USER
} from '../actions/types'

const initialState = {
  authStatus: false,
  token: null,
  exp: null,
  user_id: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case SIGN_IN_USER:
    return {
      ...state,
      ...action.payload.expiry,
      token: action.payload.token,
      authStatus: true
    }
  case SIGN_OUT_USER:
    return initialState
  default:
    return state
  }
}

export default authReducer
