import React from 'react'
import {
  PROJECT_CREATED_SUCCESS,
  SET_PAGE_TITLE,
  PROJECT_UPDATED_SUCCESS,
  PROJECTS_FETCH_SUCCESS,
  PROJECT_ADMIN_DELETED,
  PROJECT_ADMIN_UPDATED,
  PROJECT_CODE_UPDATED,
  PROJECT_EXIT,
  PROJECT_FETCH_SUCCESS
} from '../actions/types'

const initialState = {
  allProjects: [],
  current: {
    admins: [],
    project_code: undefined
  },
  title: <h2>I-Qoom</h2>
}

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_PAGE_TITLE:
    return {
      ...state,
      title: action.payload
    }
  case PROJECT_CREATED_SUCCESS:
    return {
      ...state,
      current: action.payload
    }
  case PROJECT_UPDATED_SUCCESS:
    return {
      ...state,
      current: action.payload
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
  case PROJECT_CODE_UPDATED:
    return {
      ...state,
      current: {
        ...state.current,
        project_code: action.payload
      }
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
