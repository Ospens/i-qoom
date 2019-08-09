import {
  FOLDER_CREATED,
  DOCUMENT_ADDED,
  FOLDERS_FETCHED
} from '../actions/types'

const initialState = {
  allFolders: []
}

const documentFolderReducer = (state = initialState, action) => {
  switch (action.type) {
  case FOLDERS_FETCHED:
    return {
      ...state,
      allFolders: action.payload
    }
  case DOCUMENT_ADDED:
    return {
      ...state,
      allFolders: action.payload
    }
  case FOLDER_CREATED:
    return {
      ...state,
      allFolders: [
        ...state.allFolders,
        action.payload
      ]
    }
  default:
    return state
  }
}

export default documentFolderReducer
