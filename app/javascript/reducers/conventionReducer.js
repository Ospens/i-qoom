import {
  EDITING_CONVENTION,
  UPDATED_FIELDS,
  ORDER_FIELDS,
  EDITING_FIELD,
  REMOVE_FIELD,
  DISCARD_EDIT_VALUES,
  CONVENTION_UPDATED,
  DISCARD_CONVENTION
} from '../actions/types'

const initialState = {
  conventions: [],
  editingField: {},
  current: {
    document_field_values: [],
    grouped_fields: [{}]
  },
  currentDefault: {},
  changed: false
}

const conventionReducer = (state = initialState, action) => {
  switch (action.type) {
  case EDITING_CONVENTION:
    return {
      ...state,
      current: {
        ...action.payload
      },
      currentDefault: {
        ...action.payload
      }
    }
  case CONVENTION_UPDATED:
    return {
      ...state,
      current: {
        ...state.current,
        ...action.payload
      },
      currentDefault: {
        ...state.current,
        ...action.payload
      },
      changed: false
    }
  case DISCARD_CONVENTION:
    return {
      ...state,
      current: {
        ...state.currentDefault
      },
      changed: false
    }
  case UPDATED_FIELDS:
    return {
      ...state,
      current: {
        ...state.current,
        grouped_fields: action.payload
      },
      editingField: {},
      changed: true
    }
  case REMOVE_FIELD:
    return {
      ...state,
      current: {
        ...state.current,
        grouped_fields: action.payload
      },
      changed: true
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
  case ORDER_FIELDS:
    return {
      ...state,
      current: {
        ...state.current,
        grouped_fields: action.payload
      },
      changed: true
    }
  default:
    return state
  }
}

export default conventionReducer
