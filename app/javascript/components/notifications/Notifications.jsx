import React, { useRef, useLayoutEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { CSSTransitionGroup } from 'react-transition-group'
import { removeNotification } from '../../actions/notificationsActions'

function Notifications() {
  const ref = useRef()
  const dispatch = useDispatch()
  const [fixed, setFixed] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const notifications = useSelector(state => state.notifications.all)
  const removeItem = useCallback(index => dispatch(removeNotification(index)), [dispatch])

  useLayoutEffect(() => {
    if (!document.getElementById('main')) return
    const posTopRef = ref.current.getBoundingClientRect().top
    const onScroll = e => {
      setScrollTop(e.target.closest('#main').scrollTop)
      if (fixed) return

      setFixed(posTopRef < 0)
    }
    document.getElementById('main').addEventListener('scroll', onScroll)

    return () => document.getElementById('main').removeEventListener('scroll', onScroll)
  }, [scrollTop])

  const multi = notifications.length > 1

  return (
    <CSSTransitionGroup
      transitionName='notifications_block'
      transitionEnterTimeout={700}
      transitionLeaveTimeout={700}
    >
      {notifications.length > 0 && <div className={classnames('notifications_block errors', { fixed })} ref={ref} key='notifications_block'>
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
                      {time}
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
