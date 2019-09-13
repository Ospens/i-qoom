import axios from 'axios'
import { SubmissionError } from 'redux-form'
import {
  SET_PAGE_TITLE,
  PROJECT_CREATED_SUCCESS,
  PROJECT_UPDATED_SUCCESS,
  PROJECTS_FETCH_SUCCESS,
  PROJECT_EXIT,
  PROJECT_ADMIN_DELETED,
  PROJECT_ADMIN_UPDATED,
  PROJECT_FETCH_SUCCESS
} from './types'
import { errorNotify, successNotify } from '../elements/Notices'
import { paramsToFormData } from './documentsActions'

const projectCreated = payload => ({
  type: PROJECT_CREATED_SUCCESS,
  payload
})

const projectUpdated = payload => ({
  type: PROJECT_UPDATED_SUCCESS,
  payload
})

const projectsFetched = payload => ({
  type: PROJECTS_FETCH_SUCCESS,
  payload
})

const projectFetched = payload => ({
  type: PROJECT_FETCH_SUCCESS,
  payload
})

const adminDeleted = payload => ({
  type: PROJECT_ADMIN_DELETED,
  payload
})

const adminUpdated = payload => ({
  type: PROJECT_ADMIN_UPDATED,
  payload
})

export const exitProject = payload => ({
  type: PROJECT_EXIT,
  payload
})

export const startUpdateProject = (values, afterUpdate) => (dispatch, getState) => {
  const { user: { token } } = getState()

  const headers = { headers: { Authorization: token } }

  let formData = new FormData()
  // TODO: change this
  delete values.logo
  if (values.billing_address) {
    values.creation_step = 'billing_address'
  } else if (values.company_data) {
    values.creation_step = 'company_data'
  } else if (values.name) {
    values.creation_step = 'name'
  }

  const formValues = {
    project: { ...values }
  }

  formData = paramsToFormData(formData, formValues, '')

  return (
    axios.put(`/api/v1/projects/${values.id}`, formData, headers)
      .then(response => {
        dispatch(projectUpdated(response.data))
        if (afterUpdate) afterUpdate(response.data)
      })
      .catch(({ response }) => {
        errorNotify('Something went wrong')
        throw new SubmissionError(response.data)
      })
  )
}

export const startCreateProject = (values, afterCreate) => (dispatch, getState) => {
  const { user: { token } } = getState()

  const headers = { headers: { Authorization: token } }

  const request = {
    project: {
      ...values,
      creation_step: 'admins'
    }
  }

  return (
    axios.post('/api/v1/projects', request, headers)
      .then(response => {
        dispatch(projectCreated(response.data))
        afterCreate(response.data)
      })
      .catch(({ response }) => {
        errorNotify('Something went wrong')
        throw new SubmissionError(response.data)
      })
  )
}

export const startFetchProjects = () => (dispatch, getState) => {
  const { token } = getState().user
  const headers = { headers: { Authorization: token } }
  return (
    axios.get('/api/v1/projects', headers)
      .then(response => {
        dispatch(projectsFetched(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const startFetchProject = id => (dispatch, getState) => {
  const { token } = getState().user
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${id}`, headers)
      .then(response => {
        dispatch(projectFetched(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const startDeleteAdmin = (projectId, adminId) => (dispatch, getState) => {
  const { token } = getState().user
  const headers = { headers: { Authorization: token } }

  return (
    axios.delete(`/api/v1/projects/${projectId}/admins/${adminId}`, headers)
      .then(response => {
        successNotify(response.data.message)
        dispatch(adminDeleted(adminId))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const starUpdateAdmin = (projectId, values) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }
  const request = {
    project: {
      admins: [values]
    }
  }

  return (
    axios.put(`/api/v1/projects/${projectId}`, request, headers)
      .then(response => {
        dispatch(projectUpdated(response.data))
        successNotify('The project admin were successfully saved!')
      })
      .catch(({ response }) => {
        errorNotify('Something went wrong')
        throw new SubmissionError(response.data)
      })
  )
}

export const startResendConfirmAdmin = (projectId, adminId) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/admins/${adminId}/resend_confirmation`, headers)
      .then(() => {
        successNotify('A new invitation has been sent to this address!')
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const getAdminInfo = (projectId, adminId) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/admins/${adminId}/`, headers)
      .then(response => {
        dispatch(adminUpdated(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const setPageTitle = title => dispatch => {
  dispatch({
    type: SET_PAGE_TITLE,
    payload: title
  })
}
