import {
  PROJECT_CREATE_SUCCESS,
  PROJECTS_FETCH_SUCCESS,
  PROJECT_FETCH_SUCCESS
} from '../actions/types'

const initialState = {
  allProjects: [],
  current: null
}

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
  case PROJECT_CREATE_SUCCESS:
    return {
      ...state,
      ...action.payload
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
  default:
    return state
  }
}

export default projectReducer
