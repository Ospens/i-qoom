import {
  PROJECT_CREATE_SUCCESS,
  PROJECTS_FETCH_SUCCESS,
  PROJECT_EXIT,
  PROJECT_FETCH_SUCCESS
} from '../actions/types'

const initialState = {
  allProjects: [],
  current: { }
}

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
  case PROJECT_CREATE_SUCCESS:
    return {
      ...state,
      project: action.payload.project[0]
    }
  case PROJECTS_FETCH_SUCCESS:
    return {
      ...state,
      allProjects: action.payload
    }
  case PROJECT_FETCH_SUCCESS:
    return {
      ...state,
      current: action.payload
    }
  case PROJECT_EXIT:
    return {
      ...state,
      current: initialState.current
    }
  default:
    return state
  }
}

export default projectReducer
