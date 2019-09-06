import React, { Component } from 'react'
import { connect } from 'react-redux'
import MemberTable from './MemberTable'
import DropDown from '../../../../elements/DropDown'
import { renderDropDownItems } from '../MemberManagment'
import { startFetchPendingProjectMembers } from '../../../../actions/projectMembersActions'

class PendingMembers extends Component {

  componentWillMount() {
    const { startFetchPendingProjectMembers, projectId } = this.props
    startFetchPendingProjectMembers(projectId)
  }

  render() {
    return (

      <React.Fragment>
        <div>
          <span className='tab-description'>Manage members and grant access</span>
          <DropDown
            btnName='Action'
            className='manage-members-actions-button mt-4'
          >
            {renderDropDownItems('email-action-icon-2 gray', 'Send invite')}
            {renderDropDownItems('pencil-icon gray', 'Edit member')}
            {renderDropDownItems('trash-icon gray', 'Delete')}
          </DropDown>
        </div>
        <div>
          <MemberTable {...this.props} type='pendingMemebers' />
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  members: state.projectMembers.pendingMembers
})

const mapDispatchToProps = dispatch => ({
  startFetchPendingProjectMembers: id => dispatch(startFetchPendingProjectMembers(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PendingMembers)
