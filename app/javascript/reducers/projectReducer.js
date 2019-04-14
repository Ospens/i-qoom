import {
  PROJECT_CREATE_SUCCESS,
  PROJECTS_FETCH_SUCCESS
} from '../actions/types'

const initialState = {
  allProjects: [],
  currentProject: null
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
  default:
    return state
  }
}

export default projectReducer
