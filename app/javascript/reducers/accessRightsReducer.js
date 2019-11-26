import {
  GET_NEW_MEMBERS_LIST,
  GET_NEW_TEAMS_LIST,
  GET_OLD_TEAMS_LIST,
  UPDATE_NEW_TEAMS_LIST,
  UPDATE_OLD_TEAMS_LIST,
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
  case GET_OLD_TEAMS_LIST:
    return {
      ...state,
      oldTeams: action.payload.teams,
      fields: action.payload.fields
    }
  case GET_CURRENT_TEAMS_LIST:
    return {
      ...state,
      oldTeams: action.payload.teams,
      fields: action.payload.fields
      }
  case UPDATE_NEW_TEAMS_LIST:
    const newTeams = action.payload.teams
    return {
      ...state,
      newTeams: state.newTeams.map(nt =>
        newTeams.findIndex(t => t.id === nt.id) > -1 ? newTeams.find(t => t.id === nt.id) : nt)
    }
  case UPDATE_OLD_TEAMS_LIST:
    const oldTeams = action.payload.teams
    return {
      ...state,
      oldTeams: state.oldTeams.map(nt =>
        oldTeams.findIndex(t => t.id === nt.id) > -1 ? oldTeams.find(t => t.id === nt.id) : nt)
    }
  default:
    return state
  }
}

export default accessRightsReducer
