import {
  FOLDER_CREATED,
  DOCUMENT_ADDED,
  EDITING_FOLDER,
  FOLDER_UPDATED,
  FOLDERS_FETCHED
} from '../actions/types'

const initialState = {
  allFolders: [],
  editing: {}
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
  case EDITING_FOLDER:
    return {
      ...state,
      editing: action.payload
    }
  case FOLDER_UPDATED:
    return {
      ...state,
      editing: action.payload
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
