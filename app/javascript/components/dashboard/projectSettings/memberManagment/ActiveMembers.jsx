import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MemberTable from './MemberTable'
import DropDown from '../../../../elements/DropDown'
import { renderDropDownItems } from '../MemberManagment'
import { startFetchActiveProjectMembers } from '../../../../actions/projectMembersActions'

function ActiveMembers({ projectId }) {
  const dispatch = useDispatch()
  const members = useSelector(state => state.projectMembers.activeMembers)
  useEffect(() => { dispatch(startFetchActiveProjectMembers(projectId)) }, [dispatch, projectId])

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
        <MemberTable members={members} projectId={projectId} type='activeMemebers' />
      </div>
    </React.Fragment>
  )
}

export default ActiveMembers
