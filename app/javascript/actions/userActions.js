import axios from 'axios'
import { SubmissionError } from 'redux-form'
import jwtDecode from 'jwt-decode'
import { errorNotify, customSuccessNotify } from '../elements/Notices'
import {
  SIGN_IN_USER,
  SIGN_UP_USER,
  SIGN_OUT_USER
} from './types'

const signIn = payload => ({
  type: SIGN_IN_USER,
  payload
})

const signUp = (token, headers) => ({
  type: SIGN_UP_USER,
  payload: {
    token,
    headers
  }
})

export const signOutUser = () => {
  localStorage.removeItem('i-qoom-user')
  return ({
    type: SIGN_OUT_USER
  })
}

export const signInUser = values => (dispatch, getState) => {
  const request = {
    session: {
      ...values
    }
  }
  return (
    axios.post('/api/v1/sessions', request)
      .then(response => {
        const decoded = jwtDecode(response.data.auth_token)
        const userData = {
          ...response.data.user,
          token: response.data.auth_token,
          exp: decoded.exp,
          user_id: decoded.user_id
        }
        dispatch(signIn(userData))
        localStorage.setItem('i-qoom-user', JSON.stringify(getState().user))
      })
      .catch(({ response }) => {
        errorNotify('Something went wrong')
        throw new SubmissionError(response.data)
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
      customSuccessNotify('Thank you for your registration with i-Qoom. An email with a registration link has \
                          been send to you. In order to complete the registration process please confirm your email \
                          by pressing the button in the email')
      dispatch(signUp(response.data, response.headers))
    })
    .catch(({ response }) => {
      errorNotify('Something went wrong')
      throw new SubmissionError(response.data)
    })
}
