import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'
import ActiveMembers from './memberManagment/ActiveMembers'
import PendingMembers from './memberManagment/PendingMembers'
import NewModal from '../../../elements/Modal'
import Tabs from '../../../elements/Tabs'
import DropDown from '../../../elements/DropDown'
import AddMember from './memberManagment/AddMember'
import { startFetchProjectMembers } from '../../../actions/projectMembersActions'

class MemberManagment extends Component {

  state = {
    addMemberModal: false
  }

  componentWillMount() {
    const { startFetchProjectMembers, match: { params: { project_id } } } = this.props
    startFetchProjectMembers(project_id)
  }

  renderDropDownItems = (icon, name) => (
    <a className='dropdown-item' href='#'>
      <i className={classnames("svg-icon", icon)} />
      <span className='item-text'>
        {name}
      </span>
    </a>
  )

  renderNewMemberModal = () => {
    const { match: { params: { project_id } } } = this.props
    return (
      <AddMember
        closeModal={() => this.setState({ addMemberModal: false })}
        projectId={project_id}
      />
    )
  }

  render() {
    const { addMemberModal } = this.state
    const { match: { params: { project_id } } } = this.props

    return (
      <div id='member-managment'>
        <div className='member-managment-first-line'>
          <h5 className='tab-title'>Define default filters</h5>
          <div className='member-managment-buttons'>
            <div>
              <button type='button' className='btn with-icon'>
                <i className='svg-icon task-list-edit-icon' />
                <span>Role list</span>
              </button>
            </div>
            <div>
              <button type='button' className='btn with-icon'>
                <i className='svg-icon common-file-icon' />
                <span>Discipline list</span>
              </button>
            </div>
            <div>
              <button
                type='button'
                className='btn with-icon'
                onClick={() => this.setState({ addMemberModal: true })}
              >
                <i className='svg-icon blue-plus-icon' />
                <span>Add member</span>
              </button>
            </div>
          </div>
        </div>
        <Tabs>
          <div label='Active members'>
            <React.Fragment>
              <div>
                <span className='tab-description'>Manage members and grant access</span>
                <DropDown
                  btnName='Action'
                  className='manage-members-actions-button mt-4'
                >
                  {this.renderDropDownItems('email-action-icon-2 gray', 'Send invite')}
                  {this.renderDropDownItems('pencil-icon gray', 'Edit member')}
                  {this.renderDropDownItems('trash-icon gray', 'Delete')}
                </DropDown>
              </div>
              <ActiveMembers projectId={project_id}/>
            </React.Fragment>
          </div>
          <div label='Pending members'>
            <React.Fragment>
              <div>
                <span className='tab-description'>Manage members and grant access</span>
                <DropDown
                  btnName='Action'
                  className='mt-4'
                >
                  {this.renderDropDownItems('email-action-icon-2 gray', 'Send invite')}
                  {this.renderDropDownItems('pencil-icon gray', 'Edit member')}
                  {this.renderDropDownItems('trash-icon gray', 'Delete')}
                </DropDown>
              </div>
              <PendingMembers />
            </React.Fragment>
          </div>
        </Tabs>
        <NewModal
          content={this.renderNewMemberModal()}
          open={addMemberModal}
          onClose={() => this.setState({ addMemberModal: false })}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startFetchProjectMembers: id => dispatch(startFetchProjectMembers(id))
})

const mapStateToProps = state => ({ })

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MemberManagment))

