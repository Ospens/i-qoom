import axios from 'axios'
import {
  FOLDER_CREATED
} from './types'
import { errorNotify } from '../elements/Notices'

const folderCreated = payload => ({
  type: FOLDER_CREATED,
  payload
})

export const startCreateFolder = () => (dispatch, getState) => {
  const { user: { token }, projects: { current } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${current.id}/document_folders/`, headers)
      .then(response => {
        dispatch(folderCreated(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}
