import axios from 'axios'
import { SubmissionError } from 'redux-form'
import jwtDecode from 'jwt-decode'
import {
  SIGN_IN_USER,
  SIGN_UP_USER,
  SIGN_OUT_USER
} from './types'
import { addNotification } from './notificationsActions'

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
        if (response.data.user) {
          dispatch(addNotification({ title: 'Problem', text: response.data.user[0], type: 'error' }))
        } else {
          dispatch(addNotification({ title: 'Problem', text: 'Something went wrong!', type: 'error' }, true))
        }
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
      dispatch(signUp(response.data, response.headers))
    })
    .catch(({ response }) => {
      dispatch(addNotification({ title: 'Problem', text: 'Something went wrong!', type: 'error' }, true))
      throw new SubmissionError(response.data)
    })
}

export const resetPassword = (values, callback) => dispatch => axios.post('/api/v1/users/send_reset_password_instructions', values)
  .then(() => {
    callback()
    dispatch(addNotification({ title: 'System', text: 'Email was sent!', type: 'success' }))
  })
  .catch(({ response }) => {
    dispatch(addNotification({ title: 'Problem', text: 'Something went wrong!', type: 'error' }, true))
    throw new SubmissionError(response.data)
  })

export const updatePassword = (values, callback) => dispatch => axios.patch('/api/v1/users/update_password', values)
  .then(() => {
    callback()
    dispatch(addNotification({ title: 'System', text: 'Password was changed!', type: 'success' }))
  })
  .catch(({ response }) => {
    dispatch(addNotification({ title: 'Problem', text: 'Something went wrong!', type: 'error' }, true))
    throw new SubmissionError(response.data)
  })
