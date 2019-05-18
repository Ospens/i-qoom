import axios from 'axios'
import { SubmissionError } from 'redux-form'
import {
  PROJECT_CREATE_SUCCESS,
  PROJECTS_FETCH_SUCCESS,
  PROJECT_EXIT,
  PROJECT_FETCH_SUCCESS
} from './types'
import { errorNotify } from '../elements/Notices'

const projectCreated = payload => ({
  type: PROJECT_CREATE_SUCCESS,
  payload
})

const projectUpdated = payload => ({
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

export const exitProject = payload => ({
  type: PROJECT_EXIT,
  payload
})

export const startUpdateProject = (values, id, step) => (dispatch, getState) => {
  const { user: { token } } = getState()

  const headers = {
    Authorization: token
  }

  const data = {}

  if (step === 'company_datum') {
    data.company_datum_attributes = {
      id: values.id || '',
      logo: values.logo,
      registration_number: values.registration_number,
      vat_id: values.vat_id,
      same_for_billing_address: values.same_for_billing_address,
      company_address_attributes: {
        company_name: values.company_name,
        street: values.street,
        house_number: values.house_number,
        city: values.city,
        postcode: values.postcode,
        country: values.country,
        district: values.district,
        district_court: values.district_court
      }
    }
  }

  if (step === 'billing_address') {
    data.company_datum_attributes = {
      billing_address_attributes: {
        id: values.id || '',
        company_name: values.company_name,
        street: values.street,
        house_number: values.house_number,
        city: values.city,
        postcode: values.postcode,
        country: values.country,
        district: values.district,
        district_court: values.district_court
      }
    }
  }

  if (step === 'project_admins') {
    data.admins_attributes = {
      id: values.id || '',
      username: values.username,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone_code: values.phone_code,
      phone_number: values.phone_number
    }
  }

  const request = {
    project: {
      ...data
    }
  }

  return (
    axios.put(`/api/v1/projects/${id}`, request, { headers })
      .then(response => {
        dispatch(projectUpdated(response.data))
      })
      .catch(({ response }) => {
        throw new SubmissionError(response.data.error_messages)
      })
  )
}

export const startCreateProject = () => (dispatch, getState) => {
  const { user: { token }, form } = getState()

  const headers = {
    Authorization: token
  }

  const newValues = {}
  const values = form.administrator_form.values
  Object.keys(values).forEach(k => {
    const key = k.replace(/administrator_form(.*)_/g, '')
    newValues[key] = values[k]
  })

  const adminsAttributes = {
    id: '',
    ...newValues
  }

  const request = {
    project: {
      creation_step: 'admins',
      name: form.project_form.values.project_title,
      admins_attributes: adminsAttributes
    }
  }

  return (
    axios.post('/api/v1/projects', request, { headers })
      .then(response => {
        dispatch(projectCreated(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
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
        dispatch(projectsFetched(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
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
        dispatch(projectFetched(response.data))
      })
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}
