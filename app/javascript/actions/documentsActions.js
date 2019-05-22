import axios from 'axios'
import {
  DOCUMENTS_FETCH_SUCCESS
} from './types'
import { errorNotify } from '../elements/Notices'


const documentsFetched = payload => ({
  type: DOCUMENTS_FETCH_SUCCESS,
  payload
})

export const startFetchDocuments = () => (dispatch, getState) => {
  const {
    token
  } = getState().user
  const headers = {
    Authorization: token
  }
  return (
    axios.get('/api/v1/documents', {
      headers
    })
      .then(response => {
        dispatch(documentsFetched(response.data.location))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}

export const newDocument = () => (dispatch, getState) => {
  const { token } = getState().user
  const headers = { Authorization: token }

  return (
    axios.get(`/api/v1/projects/${1}/documents/new`, {
      headers
    })
      .then(response => {
        console.log(response)
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}
