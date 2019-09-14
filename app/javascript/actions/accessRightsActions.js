import axios from 'axios'
import {
  GET_NEW_MEMBERS_LIST,
  GET_CURRENT_MEMBERS_LIST
} from './types'
import { errorNotify, successNotify } from '../elements/Notices'

const newMembersFetched = payload => ({
  type: GET_NEW_MEMBERS_LIST,
  payload
})

const currentMembersFetched = payload => ({
  type: GET_CURRENT_MEMBERS_LIST,
  payload
})

export const getGrantAccessMembers = projectId => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/document_rights/new`, headers)
      .then(response => {
        dispatch(newMembersFetched(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
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
        errorNotify('Something went wrong')
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
        successNotify('Rights succcessfully updated')
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}
