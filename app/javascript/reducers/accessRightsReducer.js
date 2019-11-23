import {
  GET_NEW_MEMBERS_LIST,
  GET_NEW_TEAMS_LIST,
  GET_CURRENT_TEAMS_LIST,
  GET_CURRENT_MEMBERS_LIST
} from '../actions/types'

const initialState = {

  fields: {},
  newTeams: [],
  oldTeams: [],
  newMembers: [],
  oldMembers: []
}

const accessRightsReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_NEW_MEMBERS_LIST:
    return {
      ...state,
      newMembers: action.payload.users,
      fields: action.payload.fields
    }
  case GET_CURRENT_MEMBERS_LIST:
    return {
      ...state,
      oldMembers: action.payload.users,
      fields: action.payload.fields
    }
  case GET_NEW_TEAMS_LIST:
    return {
      ...state,
      newTeams: action.payload.teams,
      fields: action.payload.fields
    }
  case GET_CURRENT_TEAMS_LIST:
    return {
      ...state,
      oldTeams: action.payload.teams,
      fields: action.payload.fields
    }
  default:
    return state
  }
}

export default accessRightsReducer
