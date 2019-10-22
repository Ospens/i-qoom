import axios from 'axios'
import { errorNotify } from '../elements/Notices'

const getAttributes = projectId => (_, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/document_rights/new`, headers)
      .then(() => {
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export default getAttributes
