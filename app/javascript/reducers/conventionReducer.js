import {
  EDITING_CONVENTION
} from '../actions/types'

const groupFields = fields => {
  const sorted = fields.reduce((accumulator, currentValue, index, array) => {
    accumulator[currentValue.column].push(currentValue)
    return accumulator
  }, { 1: [], 2: [] })

  sorted[1].sort((a, b) => { return a.row - b.row })
  sorted[2].sort((a, b) => { return a.row - b.row })
  return sorted
}

const initialState = {
  conventions: [],
  current: {
    grouped_fields: []
  }
}

const conventionReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDITING_CONVENTION:
    return {
      ...state,
      current: {
        ...action.payload,
        grouped_fields: groupFields(action.payload.document_fields)
      }
    }
  default:
    return state
  }
}

export default conventionReducer
