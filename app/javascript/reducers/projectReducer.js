import {
  PROJECT_CREATED_SUCCESS,
  PROJECT_UPDATED_SUCCESS,
  PROJECTS_FETCH_SUCCESS,
  PROJECT_ADMIN_DELETED,
  PROJECT_ADMIN_UPDATED,
  PROJECT_EXIT,
  PROJECT_FETCH_SUCCESS
} from '../actions/types'

const initialState = {
  allProjects: [],
  current: {
    admins: []
  }
}

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
  case PROJECT_CREATED_SUCCESS:
    return {
      ...state,
      project: action.payload.project[0]
    }
  case PROJECT_UPDATED_SUCCESS:
    return {
      ...state,
      current: action.payload.project[0]
    }
  case PROJECT_ADMIN_UPDATED:
    return {
      ...state,
      current: {
        ...state.current,
        admins: state.current.admins.map(admin => (admin.id === action.payload.id
          ? action.payload
          : admin))
      }
    }
  case PROJECT_ADMIN_DELETED:
    return {
      ...state,
      current: {
        ...state.current,
        admins: state.current.admins.filter(admin => admin.id !== action.payload)
      }
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
