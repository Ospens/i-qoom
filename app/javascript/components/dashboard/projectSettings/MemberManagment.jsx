import React, { Component } from 'react'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'
import ActiveMembers from './memberManagment/ActiveMembers'
import PendingMembers from './memberManagment/PendingMembers'
import NewModal from '../../../elements/Modal'
import Tabs from '../../../elements/Tabs'
import AddMember from './memberManagment/AddMember'
import DisciplineList from './memberManagment/DisciplineList'
import RoleList from './memberManagment/RoleList'

const initialState = {
  addMemberModal: false,
  discipline: false,
  role: false,
  modal: false
}

export const renderDropDownItems = (icon, name) => (
  <button className='dropdown-item' type='button'>
    <i className={classnames("svg-icon", icon)} />
    <span className='item-text'>
      {name}
    </span>
  </button>
)

class MemberManagment extends Component {

  state = initialState

  openModal = type => () => this.setState({ modal: true, [type]: true })

  closeModal = () => this.setState(initialState)

  renderNewMemberModal = () => {
    const { match: { params: { project_id } } } = this.props
    return (
      <AddMember
        closeModal={this.closeModal}
        projectId={project_id}
      />
    )
  }

  renderDisciplineModal = () => {
    const { match: { params: { project_id } } } = this.props

    return (
      <DisciplineList
        closeModal={this.closeModal}
        projectId={project_id}
      />
    )
  }

  renderRoleModal = () => {
    const { match: { params: { project_id } } } = this.props

    return (
      <RoleList
        closeModal={this.closeModal}
        projectId={project_id}
      />
    )
  }

  rendeModalContent = () => {
    const { addMemberModal, discipline, role } = this.state
    if (addMemberModal) {
      return this.renderNewMemberModal()
    } else if (role) {
      return this.renderRoleModal()
    } else if (discipline) {
      return this.renderDisciplineModal()
    }
  }

  render() {
    const { modal } = this.state
    const { match: { params: { project_id } } } = this.props

    return (
      <div id='member-managment'>
        <div className='member-managment-first-line'>
          <h5 className='tab-title'>Define default filters</h5>
          <ul className='member-managment-buttons buttons-with-icons-list'>
            <li>
              <button 
                type='button'
                className='with-icon'
                onClick={this.openModal('role')}
              >
                <i className='svg-icon task-list-edit-icon' />
                <span data-title='Role list'>Role list</span>
              </button>
            </li>
            <li>
              <button 
                type='button'
                className='with-icon'
                onClick={this.openModal('discipline')}
              >
                <i className='svg-icon common-file-icon' />
                <span data-title='Discipline list'>Discipline list</span>
              </button>
            </li>
            <li>
              <button
                type='button'
                className='with-icon'
                onClick={this.openModal('addMemberModal')}
              >
                <i className='svg-icon blue-plus-icon' />
                <span data-title='Add a member'>Add a member</span>
              </button>
            </li>
          </ul>
        </div>
        <Tabs>
          <div label='Active members'>
            <ActiveMembers projectId={project_id} />
          </div>
          <div label='Pending members'>
            <PendingMembers projectId={project_id} />
          </div>
        </Tabs>
        <NewModal
          content={this.rendeModalContent()}
          open={modal}
          onClose={this.closeModal}
        />
      </div>
    )
  }
}

export default withRouter(MemberManagment)
