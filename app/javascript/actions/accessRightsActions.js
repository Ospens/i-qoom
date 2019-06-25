import axios from 'axios'
import {
  GET_NEW_MEMBERS_LIST,
  GET_CURRENT_MEMBERS_LIST
} from './types'
import { errorNotify } from '../elements/Notices'

const newMembersFetched = payload => ({
  type: GET_NEW_MEMBERS_LIST,
  payload
})

const currentMembersFetched = payload => ({
  type: GET_CURRENT_MEMBERS_LIST,
  payload
})

export const getGrantAccessMembers = () => (dispatch, getState) => {
  const { user: { token }, projects: { current } } = getState()
  const headers = {
    Authorization: token
  }

  return (
    axios.get(`/api/v1/projects/${current.id}/document_rights/new`, {
      headers
    })
      .then(response => {
        dispatch(newMembersFetched(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const getGrandedAccessMembers = () => (dispatch, getState) => {
  const { user: { token }, projects: { current } } = getState()
  const headers = {
    Authorization: token
  }

  return (
    axios.get(`/api/v1/projects/${current.id}/document_rights/edit`, {
      headers
    })
      .then(response => {
        dispatch(currentMembersFetched(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const startUpdateAccessMembers = (newUsers, removeUsers) => (dispatch, getState) => {
  const {
    user: { token },
    projects: { current },
    accessRights: { newMembers }
  } = getState()
  const headers = { Authorization: token }
  let users = newMembers.filter(member => newUsers.includes(member.id))
  users = users.map(user => user.enabled === true)
  const request = { newUsers, removeUsers }

  return (
    axios.put(`/api/v1/projects/${current.id}/document_rights/`, request, {
      headers
    })
      .then(response => {
        dispatch(currentMembersFetched(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}
