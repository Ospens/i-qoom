import axios from 'axios'
import qs from 'qs'
import { SubmissionError } from 'redux-form'
import {
  DOCUMENTS_FETCH_SUCCESS,
  DOCUMENT_FETCH_SUCCESS,
  EDIT_DOCUMENT,
  REVISIONS_AND_VERSIONS_FETCH_SUCCESS,
  DOCUMENTS_FETCHED_WITHOUT_FILTERS_SUCCESS,
  TOGGLE_FILTERS,
  TOGGLE_SEARCH_FILTERS,
  TOGGLE_LOADING,
  CREATING_DOCUMENT,
  DOCUMENTS_SORTED
} from './types'
import { fieldByColumn } from './conventionActions'
import { errorNotify, successNotify } from './notificationsActions'

export const paramsToFormData = (data, params, preceding = '') => {
  let newData = data
  for (const [k, v] of Object.entries(params)) {
    if (v instanceof Object && v.constructor === Array) {
      if (k === 'file') {
        newData.append(`${preceding}${k}`, (v[0] ? v[0] : new File([], '')))
      } else if (['emails', 'review_issuers', 'reviewers'].includes(k)) {
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
const imgMIMEtypes = [
  'jpg',
  'jpeg',
  'jfif',
  'pjpeg',
  'pjp',
  'png',
  'svg',
  'ico',
  'cur',
  'gif',
  'bmp',
  'apng'
]
const applicationMIMEtypes = ['pdf', 'json']
const textMIMEtypes = ['csv', 'css', 'html', 'calendar']

export const downloadFile = (response, open = false, windowReference) => {
  const disposition = response.headers['content-disposition'].match(regexp)
  const type = disposition[2].match(/(\.)(.*)/i)
  let MIMEtype = ''
  let url = ''
  if (type && open) {
    if (imgMIMEtypes.includes(type[2])) {
      MIMEtype = `image/${type[2]}`
    } else if (applicationMIMEtypes.includes(type[2])) {
      MIMEtype = `application/${type[2]}`
    } else if (textMIMEtypes.includes(type[2])) {
      MIMEtype = `text/${type[2]}`
    }
    if (MIMEtype) {
      url = window.URL.createObjectURL(new Blob([response.data], { type: MIMEtype }))
      windowReference.location.replace(url)
      return
    }
  } else {
    url = window.URL.createObjectURL(new Blob([response.data]))
  }

  const title = disposition ? disposition[2] : 'file.pdf'
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
  type: REVISIONS_AND_VERSIONS_FETCH_SUCCESS,
  payload
})

const toggleLoading = payload => ({
  type: TOGGLE_LOADING,
  payload
})

export const sortTable = column => (dispatch, getState) => {
  const { documents: { allDocuments, sortBy } } = getState()
  let newval = sortBy

  if (column) {
    if (sortBy.column !== column) {
      newval = { column, order: 'desc' }
    } else {
      newval = { column, order: sortBy.order === 'asc' ? 'desc' : 'asc' }
    }
  }

  allDocuments.sort((a, b) => {
    if (a[newval.column] > b[newval.column]) {
      return newval.order === 'asc' ? 1 : -1
    }
    if (a[newval.column] < b[newval.column]) {
      return newval.order === 'asc' ? -1 : 1
    }
    return 0
  })
  dispatch({ type: DOCUMENTS_SORTED, payload: { documents: allDocuments, ...newval } })
}

export const startFetchDocuments = projectId => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { Authorization: token }
  dispatch(toggleLoading(true))

  return (
    axios.get(`/api/v1/projects/${projectId}/documents`, { headers })
      .then(response => {
        dispatch(documentsFetched(response.data))
        dispatch(sortTable())
        dispatch(toggleLoading(false))
      })
      .catch(() => {
        dispatch(toggleLoading(false))
        dispatch(errorNotify('Problem'))
      })
  )
}

const fetchDocumentsWithFilters = projectId => (dispatch, getState) => {
  const {
    user: { token },
    documents: {
      searchFilters,
      discipline,
      originating_companies: originatingCompanies,
      document_types: documentTypes
    }
  } = getState()
  const headers = { Authorization: token }
  const { document_title: documentTitle, ...filters } = searchFilters
  const params = {
    document_title: documentTitle,
    discipline: discipline.filter(el => el.checked).map(v => v.value),
    originating_companies: originatingCompanies.filter(el => el.checked).map(v => v.value),
    document_types: documentTypes.filter(el => el.checked).map(v => v.value),
    ...filters
  }
  dispatch(toggleLoading(true))

  return (
    axios.get(
      `/api/v1/projects/${projectId}/documents`,
      {
        params,
        headers,
        paramsSerializer: p => qs.stringify(p, { arrayFormat: 'brackets' })
      }
    )
      .then(response => {
        dispatch(documentsFetchedWithoutFilters(response.data))
        dispatch(sortTable())
        dispatch(toggleLoading(false))
      })
      .catch(() => {
        dispatch(errorNotify('Problem'))
        dispatch(toggleLoading(false))
      })
  )
}

export const toggleFilters = (projectId, filter) => dispatch => {
  dispatch(({ type: TOGGLE_FILTERS, payload: filter }))
  dispatch(fetchDocumentsWithFilters(projectId))
}

export const toggleSearchFilters = (projectId, values) => dispatch => {
  dispatch(({ type: TOGGLE_SEARCH_FILTERS, payload: values }))
  if (
    values.search !== undefined
    || (values.filters && values.filters.filter(({ value }) => value.length > 0).length > 0)
    || values.document_title !== undefined
  ) {
    dispatch(fetchDocumentsWithFilters(projectId))
  }
}

export const newDocument = projectId => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/documents/new`, headers)
      .then(response => {
        const { data } = response
        const sortedData = fieldByColumn(data)
        dispatch(creatingDocument(sortedData))
      })
      .catch(() => {
        dispatch(errorNotify('Problem'))
      })
  )
}

export const startCreateDocument = (projectId, values) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { Authorization: token, 'Content-Type': 'multipart/form-data' }
  let formData = new FormData()
  const IFI = values.review_status === 'issued_for_information'

  const formValues = {
    document: {
      ...values,
      reviewers: IFI ? [] : values.reviewers,
      review_issuers: IFI ? [] : values.review_issuers
    }
  }

  formData = paramsToFormData(formData, formValues, '')

  return (
    axios({
      method: 'post',
      url: `/api/v1/projects/${projectId}/documents/`,
      data: formData,
      headers
    }).then(() => {
      dispatch(successNotify('DMS', 'Document successfully created!'))
    })
      .catch(({ response: { data } }) => {
        dispatch(errorNotify('Problem'))
        throw new SubmissionError(data)
      })
  )
}

export const startUpdateDocument = (documentId, values) => (dispatch, getState) => {
  const { user: { token } } = getState()
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
      dispatch(successNotify('DMS', 'Document successfully updated!'))
    })
      .catch(({ response: { data } }) => {
        dispatch(errorNotify('Problem'))
        throw new SubmissionError(data)
      })
  )
}

export const startCreateRevision = (documentId, values) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { Authorization: token, 'Content-Type': 'multipart/form-data' }
  let formData = new FormData()

  const formValues = {
    document: { ...values }
  }

  formData = paramsToFormData(formData, formValues, '')
  return (
    axios({
      method: 'post',
      url: `/api/v1/documents/${documentId}/create_revision`,
      data: formData,
      headers
    }).then(() => {
      dispatch(successNotify('DMS', 'Revision successfully created!'))
    })
      .catch(({ response: { data } }) => {
        dispatch(errorNotify('Problem'))
        throw new SubmissionError(data)
      })
  )
}

export const startFetchDocument = documentId => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/documents/${documentId}`, headers)
      .then(response => {
        dispatch(documentFetched(response.data))
      })
      .catch(() => {
        dispatch(errorNotify('Problem'))
      })
  )
}

