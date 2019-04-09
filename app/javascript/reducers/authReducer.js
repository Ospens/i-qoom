import {
  SIGN_IN_USER,
  SIGN_UP_USER,
  SIGN_OUT_USER
} from '../actions/types'

const localToken = sessionStorage.getItem('jwtToken')
const initialState = {
  authStatus: localToken !== null,
  token: localToken,
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
  case SIGN_UP_USER:
    return {
      ...state
    }
  case SIGN_OUT_USER:
    return {
      ...initialState,
      authStatus: false,
      token: null
    }
  default:
    return state
  }
}

export default authReducer
