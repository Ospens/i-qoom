import {
  TOGGLE_STATE,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from './types'

export const toggleState = payload => dispatch => dispatch(({ type: TOGGLE_STATE, payload }))

export const addNotification = values => dispatch => {
  const notification = {
    ...values,
    id: `f${((Math.random() * 1e8)).toString(16)}`,
    time: values.time ? values.time : new Date()
  }
  dispatch(({ type: ADD_NOTIFICATION, payload: notification }))
  dispatch(toggleState(true))
}

export const removeNotification = index => dispatch => (
  dispatch({ type: REMOVE_NOTIFICATION, payload: index })
)
