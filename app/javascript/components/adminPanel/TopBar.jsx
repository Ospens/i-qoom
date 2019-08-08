import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserAvatar from 'react-user-avatar'
import logo from '../../images/i-Qoom_Brand_Logo_Gradient'
import { signOutUser } from '../../actions/userActions'

class TopBar extends Component {

  render() {
    const { signOutUser } = this.props
    return (
      <div className='top-bar-user-info'>
        <h2 className='logo-png' >
          <img src={logo} />
        </h2>
        <ul className=''>
          <li className='nav-item'>
            <button
              type='button'
              className='nav-link btn-transparent text-dark'
              onClick={signOutUser}
            >
              Logout
            </button>
          </li>
          <li className='nav-item'>
            <button type='button' className='btn'>
              <i className='svg-icon email-unread-icon gray' />
            </button>
          </li>
          <li className='nav-item'>
            <button type='button' className='btn'>
              <i className='svg-icon alarm-bell-icon gray' />
            </button>
          </li>
          <li className='nav-item'>
            <button type='button' className='nav-link btn-transparent user-info-avatar'>
              <UserAvatar size='42' name='Anna Danielsson' />
            </button>
          </li>
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signOutUser: () => dispatch(signOutUser())
})

export default connect(null, mapDispatchToProps)(TopBar)
