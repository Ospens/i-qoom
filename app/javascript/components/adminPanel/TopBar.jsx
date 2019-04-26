import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import bell from '../../images/alarm-bell'
import messages from '../../images/email-action-unread'
import logo from '../../images/i-Qoom_Brand_Logo_Gradient'
import UserAvatar from 'react-user-avatar'
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
            <button type='button' className='nav-link btn-transparent text-dark' onClick={signOutUser}>
              Logout
            </button>
          </li>
          <li className='nav-item'>
            <button type='button' className='nav-link btn-transparent'>
              <ReactSVG
                svgStyle={{ height: 15, marginRight: 10 }}
                src={messages}
                className='purple-logo'
              />
            </button>
          </li>
          <li className='nav-item'>
            <button type='button' className='nav-link btn-transparent'>
              <ReactSVG
                svgStyle={{ height: 20, marginRight: 10 }}
                src={bell}
              />
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
