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
  sessionStorage.removeItem('jwtToken')
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
        sessionStorage.setItem('jwtToken', token)
        dispatch(signIn(response.data.auth_token,response.headers))
      })
      .catch(error => console.error('Errors: ', error.message))
  )
}

export const signUpUser = userFields => dispatch => {
  const request = {
    user: {
      ...userFields
    }
  }
  return axios.post('/api/v1/users', request)
    .then(response => dispatch(signUp(response.data,response.headers)))
    .catch(({response}) => {
      const errors = {}
      response.data.fields_with_errors.map((el, i) => {
        errors[el] = response.data.error_messages[i]
      })
      alert(response.data.error_messages)
      throw new SubmissionError(errors)
    })
}
