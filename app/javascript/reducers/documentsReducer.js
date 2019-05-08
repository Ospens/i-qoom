import {
  DOCUMENT_CREATE_SUCCESS,
  DOCUMENT_FETCH_SUCCESS,
  DOCUMENTS_FETCH_SUCCESS
} from '../actions/types'

const initialState = {
  allDocuments: [
    {
      id: 1,
      codification_kind: 'AWE-ECR-EOS-LET-0113',
      title: 'Tellus in hac habitasse',
      revision: '12.10.2018',
      version: '1.5',
      
    },
    {
      id: 2,
      codification_kind: 'AWE-ECR-EOS-LET-2018',
      title: 'Nulla posuere sollicitudin aliquam',
      revision: '12.10.2017',
      version: '1.2'
    }
  ]
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
      allProjects: action.payload
    }
  case DOCUMENT_FETCH_SUCCESS:
    return {
      ...state,
      current: action.payload
    }
  default:
    return state
  }
}

export default documentsReducer
