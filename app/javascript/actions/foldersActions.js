import axios from 'axios'
import { initialize } from 'redux-form'
import {
  FOLDER_CREATED,
  DOCUMENT_ADDED,
  EDITING_FOLDER,
  FOLDERS_FETCHED
} from './types'
import { errorNotify, successNotify } from '../elements/Notices'

const folderCreated = payload => ({
  type: FOLDER_CREATED,
  payload
})

const documentAddedToFolder = payload => ({
  type: DOCUMENT_ADDED,
  payload
})

const foldersFetched = payload => ({
  type: FOLDERS_FETCHED,
  payload
})

const editingFolder = payload => ({
  type: EDITING_FOLDER,
  payload
})

export const startFetchFolders = (projectId, docId = 28) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { Authorization: token }
  const params = docId ? { document_id: docId } : {}

  return (
    axios.get(`/api/v1/projects/${projectId}/document_folders`, { params, headers })
      .then(response => {
        dispatch(foldersFetched(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const startEditFolder = folderId => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { Authorization: token }

  return (
    axios.get(`/api/v1/document_folders/${folderId}/edit`, { headers })
      .then(response => {
        dispatch(initialize('folder_form', response.data))
        dispatch(editingFolder(response.data))
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

export const startUpdateFolder = values => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }
  const request = {
    document_folder: {
      // project_id: projectId,
      ...values
    }
  }

  return (
    axios.post('/api/v1/document_folders/', request, headers)
      .then(response => {
        console.log(response)
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const addDocumentToFolders = (docId, ids) => (dispatch, getState) => {
  const { user: { token }, folders: { allFolders } } = getState()
  const headers = { headers: { Authorization: token } }
  const request = {
    document_id: docId,
    document_folder_ids: ids
  }

  return (
    axios.post('/api/v1/document_folders/add_document_to_folders', request, headers)
      .then(() => {
        const updatedFolders = allFolders.map(el => (ids.includes(el.id)
          ? { ...el, enabled: true }
          : el))
        dispatch(documentAddedToFolder(updatedFolders))
        successNotify('Copied to folders')
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}
