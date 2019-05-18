import axios from 'axios'
import { SubmissionError } from 'redux-form'
import jwtDecode from 'jwt-decode'
import { errorNotify, successNotify } from '../elements/Notices'
import {
  SIGN_IN_USER,
  SIGN_UP_USER,
  SIGN_OUT_USER,
  FETCH_USER_SUCCESS
} from './types'

const signIn = (token, exp, userId) => ({
  type: SIGN_IN_USER,
  payload: {
    token,
    exp,
    user_id: userId
  }
})

const signUp = (token, headers) => ({
  type: SIGN_UP_USER,
  payload: {
    token,
    headers
  }
})

const fetchUserSuccess = data => ({
  type: FETCH_USER_SUCCESS,
  payload: {
    data
  }
})

export const signOutUser = () => {
  localStorage.removeItem('jwt-iqoom-token')
  return ({
    type: SIGN_OUT_USER
  })
}

export const fetchUser = userId => dispatch => (
  axios.get(`/api/v1/users/${userId}`)
    .then(response => {
      dispatch(fetchUserSuccess(response.data.location))
    })
    .catch(({ response }) => {
      errorNotify(response.data.message)
      throw new SubmissionError(response.data.error_messages)
    })
)

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
        const decoded = jwtDecode(response.data.auth_token)
        localStorage.setItem('jwt-iqoom-token-expiry', decoded.exp)
        localStorage.setItem('jwt-iqoom-token', response.data.auth_token)
        dispatch(signIn(response.data.auth_token, decoded.exp, decoded.user_id))
        dispatch(fetchUser(decoded.user_id))
      })
      .catch(({ response }) => {
        errorNotify(response.data.message)
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
      successNotify('You are successfully registered!')
      dispatch(signUp(response.data, response.headers))
    })
    .catch(({ response }) => {
      errorNotify(response.data.message)
      throw new SubmissionError(response.data.error_messages)
    })
}
