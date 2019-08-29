import {
  DOCUMENT_CREATE_SUCCESS,
  DOCUMENT_FETCH_SUCCESS,
  DOCUMENTS_FETCH_SUCCESS,
  EDIT_DOCUMENT,
  REVISIONS_AND_VERSIONS_FETCH__SUCCESS,
  CREATING_DOCUMENT
} from '../actions/types'

const initialState = {
  allDocuments: [],
  revisions: [],
  documentFields: {
    document_fields: [],
    grouped_fields: {
      column_1: [{}],
      column_2: [{}]
    }
  },
  current: {
    document_fields: []
  }
}

const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
  case DOCUMENT_CREATE_SUCCESS:
    return {
      ...state,
      ...action.payload
    }
  case DOCUMENTS_FETCH_SUCCESS:
    return {
      ...state,
      allDocuments: action.payload
    }
  case DOCUMENT_FETCH_SUCCESS:
    return {
      ...state,
      current: action.payload
    }
  case CREATING_DOCUMENT:
    return {
      ...state,
      documentFields: {
        ...state.documentFields,
        ...action.payload
      }
    }
  case EDIT_DOCUMENT:
    return {
      ...state,
      documentFields: {
        ...state.documentFields,
        ...action.payload
      }
    }
  case REVISIONS_AND_VERSIONS_FETCH__SUCCESS:
    return {
      ...state,
      revisions: action.payload
    }
  default:
    return state
  }
}

export default documentsReducer
