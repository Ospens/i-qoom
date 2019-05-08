import axios from 'axios'
import {
  DOCUMENTS_FETCH_SUCCESS
} from './types'

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
      console.log('startFetchDocuments')
      //dispatch(documentsFetched(response.data.location))
    })
    .catch(e => {
      console.log(e)
    })
  )
}
