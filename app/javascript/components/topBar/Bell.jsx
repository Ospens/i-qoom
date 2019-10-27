import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import { toggleState, stopStateOffTimer } from '../../actions/notificationsActions'

function Bell({ activeColor }) {
  const dispatch = useDispatch()
  const notifications = useSelector(({ notifications }) => notifications.all)
  const toggleNotices = useCallback(() => {
    dispatch(toggleState())
    stopStateOffTimer()
  })

  return (
    <li className='nav-item nav-item-icon notifications-bell-container'>
      <button type='button' onClick={() => toggleNotices()}>
        <span className={classnames('icon-alarm-bell', { [activeColor]: notifications.length > 0 }, { 'gray': notifications.length < 1 })} />
        <span className={classnames('notifications-bell', { 'notices': notifications.length > 0 })} />
      </button>
    </li>
  )
}

export default Bell
