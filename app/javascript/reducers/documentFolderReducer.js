import {

} from '../actions/types'

const initialState = {
  allFolders: [
    {
      id: 1,
      title: 'My concerns',
      disabled: false
    },
    {
      id: 2,
      title: 'Not relevant for me',
      disabled: false
    },
    {
      id: 3,
      title: 'All documents',
      disabled: true
    },
    {
      id: 4,
      title: 'My documents',
      disabled: true
    }
  ]
}

const documentFolderReducer = (state = initialState, action) => {
  switch (action.type) {
  default:
    return state
  }
}

export default documentFolderReducer
