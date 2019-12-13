import axios from 'axios'
import { SubmissionError } from 'redux-form'
import {
  ROLES_FETCHED,
  ROLE_DELETED,
  ROLE_UPDATED,
  ROLE_CREATED
} from './types'
import { errorNotify } from './notificationsActions'

const rolesFetched = payload => ({
  type: ROLES_FETCHED,
  payload
})

const roleCreated = payload => ({
  type: ROLE_CREATED,
  payload
})

const roleUpdated = payload => ({
  type: ROLE_UPDATED,
  payload
})

const roleDeleted = payload => ({
  type: ROLE_DELETED,
  payload
})

export const startCreateRole = (values, projectId) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  const request = {
    role: {
      ...values
    }
  }

  return (
    axios.post(`/api/v1/projects/${projectId}/roles/`, request, headers)
      .then(response => {
        dispatch(roleCreated(response.data))
      })
      .catch(({ response }) => {
        dispatch(errorNotify('Problem'))
        throw new SubmissionError(response.data)
      })
  )
}

export const startUpdateRole = (values, projectId) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  const request = {
    roles: {
      ...values
    }
  }

  return (
    axios.put(`/api/v1/projects/${projectId}/roles/${values.id}`, request, headers)
      .then(response => {
        dispatch(roleUpdated(response.data))
      })
      .catch(({ response }) => {
        dispatch(errorNotify('Problem'))
        throw new SubmissionError(response.data)
      })
  )
}

export const deleteRole = (id, projectId) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.delete(`/api/v1/projects/${projectId}/roles/${id}`, headers)
      .then(() => {
        dispatch(roleDeleted({ id }))
      })
      .catch(({ response }) => {
        dispatch(errorNotify('Problem'))
        throw new SubmissionError(response.data)
      })
  )
}

export const fetchRoleList = projectId => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/roles/`, headers)
      .then(response => {
        dispatch(rolesFetched(response.data))
      })
      .catch(() => {
        dispatch(errorNotify('Problem'))
      })
  )
}
