import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import ActiveMembers from './memberManagment/ActiveMembers'
import PendingMembers from './memberManagment/PendingMembers'
import NewModal from '../../../elements/Modal'
import Tabs from '../../../elements/Tabs'
import AddMember from './memberManagment/AddMember'
import DisciplineList from './memberManagment/DisciplineList'
import RoleList from './memberManagment/RoleList'
import { startCreateProjectMember, startUpdateProjectMember } from '../../../actions/projectMembersActions'

const initialState = {
  step: 1,
  addMemberModal: false,
  discipline: false,
  role: false,
  modal: false
}

export const renderDropDownItems = (icon, name) => (
  <button className='dropdown-item' type='button'>
    <span className={icon} />
    <span className='item-text'>
      {name}
    </span>
  </button>
)

class MemberManagment extends Component {

  state = initialState

  changeStep = val => { this.setState({ step: val }) }

  nextStep = () => this.setState(prevState => ({ step: prevState.step + 1 }))

  openModal = type => () => this.setState({ modal: true, [type]: true })

  closeModal = () => {
    this.setState(initialState)
    this.changeStep(1)
  }

  handleSubmitMember = values => {
    const { step } = this.state
    const {
      startCreateProjectMember,
      startUpdateProjectMember,
      match: { params: { projectId } }
    } = this.props

    switch (step) {
      case '1':
        values.creation_step = 'employment_type'
        return
      case '2':
        values.creation_step = 'company_type'
        return
      case '3':
        values.creation_step = 'company_data'
        return
      case '4':
        values.creation_step = 'details'
        return
      default:
        values.creation_step = 'employment_type'
    }

    if (!values.id) {
      return startCreateProjectMember(values, projectId).then(this.nextStep())
    } else if (step === 4) {
      return startUpdateProjectMember(values, projectId).then(this.closeModal)
    } else {
      return startUpdateProjectMember(values, projectId).then(this.nextStep())
    }
  }

  renderNewMemberModal = () => {
    const { step } = this.state
    const { match: { params: { projectId } } } = this.props
    return (
      <AddMember
        closeModal={this.closeModal}
        projectId={projectId}
        onSubmit={this.handleSubmitMember}
        step={step}
        changeStep={this.changeStep}
      />
    )
  }

  renderDisciplineModal = () => {
    const { match: { params: { projectId } } } = this.props

    return (
      <DisciplineList
        closeModal={this.closeModal}
        projectId={projectId}
      />
    )
  }

  renderRoleModal = () => {
    const { match: { params: { projectId } } } = this.props

    return (
      <RoleList
        closeModal={this.closeModal}
        projectId={projectId}
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
    const { match: { params: { projectId } } } = this.props

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
                <span className='icon-task-list-edit' />
                <span data-title='Role list'>Role list</span>
              </button>
            </li>
            <li>
              <button
                type='button'
                className='with-icon'
                onClick={this.openModal('discipline')}
              >
                <span className='icon-common-file-text1' />
                <span data-title='Discipline list'>Discipline list</span>
              </button>
            </li>
            <li>
              <button
                type='button'
                className='with-icon'
                onClick={this.openModal('addMemberModal')}
              >
                <span className='icon-add_1' />
                <span data-title='Add a member'>Add a member</span>
              </button>
            </li>
          </ul>
        </div>
        <Tabs>
          <div label='Active members'>
            <ActiveMembers projectId={projectId} />
          </div>
          <div label='Pending members'>
            <PendingMembers projectId={projectId} />
          </div>
        </Tabs>
        <NewModal
          content={this.rendeModalContent()}
          open={modal}
          onClose={this.closeModal}
          closeOnDimmerClick={false}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startCreateProjectMember: (values, projectId) => dispatch(startCreateProjectMember(values, projectId)),
  startUpdateProjectMember: (values, projectId) => dispatch(startUpdateProjectMember(values, projectId, 'creating'))
})

export default withRouter(connect(null, mapDispatchToProps)(reduxForm({ form: 'project_member_form' })(MemberManagment)))
