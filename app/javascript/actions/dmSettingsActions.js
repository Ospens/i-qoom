import axios from 'axios'
import { errorNotify } from './notificationsActions'

const getAttributes = projectId => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/document_rights/new`, headers)
      .then(() => {
      })
      .catch(() => {
        dispatch(errorNotify('DMS'))
      })
  )
}

export default getAttributes
