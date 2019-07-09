import axios from 'axios'
import {
  DOCUMENTS_FETCH_SUCCESS,
  CREATING_DOCUMENT
} from './types'
import { fieldByColumn } from './conventionActions'
import { errorNotify } from '../elements/Notices'

const documentsFetched = payload => ({
  type: DOCUMENTS_FETCH_SUCCESS,
  payload
})

const creatingDocument = payload => ({
  type: CREATING_DOCUMENT,
  payload
})

export const startFetchDocuments = projectId => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/documents`, headers)
      .then(response => {
        dispatch(documentsFetched(response.data.location))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const newDocument = projectId => (dispatch, getState) => {
  const { token } = getState().user
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/documents/new`, headers)
      .then(response => {
        const { data } = response
        const sortedData = fieldByColumn(data)
        dispatch(creatingDocument(sortedData))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}
