import {
  GET_NEW_MEMBERS_LIST,
  GET_CURRENT_MEMBERS_LIST
} from '../actions/types'

const initialState = {
  newMembers: {
    fields: {},
    users: {}
  },
  oldMembers: {
    fields: {},
    users: {}
  }
}

const accessRightsReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_NEW_MEMBERS_LIST:
    return {
      ...state,
      newMembers: action.payload
    }
  case GET_CURRENT_MEMBERS_LIST:
    return {
      ...state,
      oldMembers: action.payload
    }
  default:
    return state
  }
}

export default accessRightsReducer
