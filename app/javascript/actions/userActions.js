import axios from 'axios'
import jwtDecode from 'jwt-decode'
import {
  SIGN_IN_USER,
  SIGN_UP_USER
} from './types'

const signIn = (token, headers, expiry) => ({
  type: SIGN_IN_USER,
  payload: {
    token,
    headers,
    expiry
  }
})

const signUp = (token, headers) => ({
  type: SIGN_UP_USER,
  payload: {
    token,
    headers
  }
})

export const signInUser = (login, password, history) => dispatch => {
  const request = {
    session: {
      login,
      password
    }
  }
  axios.post('/api/v1/sessions', request)
    .then(response => dispatch(
      signIn(
        response.data.auth_token,
        response.headers,
        jwtDecode(response.data.auth_token)
      )
    ))
    .then(() => history.push('/dashboard'))
    .catch(error => console.error('Errors: ', error.message))
}

export const signUpUser = userFields => dispatch => {
  const request = {
    user: {
      ...userFields
    }
  }
  axios.post('/api/v1/users', request)
    .then(response => dispatch(
      signUp(
        response.data,
        response.headers,
      )
    ))
    .catch(error => console.error('Errors: ', error.message))
}
