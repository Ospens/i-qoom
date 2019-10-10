import axios from 'axios'
import { SubmissionError } from 'redux-form'
import {
  DOCUMENTS_FETCH_SUCCESS,
  DOCUMENT_FETCH_SUCCESS,
  EDIT_DOCUMENT,
  REVISIONS_AND_VERSIONS_FETCH__SUCCESS,
  DOCUMENTS_FETCHED_WITHOUT_FILTERS_SUCCESS,
  TOGGLE_FILTERS,
  CREATING_DOCUMENT
} from './types'
import { fieldByColumn } from './conventionActions'
import { errorNotify, successNotify } from '../elements/Notices'

export const paramsToFormData = (data, params, preceding = '') => {
  let newData = data
  for (const [k, v] of Object.entries(params)) {
    if (v instanceof Object && v.constructor === Array) {
      if (k === 'file') {
        newData.append(`${preceding}${k}`, (v[0] ? v[0] : new File([], '')))
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
    } /* else if (v === null && k === 'logo') {
      // TODO: waiting a backend part
      newData.append(`${preceding}${k}`, v)
    } */
  }
  return newData
}

const regexp = /(filename=")(.*)"/i

const downloadFile = response => {
  const disposition = response.headers['content-disposition'].match(regexp)
  const title = disposition ? disposition[2] : 'file.pdf'
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url

  link.setAttribute('download', title)
  document.body.appendChild(link)
  link.click()
}

const documentsFetched = payload => ({
  type: DOCUMENTS_FETCH_SUCCESS,
  payload
})

const documentsFetchedWithoutFilters = payload => ({
  type: DOCUMENTS_FETCHED_WITHOUT_FILTERS_SUCCESS,
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

const getRevAndVer = payload => ({
  type: REVISIONS_AND_VERSIONS_FETCH__SUCCESS,
  payload
})

export const startFetchDocuments = projectId => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/documents`, headers)
      .then(response => {
        dispatch(documentsFetched(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const toggleFilters = (projectId, filter) => (dispatch, getState) => {
  dispatch(({ type: TOGGLE_FILTERS, payload: filter }))

  const { user: { token }, documents: { discipline, originating_companies, document_types } } = getState()
  const headers = { Authorization: token }
  const params = {
    discipline: discipline.filter(el => el.checked).map(v => v.title),
    originating_companies: originating_companies.filter(el => el.checked).map(v => v.title),
    document_types: document_types.filter(el => el.checked).map(v => v.title)
  }

  return (
    axios.get(`/api/v1/projects/${projectId}/documents`, { params, headers })
      .then(response => {
        dispatch(documentsFetchedWithoutFilters(response.data))
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

export const getRevisionsAndVersions = docId => (dispatch, getState) => {
  const { token } = getState().user
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/documents/${docId}/revisions_and_versions`, headers)
      .then(response => {
        dispatch(getRevAndVer(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const downloadList = (projectId, docIds, types) => (dispatch, getState) => {
  const { token } = getState().user
  const headers = { Authorization: token }
  const params = docIds ? { document_ids: [docIds] } : {}

  return types.map(type => (
    axios({
      url: `/api/v1/projects/${projectId}/documents/download_list.${type}`,
      method: 'GET',
      params,
      headers,
      responseType: 'blob' // important
    })
      .then(response => {
        downloadFile(response)
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  ))
}

export const downloadDetailFile = docId => (dispatch, getState) => {
  const { token } = getState().user
  const headers = { Authorization: token }

  return (
    axios({
      url: `/api/v1/documents/${docId}/download_details`,
      method: 'GET',
      headers,
      responseType: 'blob' // important
    }).then(response => {
      downloadFile(response)
    })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const downloadNativeFile = docId => (dispatch, getState) => {
  const { token } = getState().user
  const headers = { Authorization: token }

  return (
    axios({
      url: `/api/v1/documents/${docId}/download_native_file`,
      method: 'GET',
      headers,
      responseType: 'blob' // important
    }).then(response => {
      downloadFile(response)
    })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}
