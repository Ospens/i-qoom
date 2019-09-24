import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MemberTable from './MemberTable'
import DropDown from '../../../../elements/DropDown'
import { actionDDitems } from './ActiveMembers'
import { startFetchPendingProjectMembers } from '../../../../actions/projectMembersActions'

function PendingMembers({ projectId }) {
  const dispatch = useDispatch()
  const members = useSelector(state => state.projectMembers.pendingMembers)
  useEffect(() => { dispatch(startFetchPendingProjectMembers(projectId)) }, [dispatch, projectId])

  return (
    <React.Fragment>
      <div>
        <span className='tab-description'>Manage members and grant access</span>
        <DropDown
          btnName='Action'
          className='manage-members-actions-button mt-4'
          defaultValues={actionDDitems}
        />
      </div>
      <div>
        <MemberTable members={members} projectId={projectId} type='pendingMemebers' />
      </div>
    </React.Fragment>
  )
}

export default PendingMembers
