import {
  PROJECT_CREATED
} from '../actions/types'

const initialState = {
  project_name: null
}

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
  case PROJECT_CREATED:
    return {
      ...state,
      ...action.payload
    }
  default:
    return state
  }
}

export default projectReducer
