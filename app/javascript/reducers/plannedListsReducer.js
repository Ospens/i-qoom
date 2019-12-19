import { PLANNED_LISTS_FETCHED, PLANNED_LIST_UPDATED } from '../actions/types'

const initialState = {
  all: [],
  current: []
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
  default:
    return state
  }
}

export default plannedListsReducer
