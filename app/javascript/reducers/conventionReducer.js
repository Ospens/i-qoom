import {
  EDITING_CONVENTION,
  NEW_FIELD,
  ORDER_FILEDS
} from '../actions/types'

const groupFields = fields => {
  const sorted = fields.reduce((accumulator, currentValue) => {
    accumulator[currentValue.column].push(currentValue)
    return accumulator
  }, { 1: [], 2: [] })

  sorted[1].sort((a, b) => a.row - b.row)
  sorted[2].sort((a, b) => a.row - b.row)
  return sorted
}

const initialState = {
  conventions: [],
  creating_field: {
    parent_type: '',
    parent_id: null,
    kind: '',
    codification_kind: '',
    column: null,
    row: null,
    required: false,
    multiselect: false,
    title: '',
    command: '',
    document_field_values: []
  },
  current: {
    grouped_fields: [{}]
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
  case NEW_FIELD:
    return {
      ...state,
      current: {
        grouped_fields: action.payload
      }
    }
  case ORDER_FILEDS:
    return {
      ...state,
      current: {
        grouped_fields: action.payload
      }
    }
  default:
    return state
  }
}

export default conventionReducer
