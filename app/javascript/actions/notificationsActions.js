import {
  TOGGLE_STATE,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from './types'
import generateId from '../elements/generateId'

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

export const removeNotification = id => dispatch => {
  stopStateOffTimer()
  dispatch({ type: REMOVE_NOTIFICATION, payload: id })
}

export const addNotification = (values, autoDelete) => dispatch => {
  const notification = {
    ...values,
    id: generateId(),
    time: new Date() // values.time ? values.time : new Date()
  }
  dispatch(({ type: ADD_NOTIFICATION, payload: notification }))
  if (autoDelete) {
    setTimeout(() => { dispatch(removeNotification(notification.id)) }, 4900)
  }
  dispatch(toggleState(true))
  stateOffTimer(dispatch)
}

export const errorNotify = (title, text, autoDelete = true) => dispatch => {
  const values = {
    title,
    text: text || 'Something went wrong!',
    type: 'error'
  }
  dispatch(addNotification(values, autoDelete))
}

export const successNotify = (title, text, autoDelete = false) => dispatch => {
  const values = {
    title,
    text,
    type: 'success'
  }
  dispatch(addNotification(values, autoDelete))
}

export const infoNotify = (title, text, autoDelete = false) => dispatch => {
  const values = {
    title,
    text,
    type: 'info'
  }
  dispatch(addNotification(values, autoDelete))
}
