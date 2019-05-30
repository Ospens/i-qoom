import axios from 'axios'
import {
  EDITING_CONVENTION
} from './types'
import { errorNotify } from '../elements/Notices'

const editingConvention = payload => ({
  type: EDITING_CONVENTION,
  payload
})

export const startEditConvention = () => (dispatch, getState) => {
  const { user: { token }, projects: { current } } = getState()
  const headers = {
    Authorization: token
  }

  return (
    axios.get(`/api/v1/projects/${current.id}/conventions/edit`, {
      headers
    })
      .then(response => {
        console.log(response)
        dispatch(editingConvention(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}
