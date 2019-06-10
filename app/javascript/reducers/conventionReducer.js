import {
  EDITING_CONVENTION,
  UPDATED_FIELDS,
  ORDER_FILEDS,
  EDITING_FIELD,
  REMOVE_FIELD,
  DISCARD_EDIT_VALUES
} from '../actions/types'

const initialState = {
  conventions: [],
  editingField: {},
  current: {
    document_field_values: [],
    grouped_fields: [{}]
  }
}

const conventionReducer = (state = initialState, action) => {
  switch (action.type) {
  case EDITING_CONVENTION:
    return {
      ...state,
      current: {
        ...action.payload
      }
    }
  case UPDATED_FIELDS:
    return {
      ...state,
      current: {
        grouped_fields: action.payload
      },
      editingField: {}
    }
  case REMOVE_FIELD:
    return {
      ...state,
      current: {
        grouped_fields: action.payload
      }
    }
  case EDITING_FIELD:
    return {
      ...state,
      editingField: action.payload
    }
  case DISCARD_EDIT_VALUES:
    return {
      ...state,
      editingField: {}
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
