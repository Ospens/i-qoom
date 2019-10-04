import {
  EDITING_CONVENTION,
  CONVENTION_UPDATED
} from '../actions/types'

const initialState = {
  conventions: [],
  current: {
    document_fields: [],
    grouped_fields: {
      column_1: [{}],
      column_2: [{}]
    }
  }
}

const conventionReducer = (state = initialState, action) => {
  switch (action.type) {
  case EDITING_CONVENTION:
    return {
      ...state,
      current: action.payload
    }
  case CONVENTION_UPDATED:
    return {
      ...state,
      current: {
        ...state.current,
        ...action.payload
      }
    }
  default:
    return state
  }
}

export default conventionReducer
