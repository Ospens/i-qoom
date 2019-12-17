import axios from 'axios'
import { errorNotify } from './notificationsActions'
import { sortTable } from './documentsActions'

export const fetchPlannedDocuments = projectId => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { Authorization: token }

  return (
    axios.get(`/api/v1/projects/${projectId}/documents`, { headers })
      .then(response => {
        console.log(response)
      })
      .catch(response => {
        console.log(response)
      })
  )
}

export const createPlannedList = projectId => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { Authorization: token }

  return (
    axios.get(`/api/v1/projects/${projectId}/documents`, { headers })
      .then(response => {
        console.log(response)
      })
      .catch(response => {
        console.log(response)
      })
  )
}

