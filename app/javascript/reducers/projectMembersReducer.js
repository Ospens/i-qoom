import {
  ACTIVE_MEMBERS_FETCHED_SUCCESS,
  PENDING_MEMBERS_FETCHED_SUCCESS,
  PROJECT_MEMBER_CREATED,
  PROJECT_MEMBER_UPDATED,
  CREATING_PROJECT_MEMBER,
  DISCIPLINES_DELETED,
  DISCIPLINES_UPDATED,
  DISCIPLINES_FETCHED,
  DISCIPLINE_CREATED,
  ROLES_FETCHED,
  ROLE_UPDATED,
  ROLE_DELETED,
  ROLE_CREATED
} from '../actions/types'

const initialState = {
  activeMembers: [],
  pendingMembers: [],
  disciplines: [],
  roles: [],
  creating: {
    company_types: [],
    employment_types: []
  }
}

const projectMembersReducer = (state = initialState, action) => {
  switch (action.type) {
  case ACTIVE_MEMBERS_FETCHED_SUCCESS:
    return {
      ...state,
      ...action.payload,
      activeMembers: action.payload.members
    }
  case PENDING_MEMBERS_FETCHED_SUCCESS:
    return {
      ...state,
      ...action.payload,
      pendingMembers: action.payload.members
    }
  case CREATING_PROJECT_MEMBER:
    return {
      ...state,
      creating: action.payload
    }
  case PROJECT_MEMBER_UPDATED:
    return {
      ...state,
      members: state.members.filter(item => item.id !== action.payload.id).concat(action.payload)
    }
  case PROJECT_MEMBER_CREATED:
    return {
      ...state,
      members: state.members.concat([action.payload])
    }
  case DISCIPLINE_CREATED:
    return {
      ...state,
      disciplines: state.disciplines.concat([action.payload])
    }
  case DISCIPLINES_FETCHED:
    return {
      ...state,
      disciplines: action.payload
    }
  case DISCIPLINES_DELETED:
    return {
      ...state,
      disciplines: state.disciplines.filter(item => item.id !== action.payload.id)
    }
  case DISCIPLINES_UPDATED:
    return {
      ...state,
      disciplines: state.disciplines
        .filter(item => item.id !== action.payload.id)
        .concat(action.payload)
    }
  case ROLE_CREATED:
    return {
      ...state,
      roles: state.roles.concat([action.payload])
    }
  case ROLES_FETCHED:
    return {
      ...state,
      roles: action.payload
    }
  case ROLE_DELETED:
    return {
      ...state,
      roles: state.roles.filter(item => item.id !== action.payload.id)
    }
  case ROLE_UPDATED:
    return {
      ...state,
      roles: state.roles.filter(item => item.id !== action.payload.id).concat(action.payload)
    }
  default:
    return state
  }
}

export default projectMembersReducer
