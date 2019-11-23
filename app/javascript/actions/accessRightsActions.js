import axios from 'axios'
import { SubmissionError, initialize } from 'redux-form'
import {
  GET_NEW_TEAMS_LIST,
  GET_NEW_MEMBERS_LIST,
  GET_CURRENT_MEMBERS_LIST
} from './types'
import { addNotification } from './notificationsActions'

const newTeamsFetched = payload => ({
  type: GET_NEW_TEAMS_LIST,
  payload
})

const newMembersFetched = payload => ({
  type: GET_NEW_MEMBERS_LIST,
  payload
})

const currentMembersFetched = payload => ({
  type: GET_CURRENT_MEMBERS_LIST,
  payload
})

export const createTeam = (projectId, request) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.post(`/api/v1/projects/${projectId}/dms_teams?name=${request.name}`, {}, headers)
      .then(({ data }) => {
        dispatch(initialize('team_form', data))
      })
      .catch(({ response }) => {
        dispatch(addNotification({ title: 'Problem', text: 'Something went wrong!', type: 'error' }, true))
        throw new SubmissionError(response.data)
      })
  )
}

export const updateTeamMembers = (projectId, values) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }
  console.log(values)
  const request = {
    ...values
  }

  return (
    axios.post(`/api/v1/projects/${projectId}/dms_teams/${values.id}/update_members`, request, headers)
      .then(response => {
        console.log(response)
      })
      .catch(({ response }) => {
        dispatch(addNotification({ title: 'Problem', text: 'Something went wrong!', type: 'error' }, true))
        throw new SubmissionError(response.data)
      })
  )
}

export const getGrantAccessTeams = (projectId, isNew = false) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/dms_teams?only_new=${isNew}`, headers)
      .then(response => {
        dispatch(newTeamsFetched(response.data))
      })
      .catch(() => {
        dispatch(addNotification({ title: 'Problem', text: 'Something went wrong!', type: 'error' }, true))
      })
  )
}

export const getGrantAccessMembers = projectId => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/document_rights/new`, headers)
      .then(response => {
        dispatch(newMembersFetched(response.data))
      })
      .catch(() => {
        dispatch(addNotification({ title: 'Problem', text: 'Something went wrong!', type: 'error' }, true))
      })
  )
}

export const getGrandedAccessMembers = projectId => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/document_rights/edit`, headers)
      .then(response => {
        dispatch(currentMembersFetched(response.data))
      })
      .catch(() => {
        dispatch(addNotification({ title: 'Problem', text: 'Something went wrong!', type: 'error' }, true))
      })
  )
}

export const startUpdateAccessMembers = (projectId, values, type) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  const request = { users: [values] }

  return (
    axios.put(`/api/v1/projects/${projectId}/document_rights/`, request, headers)
      .then(() => {
        if (type === 'newMembers') {
          dispatch(getGrantAccessMembers(projectId))
        } else if (type === 'oldMembers') {
          dispatch(getGrandedAccessMembers(projectId))
        }
        dispatch(addNotification({ title: 'Access rights', text: 'Rights succcessfully updated', type: 'success' }))
      })
      .catch(() => {
        dispatch(addNotification({ title: 'Problem', text: 'Something went wrong!', type: 'error' }, true))
      })
  )
}
