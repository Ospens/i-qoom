import axios from 'axios'
import { addNotification } from './notificationsActions'

const getAttributes = projectId => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/document_rights/new`, headers)
      .then(() => {
      })
      .catch(() => {
        dispatch(addNotification({ title: 'DMS', text: 'Something went wrong!', type: 'error' }))
      })
  )
}

export default getAttributes
