import axios from 'axios'
import { SubmissionError } from 'redux-form'
import {
  SIGN_IN_USER,
  SIGN_UP_USER,
  SIGN_OUT_USER
} from './types'

const signIn = (token, headers, expiry) => ({
  type: SIGN_IN_USER,
  payload: {
    token,
    headers,
    expiry
  }
})

export const signOutUser = () => {
  localStorage.removeItem('jwt-iqoom-token')
  return ({
    type: SIGN_OUT_USER
  })
}

const signUp = (token, headers) => ({
  type: SIGN_UP_USER,
  payload: {
    token,
    headers
  }
})

export const signInUser = (login, password) => dispatch => {
  const request = {
    session: {
      login,
      password
    }
  }
  return (
    axios.post('/api/v1/sessions', request)
      .then(response => {
        localStorage.setItem('jwt-iqoom-token', response.data.auth_token)
        dispatch(signIn(response.data.auth_token, response.headers))
      })
      .catch(({ response }) => {
        alert('Error')
        throw new SubmissionError(response.data.error_messages)
      })
  )
}

export const signUpUser = userFields => dispatch => {
  const request = {
    user: {
      ...userFields
    }
  }
  return axios.post('/api/v1/users', request)
    .then(response => {
      dispatch(signUp(response.data, response.headers))
      alert('Registration completed successfully!')
    })
    .catch(({ response }) => {
      alert('Error')
      throw new SubmissionError(response.data.error_messages)
    })
}
