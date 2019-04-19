import React, { Component } from 'react'
import classnames from 'classnames'
import ActiveMembers from './memberManagment/ActiveMembers'


class MemberManagment extends Component {

  state = {
    tab: 1
  }

  changeTab = (val) => {
    this.setState({ tab: val })
  }

  render() {
    const { tab } = this.state
    return (
      <div id='member-managment'>
        <div className='nav-bar'>
          <div className='nav-bar-item'>
            <button className={classnames('nav-bar-element', { 'active': tab === 1 })} onClick={() => this.changeTab(1)}>
              Active members
            </button>
          </div>
          <div className='nav-bar-item'>
            <button className={classnames('nav-bar-element', { 'active': tab === 2 })} onClick={() => this.changeTab(2)}>
              Pending members
            </button>
          </div>
        </div>
        {tab === 1 && <ActiveMembers/>}
      </div>
    )
  }
}

export default MemberManagment