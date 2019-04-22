import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import bell from '../../images/alarm-bell'
import messages from '../../images/email-action-unread'
import './Dashboard.scss'
import UserAvatar from 'react-user-avatar'

class TopBar extends Component {

  render() {
    return (
      <div className='user-info'>
        <h3>Project ovreview </h3>
        <ul className=''>
          <li className='nav-item'>
            <button type='button' className='nav-link btn-transparent'>
              <ReactSVG
                svgStyle={{ height: 15, marginRight: 10 }}
                src={messages}
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
            <button type='button' className='nav-link btn-transparent'>
              <UserAvatar size='32' name='Anna Danielsson' />
            </button>
          </li>
        </ul>
      </div>
    )
  }
}

export default TopBar
