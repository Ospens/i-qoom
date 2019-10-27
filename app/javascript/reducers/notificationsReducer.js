import {
  TOGGLE_STATE,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from '../actions/types'

const initialState = {
  open: false,
  all: []
}

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
  case TOGGLE_STATE:
    return {
      ...state,
      open: action.payload || !state.open
    }
  case ADD_NOTIFICATION:
    return {
      ...state,
      all: state.all
        .concat([action.payload]).sort((a, b) => new Date(b.time) - new Date(a.time))
        .filter((_, i) => i < 10)
    }
  case REMOVE_NOTIFICATION:
    return {
      ...state,
      all: state.all
        .filter((_, i) => i !== action.payload)
        .filter((_, i) => i < 10)
    }
  default:
    return state
  }
}

export default notificationsReducer
