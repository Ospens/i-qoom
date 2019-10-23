import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import UserAvatar from 'react-user-avatar'
import Bell from './Bell'
import { signOutUser } from '../../actions/userActions'

function UserOptions({ isLanding = false }) {
  const dispatch = useDispatch()
  const firstName = useSelector(({ user }) => user.first_name)
  const lastName = useSelector(({ user }) => user.last_name)
  const signOut = useCallback(() => dispatch(signOutUser()))
  const ulClass = classnames('header-options', { 'white': isLanding })

  return (
    <ul className={ulClass}>
      <li className='nav-item'>
        <button type='button' className='logout' onClick={signOut}>
          Logout
        </button>
      </li>
      <li className='nav-item nav-item-icon'>
        <button type='button'>
          <span className='icon-email-action-unread gray' />
        </button>
      </li>
      <Bell activeColor='black' />
      <li className='nav-item user-info-avatar'>
        <Link className='nav-link btn-transparent' to='/dashboard'>
          <button type='button' className='nav-link btn-transparent'>
            <UserAvatar size='42' name={`${firstName} ${lastName}`} />
          </button>
        </Link>
      </li>
    </ul>
  )
}

export default UserOptions
