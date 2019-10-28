import axios from 'axios'
import { SubmissionError } from 'redux-form'
import {
  DISCIPLINES_FETCHED,
  DISCIPLINES_DELETED,
  DISCIPLINES_UPDATED,
  DISCIPLINE_CREATED
} from './types'
import { addNotification } from './notificationsActions'

const disciplineFetched = payload => ({
  type: DISCIPLINES_FETCHED,
  payload
})

const disciplineCreated = payload => ({
  type: DISCIPLINE_CREATED,
  payload
})

const disciplineUpdated = payload => ({
  type: DISCIPLINES_UPDATED,
  payload
})

const disciplineDeleted = payload => ({
  type: DISCIPLINES_DELETED,
  payload
})

export const startCreateDiscipline = (values, projectId) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  const request = {
    discipline: {
      ...values
    }
  }

  return (
    axios.post(`/api/v1/projects/${projectId}/disciplines/`, request, headers)
      .then(response => {
        dispatch(disciplineCreated(response.data))
      })
      .catch(({ response }) => {
        dispatch(addNotification({ title: 'Problem', text: 'Something went wrong!', type: 'error', autodelete: true }))
        throw new SubmissionError(response.data)
      })
  )
}

export const startUpdateDiscipline = (values, projectId) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  const request = {
    discipline: {
      ...values
    }
  }

  return (
    axios.put(`/api/v1/projects/${projectId}/disciplines/${values.id}`, request, headers)
      .then(response => {
        dispatch(disciplineUpdated(response.data))
      })
      .catch(({ response }) => {
        dispatch(addNotification({ title: 'Problem', text: 'Something went wrong!', type: 'error', autodelete: true }))
        throw new SubmissionError(response.data)
      })
  )
}

export const deleteDiscipline = (id, projectId) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.delete(`/api/v1/projects/${projectId}/disciplines/${id}`, headers)
      .then(() => {
        dispatch(disciplineDeleted({ id }))
      })
      .catch(({ response }) => {
        dispatch(addNotification({ title: 'Problem', text: 'Something went wrong!', type: 'error', autodelete: true }))
        throw new SubmissionError(response.data)
      })
  )
}

export const fetchDisciplineList = projectId => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/disciplines/`, headers)
      .then(response => {
        dispatch(disciplineFetched(response.data))
      })
      .catch(() => {
        dispatch(addNotification({ title: 'Problem', text: 'Something went wrong!', type: 'error', autodelete: true }))
      })
  )
}
