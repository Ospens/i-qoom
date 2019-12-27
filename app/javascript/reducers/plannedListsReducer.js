import {
  PLANNED_LISTS_FETCHED,
  PLANNED_LIST_UPDATED,
  PLANNED_LIST_FETCHED,
  PLANNED_LIST_ADDED,
  EDIT_PLANNED_LIST
} from '../actions/types'

const initialState = {
  all: [],
  current: {},
  edit: {}
}

const plannedListsReducer = (state = initialState, action) => {
  switch (action.type) {
  case PLANNED_LISTS_FETCHED:
    return {
      ...state,
      all: action.payload
    }
  case PLANNED_LIST_UPDATED:
    return {
      ...state,
      all: state.all.map(pl => (pl.id === action.payload.id ? action.payload : pl))
    }
  case PLANNED_LIST_ADDED:
    return {
      ...state,
      all: state.all.concat(action.payload)
    }
  case PLANNED_LIST_FETCHED:
    return {
      ...state,
      current: action.payload
    }
  case EDIT_PLANNED_LIST:
    return {
      ...state,
      edit: action.payload
    }
  default:
    return state
  }
}

export default plannedListsReducer
