import React, { Component } from 'react'
import classnames from 'classnames'
import ReactSVG from 'react-svg'
import ActiveMembers from './memberManagment/ActiveMembers'
import PendingMembers from './memberManagment/PendingMembers'
import roleList from '../../../images/task-list-edit'
import disciplineList from '../../../images/common-file-text'
import blueCcheck from '../../../images/add_1'
import DropDown from '../../../elements/DropDown'
import pencil from '../../../images/pencil-write'
import emailSend from '../../../images/email-action-send-2'
import greenCheck from '../../../images/check_3'
import trash_bucket from '../../../images/trash_bucket'
import AddMember from './memberManagment/AddMember'


class MemberManagment extends Component {

  state = {
    tab: 1,
    addMemberModal: false
  }

  changeTab = (val) => {
    this.setState({ tab: val })
  }

  renderDropDownItems = (pic, name) => (
    <a className='dropdown-item' href='#'>
      <ReactSVG
        svgStyle={{ height: 13, width: 13 }}
        src={pic}
      />
      <span className='item-text'>
        {name}
      </span>
    </a>
  )

  render() {
    const { tab, addMemberModal } = this.state
    return (
      <div id='member-managment'>
        <div className='member-managment-first-line'>
          <h5 className='tab-title'>Define default filters</h5>
          <div className='member-managment-buttons'>
            <div>
              <button type='button' className='btn with-icon'>
                <ReactSVG
                  svgStyle={{ height: 13, width: 13, marginRight: 5 }}
                  src={roleList}
                />
                <span>Role list</span>
              </button>
            </div>
            <div>
              <button type='button' className='btn with-icon'>
                <ReactSVG
                  svgStyle={{ height: 13, width: 13, marginRight: 5 }}
                  src={disciplineList}
                />
                <span>Discipline list</span>
              </button>
            </div>
            <div>
              <button type='button' className='btn with-icon' onClick={() => this.setState({ addMemberModal: true })}>
                <ReactSVG
                  svgStyle={{ height: 13, width: 13, marginRight: 5 }}
                  src={blueCcheck}
                />
                <span>Add member</span>
              </button>
            </div>
          </div>
        </div>
        <div className='nav-bar'>
          <div className='nav-bar-item'>
            <button className={classnames('nav-bar-element', { 'active': tab === 1 })} onClick={() => this.changeTab(1)}>
              <span className='yellow-dot'></span>
              Active members
            </button>
          </div>
          <div className='nav-bar-item'>
            <button className={classnames('nav-bar-element', { 'active': tab === 2 })} onClick={() => this.changeTab(2)}>
              <ReactSVG
                svgStyle={{ width: 10, marginRight: 15 }}
                src={greenCheck}
              />
              Pending members
            </button>
          </div>
        </div>
        <div>
          <span className='tab-description'>Manage members and grant access</span>
          <DropDown
            btnName='Action'
            className='mt-4'
          >
            {this.renderDropDownItems(emailSend, 'Send invite')}
            {this.renderDropDownItems(pencil, 'Edit member')}
            {this.renderDropDownItems(trash_bucket, 'Delete')}
          </DropDown>
        </div>
        {tab === 1 && <ActiveMembers/>}
        {tab === 2 && <PendingMembers />}
        {addMemberModal && <AddMember closeModal={() => this.setState({ addMemberModal: false })}/>}
      </div>
    )
  }
}

export default MemberManagment