export const startEditDocument = documentId => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/documents/${documentId}/edit`, headers)
      .then(response => {
        const { data } = response
        const sortedData = fieldByColumn(data)
        dispatch(editDocument(sortedData))
      })
      .catch(() => {
        dispatch(errorNotify('Problem'))
      })
  )
}

export const getRevisionsAndVersions = docId => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/documents/${docId}/revisions_and_versions`, headers)
      .then(response => {
        dispatch(getRevAndVer(response.data))
      })
      .catch(() => {
        dispatch(errorNotify('Problem'))
      })
  )
}

export const downloadList = (projectId, docIds, types) => (dispatch, getState) => {
  const { user: { token } } = getState()
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
        dispatch(errorNotify('Problem'))
      })
  ))
}

export const downloadDetailFile = docId => (dispatch, getState) => {
  const { user: { token } } = getState()
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
        dispatch(errorNotify('Problem'))
      })
  )
}

export const downloadNativeFile = (docId, open) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { Authorization: token }
  // Safari is blocking any call to window.open() which is made inside an async call.
  const windowReference = window.open()
  return (
    axios({
      url: `/api/v1/documents/${docId}/download_native_file`,
      method: 'GET',
      headers,
      responseType: 'blob' // important
    }).then(response => {
      downloadFile(response, open, windowReference)
    })
      .catch(() => {
        dispatch(errorNotify('Problem'))
      })
  )
}
