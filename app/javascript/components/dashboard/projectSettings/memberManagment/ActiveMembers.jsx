import React, { Component } from 'react'
import { connect } from 'react-redux'
import MemberTable from './MemberTable'
import DropDown from '../../../../elements/DropDown'
import { renderDropDownItems } from '../MemberManagment'
import { startFetchActiveProjectMembers } from '../../../../actions/projectMembersActions'

class ActiveMembers extends Component {

  componentWillMount() {
    const { startFetchActiveProjectMembers, projectId } = this.props
    startFetchActiveProjectMembers(projectId)
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
          <MemberTable {...this.props} />
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  members: state.projectMembers.activeMembers
})

const mapDispatchToProps = dispatch => ({
  startFetchActiveProjectMembers: id => dispatch(startFetchActiveProjectMembers(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ActiveMembers)
