import axios from 'axios'
import {
  PROJECT_CREATED
} from './types'

const projectCreated = payload => ({
  type: PROJECT_CREATED,
  payload
})

export const startCreateProject = name => dispatch => {
  const request = {
    project: {
      name
    }
  }
  return (
    axios.post('/api/v1/project', request)
      .then(response => {
        dispatch(projectCreated(response.data.name))
      })
      .catch(({ response }) => {
        alert('Error')
      })
  )
}
