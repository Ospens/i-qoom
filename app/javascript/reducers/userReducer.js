import {
  SIGN_IN_USER,
  SIGN_UP_USER,
  SIGN_OUT_USER,
  FETCH_USER_SUCCESS
} from '../actions/types'

const token = localStorage.getItem('jwt-iqoom-token')
const tokenExp = localStorage.getItem('jwt-iqoom-token-expiry')
const currentDate = new Date()
const localToken = new Date(Number(tokenExp)) <= currentDate ? token : null

const initialState = {
  authStatus: localToken !== null,
  token: localToken,
  exp: null,
  user_id: null,
  id: null,
  city: null,
  country: null,
  email: null,
  first_name: null,
  last_name: null,
  state: null,
  updated_at: null,
  username: null,
  isAdmin: false
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
      ...state
    }
  case SIGN_OUT_USER:
    return {
      ...initialState,
      authStatus: false,
      token: null
    }
  case FETCH_USER_SUCCESS:
    return {
      ...state,
      ...action.payload.data
    }
  default:
    return state
  }
}

export default userReducer
