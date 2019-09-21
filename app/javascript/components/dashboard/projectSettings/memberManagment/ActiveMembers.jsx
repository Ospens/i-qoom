import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MemberTable from './MemberTable'
import DropDown from '../../../../elements/DropDown'
import { startFetchActiveProjectMembers } from '../../../../actions/projectMembersActions'

const actionDDitems = [
  {
    title: 'Send invite',
    icon: 'icon-email-action-send-2 gray'
  },
  {
    title: 'Edit member',
    icon: 'icon-pencil-write gray'
  },
  {
    title: 'Delete',
    icon: 'icon-bin-1 gray'
  },
]

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
          defaultValues={actionDDitems}
        />
      </div>
      <div>
        <MemberTable members={members} projectId={projectId} type='activeMemebers' />
      </div>
    </React.Fragment>
  )
}

export default ActiveMembers
