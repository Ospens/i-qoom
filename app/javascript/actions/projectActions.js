import axios from 'axios'
import {
  PROJECT_CREATE_SUCCESS,
  PROJECTS_FETCH_SUCCESS,
  PROJECT_FETCH_SUCCESS
} from './types'

const projectCreated = payload => ({
  type: PROJECT_CREATE_SUCCESS,
  payload
})

const projectsFetched = payload => ({
  type: PROJECTS_FETCH_SUCCESS,
  payload
})

const projectFetched = payload => ({
  type: PROJECT_FETCH_SUCCESS,
  payload
})

export const startCreateProject = () => (dispatch, getState) => {
  const {
    user: { token },
    form
  } = getState()

  const headers = {
    Authorization: token
  }
  const admins_attributes = {
    ...form.administrator_form.values,
  }

  const company_form = form.company_form.values

  const request = {
    creation_step: 1,
    project: {
      //name: form.project_form.values.project_title,
      admins_attributes,
      /*company_datum_attributes: {
        logo: company_form.logo,
        registration_number: company_form.registration_number,
        vat_id: company_form.vat_id,
        same_for_billing_address: company_form.same_for_billing_address,

        company_address_attributes: {...company_form}
      }*/
    }
  }
  console.log(request)

  return (
    axios.post('/api/v1/projects', request, { headers })
      .then(response => {
        dispatch(projectCreated(response.data.name))
      })
      .catch(e => {
        console.error(e)
      })
  )
}

export const startFetchProjects = () => (dispatch, getState) => {
  const { token } = getState().user
  const headers = {
    Authorization: token
  }
  return (
    axios.get('/api/v1/projects', { headers })
      .then(response => {
        dispatch(projectsFetched(response.data.location))
      })
      .catch(e => {
        console.log(e)
      })
  )
}

export const startFetchProject = id => (dispatch, getState) => {
  const { token } = getState().user
  const headers = {
    Authorization: token
  }

  return (
    axios.get(`/api/v1/projects/${id}`, { headers })
      .then(response => {
        console.log(response)
        dispatch(projectFetched(response.data.location))
      })
      .catch(e => {
        console.error(e)
      })
  )
}
