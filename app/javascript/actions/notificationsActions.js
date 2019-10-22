import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from './types'

export const addNotification = values => dispatch => (
  dispatch(({ type: ADD_NOTIFICATION, payload: values }))
)

export const removeNotification = index => dispatch => dispatch({ type: REMOVE_NOTIFICATION, payload: index })
