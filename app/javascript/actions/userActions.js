import axios from 'axios'
import {
  SIGN_IN_USER,
  SIGN_UP_USER,
  SIGN_OUT_USER
} from './types'

const signIn = (token, headers, expiry) => {
  sessionStorage.setItem('jwtToken', token)
  return ({
    type: SIGN_IN_USER,
    payload: {
      token,
      headers,
      expiry
    }
  })
}

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
      .then(response => dispatch(
        signIn(
          response.data.auth_token,
          response.headers
        )
      ))
      .catch(error => console.error('Errors: ', error.message))
  )
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
