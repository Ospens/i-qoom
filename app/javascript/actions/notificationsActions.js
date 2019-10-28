import {
  TOGGLE_STATE,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from './types'

let offTimer

export const stopStateOffTimer = () => {
  clearTimeout(offTimer)
  offTimer = undefined
}

export const toggleState = payload => dispatch => dispatch(({ type: TOGGLE_STATE, payload }))

const stateOffTimer = dispatch => {
  if (offTimer) {
    clearTimeout(offTimer)
  }
  offTimer = setTimeout(() => { dispatch(toggleState(false)) }, 5000)
}

export const addNotification = values => dispatch => {
  const notification = {
    ...values,
    id: `f${((Math.random() * 1e8)).toString(16)}`,
    time: values.time ? values.time : new Date()
  }
  dispatch(({ type: ADD_NOTIFICATION, payload: notification }))
  if (values.type === 'error') {
    setTimeout(() => { dispatch(removeNotification(notification.id)) }, 4900)
  }
  dispatch(toggleState(true))
  stateOffTimer(dispatch)
}

export const removeNotification = id => dispatch => {
  stopStateOffTimer()
  dispatch({ type: REMOVE_NOTIFICATION, payload: id })
}
