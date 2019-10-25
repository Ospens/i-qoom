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
      all: state.all.concat([action.payload]).sort((a, b) => new Date(b.time) - new Date(a.time))
    }
  case REMOVE_NOTIFICATION:
    return {
      ...state,
      all: state.all.filter((_, i) => i !== action.payload)
    }
  default:
    return state
  }
}

export default notificationsReducer
