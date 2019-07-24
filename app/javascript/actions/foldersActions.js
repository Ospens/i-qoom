import axios from 'axios'
import {
  FOLDER_CREATED
} from './types'
import { errorNotify, successNotify } from '../elements/Notices'

const folderCreated = payload => ({
  type: FOLDER_CREATED,
  payload
})

const documentAddedToFolder = payload => ({
  type: FOLDER_CREATED,
  payload
})

const folderFetched = payload => ({
  type: FOLDER_CREATED,
  payload
})

export const startFetchFolders = (projectId, values) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }
  const request = {
    document_folder: {
      project_id: projectId,
      ...values
    }
  }

  return (
    axios.get('/api/v1/document_folders/', request, headers)
      .then(response => {
        dispatch(folderFetched(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const startCreateFolder = (projectId, values) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }
  const request = {
    document_folder: {
      project_id: projectId,
      ...values
    }
  }

  return (
    axios.post('/api/v1/document_folders/', request, headers)
      .then(response => {
        dispatch(folderCreated(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const addDocumentToFolders = (docId, ids) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }
  const request = {
    document_id: docId,
    document_folder_ids: ids
  }

  return (
    axios.post('/api/v1/document_folders/add_document_to_folders', request, headers)
      .then(response => {
        dispatch(documentAddedToFolder(response.data))
        successNotify('Copied to folders')
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}
