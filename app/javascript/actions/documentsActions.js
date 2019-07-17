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

const paramsToFormData = (data, params, preceding = '') => {
  let newData = data
  for (const [k, v] of Object.entries(params)) {
    if (v instanceof Object && v.constructor === Array) {
      if (k === 'files') {
        newData.append(`${preceding}${k}[]`, v[0])
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
    }).then(response => {
      const { data } = response
      const sortedData = fieldByColumn(data)
      dispatch(creatingDocument(sortedData))
    })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}
