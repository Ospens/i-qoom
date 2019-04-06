import axios from 'axios'
import jwtDecode from 'jwt-decode'
import {
  SIGN_IN_USER
} from './types'

const signIn = (token, headers, expiry) => ({
  type: SIGN_IN_USER,
  payload: {
    token,
    headers,
    expiry
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
