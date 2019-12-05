import React, {
  useRef, useLayoutEffect, useState, useCallback
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import moment from 'moment'
import { removeNotification } from '../../actions/notificationsActions'

function Notifications() {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const [fixed, setFixed] = useState(false)
  const notifications = useSelector(state => state.notifications.all)
  const state = useSelector(s => s.notifications.open)
  const removeItem = useCallback(id => dispatch(removeNotification(id)), [dispatch])
  const withErrors = notifications.filter(el => el.type === 'error').length > 0

  useLayoutEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 0) {
        setFixed(true)
      } else {
        setFixed(false)
      }
    }
    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  const multi = notifications.length > 1

  return (
    <TransitionGroup>
      {notifications.length > 0 && state
      && (
        <CSSTransition
          classNames="notifications_block"
          ref={ref}
          key="notifications_block"
          timeout={300}
        >
          <div className={classnames({ fixed }, { errors: withErrors }, 'notifications_block')}>
            <div className={classnames('notifications_header', { 'one-child': !multi })}>
              <div>Notifications</div>
              <div>{notifications.length}</div>
            </div>
            <div className="notifications_content">
              <TransitionGroup>
                {notifications.map(({
                  title, text, time, type, id
                }) => (
                  <CSSTransition
                    key={id}
                    classNames="notifications_content__element"
                    timeout={300}
                  >
                    <div className="notifications_content__element" key={id}>
                      <div className="notifications_content__element-content">
                        <div className="notifications_content__element-title">
                          {title}
                        </div>
                        <div className={classnames('notifications_content__element-msg', type)}>
                          {text}
                        </div>
                        <div className="notifications_content__element-time">
                          {moment(time).fromNow()}
                        </div>
                      </div>
                      <div className="notifications_content__element-close-button">
                        <button type="button" onClick={() => removeItem(id)}>
                          <span className="icon-delete_2">
                            <span className="path1" />
                            <span className="path2" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </div>
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  )
}

export default Notifications
