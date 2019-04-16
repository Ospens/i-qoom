import axios from 'axios'
import {
  PROJECT_CREATE_SUCCESS,
  PROJECTS_FETCH_SUCCESS,
  PROJECT_FETCH_SUCCESS
} from './types'

const projectCreated = payload => ({
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

export const startCreateProject = name => dispatch => {
  const request = {
    project: {
      name
    }
  }
  return (
    axios.post('/api/v1/project', request)
      .then(response => {
        dispatch(projectCreated(response.data.name))
      })
      .catch(e => {
        console.error(e)
      })
  )
}

export const startFetchProjects = () => (dispatch, getState) => {
  const { token } = getState().auth
  const headers = {
    Authorization: token
  }
  return (
    axios.get('/api/v1/projects', { headers })
      .then(response => {
        dispatch(projectsFetched(response.data.location))
      })
      .catch(e => {
        console.log(e)
      })
  )
}

export const startFetchProject = (id) => (dispatch, getState) => {
  const { token } = getState().auth
  const headers = {
    Authorization: token
  }

  return (
    axios.get(`/api/v1/projects/${id}`, { headers })
      .then(response => {
        dispatch(projectFetched(response.data.location))
      })
      .catch(e => {
        console.error(e)
      })
  )
}
