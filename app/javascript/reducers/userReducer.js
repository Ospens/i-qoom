import {
  SIGN_IN_USER,
  SIGN_UP_USER,
  SIGN_OUT_USER
} from '../actions/types'

const initialState = {
  authStatus: null,
  token: null,
  exp: 0,
  user_id: null,
  city: null,
  country: null,
  email: null,
  first_name: null,
  last_name: null,
  state: null,
  updated_at: null,
  username: null,
  iQoomAdmin: false,
  newUser: {},
  module_access: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case SIGN_IN_USER:
    return {
      ...state,
      ...action.payload,
      authStatus: true
    }
  case SIGN_UP_USER:
    return {
      ...state,
      newUser: action.payload
    }
  case SIGN_OUT_USER:
    return {
      ...initialState,
      newUser: state.newUser
    }
  default:
    return state
  }
}

export default userReducer
