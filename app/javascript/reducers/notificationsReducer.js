import React from 'react'
import moment from 'moment'
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from '../actions/types'

const initialState = {
  open: false,
  all: [
    {
      id: `f${(~~(Math.random() * 1e8)).toString(16)}`,
      title: 'Problem',
      time: moment().fromNow(),
      text: 'Something went wrong!',
      type: 'error'
    },
    {
      id: `f${(~~(Math.random() * 1e8)).toString(16)}`,
      title: 'Documents',
      time: moment().endOf('day').fromNow(),
      text: 'Document successfully created',
      type: 'success'
    },
    {
      id: `f${(~~(Math.random() * 1e8)).toString(16)}`,
      title: 'Documents',
      time: moment().startOf('week').fromNow(),
      text: <span>
Revision updated:
        <a href="#">AWE-ECR-EOS-LET-0025</a>
      </span>,
      type: 'info'
    }
  ]
}

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_NOTIFICATION:
    return {
      ...state,
      all: state.all.concat([action.payload])
    }
  case REMOVE_NOTIFICATION:
    return {
      ...state,
      all: state.all.filter((_, i) => i !== action.payload)
    }
  default:
    return state
  }
}

export default notificationsReducer
