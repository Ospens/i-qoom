import axios from 'axios'
import { SubmissionError } from 'redux-form'
import {
  PROJECT_CREATE_SUCCESS,
  PROJECTS_FETCH_SUCCESS,
  PROJECT_EXIT,
  PROJECT_FETCH_SUCCESS
} from './types'
import { errorNotify } from '../elements/Notices'

const projectCreated = payload => ({
  type: PROJECT_CREATE_SUCCESS,
  payload
})

const projectUpdated = payload => ({
  type: PROJECT_CREATE_SUCCESS,
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

export const exitProject = payload => ({
  type: PROJECT_EXIT,
  payload
})

export const startUpdateProject = (values, afterUpdate) => (dispatch, getState) => {
  const { user: { token } } = getState()

  const headers = {
    Authorization: token
  }

  const request = {
    project: {
      ...values
    }
  }

  return (
    axios.put(`/api/v1/projects/${values.id}`, request, { headers })
      .then(response => {
        dispatch(projectUpdated(response.data))
        if (afterUpdate) afterUpdate({ ...response.data.project[0] })
      })
      .catch(({ response }) => {
        errorNotify('Something went wrong')
        throw new SubmissionError(response.data.error_messages)
      })
  )
}

export const startCreateProject = (values, afterCreate) => (dispatch, getState) => {
  const { user: { token } } = getState()

  const headers = {
    Authorization: token
  }

  const request = {
    project: {
      ...values,
      creation_step: 'admins'
    }
  }

  return (
    axios.post('/api/v1/projects', request, { headers })
      .then(response => {
        dispatch(projectCreated(response.data))
        afterCreate({ ...response.data.project[0] })
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const startFetchProjects = () => (dispatch, getState) => {
  const { token } = getState().user
  const headers = {
    Authorization: token
  }
  return (
    axios.get('/api/v1/projects', { headers })
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
  const headers = {
    Authorization: token
  }

  return (
    axios.get(`/api/v1/projects/${id}`, { headers })
      .then(response => {
        dispatch(projectFetched(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}
