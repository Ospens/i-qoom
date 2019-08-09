import axios from 'axios'
import { SubmissionError } from 'redux-form'
import {
  DOCUMENTS_FETCH_SUCCESS,
  DOCUMENT_FETCH_SUCCESS,
  EDIT_DOCUMENT,
  CREATING_DOCUMENT
} from './types'
import { fieldByColumn } from './conventionActions'
import { errorNotify, successNotify } from '../elements/Notices'

const paramsToFormData = (data, params, preceding = '') => {
  let newData = data
  for (const [k, v] of Object.entries(params)) {
    if (v instanceof Object && v.constructor === Array) {
      if (k === 'file') {
        newData.append(`${preceding}${k}`, v[0])
      } else if (k === 'emails') {
        v.forEach(el => newData.append(`${preceding}${k}[]`, el))
      } else {
        newData = paramsToFormData(newData, v, `${preceding}[${k}][]`)
      }
    } else if (v instanceof Object && v.constructor === Object) {
      const prefix = Number(k) > -1 ? `${preceding}` : `${preceding}[${k}]`
      newData = paramsToFormData(newData, v, prefix)
    } else if (v !== null && v !== undefined) {
      newData.append(`${preceding}${k}`, v)
    }
  }
  return newData
}

const documentsFetched = payload => ({
  type: DOCUMENTS_FETCH_SUCCESS,
  payload
})

const creatingDocument = payload => ({
  type: CREATING_DOCUMENT,
  payload
})

const documentFetched = payload => ({
  type: DOCUMENT_FETCH_SUCCESS,
  payload
})

const editDocument = payload => ({
  type: EDIT_DOCUMENT,
  payload
})

export const startFetchDocuments = (projectId, history) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/documents`, headers)
      .then(response => {
        dispatch(documentsFetched(response.data.documents))
      })
      .catch(({ response }) => {
        if (response.status === 302) {
          history.push({ pathname: `/dashboard${response.data.location}` })
          errorNotify('Please, create a convention')
        } else {
          errorNotify('Something went wrong')
        }
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

export const startCreateDocument = (projectId, values) => (dispatch, getState) => {
  const { token } = getState().user
  const headers = { Authorization: token, 'Content-Type': 'multipart/form-data' }
  let formData = new FormData()

  const formValues = {
    document: { ...values }
  }

  formData = paramsToFormData(formData, formValues, '')
  return (
    axios({
      method: 'post',
      url: `/api/v1/projects/${projectId}/documents/`,
      data: formData,
      headers
    }).then(() => {
      successNotify('Document successfully created')
    })
      .catch(response => {
        errorNotify('Something went wrong')
        throw new SubmissionError(response)
      })
  )
}

export const startUpdateDocument = (documentId, values) => (dispatch, getState) => {
  const { token } = getState().user
  const headers = { Authorization: token, 'Content-Type': 'multipart/form-data' }
  let formData = new FormData()

  const formValues = {
    document: { ...values }
  }

  formData = paramsToFormData(formData, formValues, '')
  return (
    axios({
      method: 'put',
      url: `/api/v1/documents/${documentId}/`,
      data: formData,
      headers
    }).then(() => {
      successNotify('Document successfully updated')
    })
      .catch(response => {
        errorNotify('Something went wrong')
        throw new SubmissionError(response)
      })
  )
}

export const startFetchDocument = documentId => (dispatch, getState) => {
  const { token } = getState().user
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/documents/${documentId}`, headers)
      .then(response => {
        dispatch(documentFetched(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const startEditDocument = documentId => (dispatch, getState) => {
  const { token } = getState().user
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/documents/${documentId}/edit`, headers)
      .then(response => {
        const { data } = response
        const sortedData = fieldByColumn(data)
        dispatch(editDocument(sortedData))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}
