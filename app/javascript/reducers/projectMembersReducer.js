import {
  PROJECT_MEMBERS_FETCHED_SUCCESS,
  PROJECT_MEMBER_CREATED,
  PROJECT_MEMBER_UPDATED,
  CREATING_PROJECT_MEMBER
} from '../actions/types'

const initialState = {
  members: [],
  creating: { }
}

const projectMembersReducer = (state = initialState, action) => {
  switch (action.type) {
  case PROJECT_MEMBERS_FETCHED_SUCCESS:
    return {
      ...state,
      members: action.payload
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
  default:
    return state
  }
}

export default projectMembersReducer
