import React, { useRef, useLayoutEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { CSSTransitionGroup } from 'react-transition-group'
import { removeNotification } from '../../actions/notificationsActions'
import moment from 'moment'

function Notifications() {
  const ref = useRef()
  const dispatch = useDispatch()
  const [fixed, setFixed] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const notifications = useSelector(state => state.notifications.all)
  const state = useSelector(state => state.notifications.open)
  const removeItem = useCallback(index => dispatch(removeNotification(index)), [dispatch])
  const withErrors = notifications.filter(el => el.type === 'error').length > 0

  useLayoutEffect(() => {
    if (!document.body) return
    // const posTopRef = ref.current.getBoundingClientRect()
    const onScroll = () => {
      setScrollTop(window.scrollY)
      if (window.scrollY > 0) {
        setFixed(true)
      } else {
        setFixed(false)
      }
    }
    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll)
  }, [scrollTop, fixed])

  const multi = notifications.length > 1

  return (
    <CSSTransitionGroup
      transitionName='notifications_block'
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
    >
      {notifications.length > 0 && state &&
      <div 
        className={classnames('notifications_block', { fixed }, { 'errors': withErrors })}
        ref={ref}
        key='notifications_block'
      >
        <div className={classnames('notifications_header', { 'one-child': !multi })}>
          <div>Notifications</div>
          <div>{notifications.length}</div>
        </div>
        <div className='notifications_content'>
          <CSSTransitionGroup
            transitionName='notifications_content__element'
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {notifications.map(({ title, text, time, type, id }, i) => {
              return (
                <div className='notifications_content__element' key={id}>
                  <div className='notifications_content__element-content'>
                    <div className='notifications_content__element-title'>
                      {title}
                    </div>
                    <div className={classnames('notifications_content__element-msg', type)}>
                      {text}
                    </div>
                    <div className='notifications_content__element-time'>
                      {moment(time).fromNow()}
                    </div>
                  </div>
                  <div className='notifications_content__element-close-button'>
                    <button type='button' onClick={() => removeItem(i)}>
                      <span className='icon-delete_2'><span className='path1'></span><span className='path2'></span></span>
                    </button>
                  </div>
                </div>)
            })}
          </CSSTransitionGroup>
        </div>
      </div>}
    </CSSTransitionGroup>
  )
}

export default Notifications
