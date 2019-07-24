import {
  DOCUMENT_CREATE_SUCCESS,
  DOCUMENT_FETCH_SUCCESS,
  DOCUMENTS_FETCH_SUCCESS,
  CREATING_DOCUMENT
} from '../actions/types'

const initialState = {
  allDocuments: [],
  newDocumentFields: {
    grouped_fields: {
      1: [{}],
      2: [{}]
    }
  },
  current: {
    document_fields: []
  }
}

const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'DOCUMENT_TEST':
    return initialState
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
      newDocumentFields: {
        ...state.newDocumentFields,
        ...action.payload
      }
    }
  default:
    return state
  }
}

export default documentsReducer
