import axios from 'axios'
import { SubmissionError } from 'redux-form'
import {
  PROJECT_MEMBERS_FETCHED_SUCCESS,
  PROJECT_MEMBER_CREATED,
  PROJECT_MEMBER_UPDATED,
  CREATING_PROJECT_MEMBER
} from './types'
import { errorNotify } from '../elements/Notices'

const projectMembersFetched = payload => ({
  type: PROJECT_MEMBERS_FETCHED_SUCCESS,
  payload
})

const projectMemberCreating = payload => ({
  type: CREATING_PROJECT_MEMBER,
  payload
})

const createProjectMember = payload => ({
  type: PROJECT_MEMBER_CREATED,
  payload
})

const updateProjectMember = payload => ({
  type: PROJECT_MEMBER_UPDATED,
  payload
})

export const startFetchProjectMembers = id => (dispatch, getState) => {
  const { token } = getState().user
  const headers = { headers: { Authorization: token } }
  return (
    axios.get(`/api/v1/projects/${id}/members`, headers)
      .then(response => {
        dispatch(projectMembersFetched(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const startCreatingProjectMember = id => (dispatch, getState) => {
  const { token } = getState().user
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${id}/members/new`, headers)
      .then(response => {
        dispatch(projectMemberCreating(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const startCreateProjectMember = (values, projectId) => (dispatch, getState) => {
  const { token } = getState().user
  const headers = { headers: { Authorization: token } }

  const request = {
    project_member: {
      ...values
    }
  }
  return (
    axios.post(`/api/v1/projects/${projectId}/members/`, request, headers)
      .then(response => {
        dispatch(createProjectMember(response.data))
        dispatch(startFetchProjectMembers(projectId))
      })
      .catch(response => {
        errorNotify('Something went wrong')
        throw new SubmissionError(response.data.error_messages)
      })
  )
}

export const startUpdateProjectMember = (values, projectId) => (dispatch, getState) => {
  const { token } = getState().user
  const headers = { headers: { Authorization: token } }

  const request = {
    project_member: {
      ...values
    }
  }

  return (
    axios.patch(`/api/v1/projects/${projectId}/members/${values.id}`, request, headers)
      .then(response => {
        dispatch(updateProjectMember(response.data.project_member[0]))
      })
      .catch(response => {
        errorNotify('Something went wrong')
        throw new SubmissionError(response.data.error_messages)
      })
  )
}
