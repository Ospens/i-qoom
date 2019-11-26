import axios from 'axios'
import { SubmissionError, initialize } from 'redux-form'
import {
  UPDATE_NEW_TEAMS_LIST,
  UPDATE_OLD_TEAMS_LIST,
  GET_NEW_TEAMS_LIST,
  GET_OLD_TEAMS_LIST,
  GET_NEW_MEMBERS_LIST,
  GET_CURRENT_MEMBERS_LIST
} from './types'
import { addNotification } from './notificationsActions'

const updateNewTeams = payload => ({
  type: UPDATE_NEW_TEAMS_LIST,
  payload
})

const updateOldTeams = payload => ({
  type: UPDATE_OLD_TEAMS_LIST,
  payload
})

const teamsFetched = payload => ({
  type: GET_OLD_TEAMS_LIST,
  payload
})

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

export const updateTeam = (projectId, request) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.put(`/api/v1/projects/${projectId}/dms_teams/${request.id}?name=${request.name}`, {}, headers)
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

export const updateTeamRights = (projectId, values, type) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }
  const request = {
    teams: [values]
  }

  return (
    axios.post(`/api/v1/projects/${projectId}/dms_teams/${values.id}/update_rights`, request, headers)
      .then(() => {
        if (type === 'newTeams') {
          dispatch(updateNewTeams(request))
        } else if (type === 'oldTeams') {
          dispatch(updateOldTeams(request))
        } else {
          dispatch(updateOldTeams(request))
          dispatch(updateNewTeams(request))
        }
        dispatch(addNotification({ title: 'Teams', text: 'Access rights changed!', type: 'success' }))
      })
      .catch(({ response }) => {
        dispatch(addNotification({ title: 'Problem', text: 'Something went wrong!', type: 'error' }, true))
        throw new SubmissionError(response.data)
      })
  )
}
export const getTeams = (projectId, isNew = false) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/dms_teams?only_new=${isNew}`, headers)
      .then(({ data }) => {

        if (isNew) {
          dispatch(newTeamsFetched(data))
        } else {
          dispatch(teamsFetched(data))
        }
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
