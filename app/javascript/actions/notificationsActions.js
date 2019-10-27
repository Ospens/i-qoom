import {
  TOGGLE_STATE,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from './types'

let timer

export const stopStateOffTimer = () => {
  clearTimeout(timer)
  timer = undefined
}

export const toggleState = payload => dispatch => dispatch(({ type: TOGGLE_STATE, payload }))

const stateOffTimer = dispatch => {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => { dispatch(toggleState(false)) }, 5000)
}

export const addNotification = values => dispatch => {
  const notification = {
    ...values,
    id: `f${((Math.random() * 1e8)).toString(16)}`,
    time: values.time ? values.time : new Date()
  }
  dispatch(({ type: ADD_NOTIFICATION, payload: notification }))
  stopStateOffTimer()
  dispatch(toggleState(true))
  stateOffTimer(dispatch)
}

export const removeNotification = index => dispatch => {
  stopStateOffTimer()
  dispatch({ type: REMOVE_NOTIFICATION, payload: index })
}
