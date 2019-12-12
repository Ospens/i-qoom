import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MemberTable from './MemberTable'
import DropDown from '../../../../elements/DropDown'
import {
  startFetchActiveProjectMembers,
  startFetchPendingProjectMembers
} from '../../../../actions/projectMembersActions'
import { inviteMembers } from '../../../../actions/projectActions'
import toggleArray from '../../../../elements/toggleArray'
import { ACTIVE_MEMBERS, PENDING_MEMBERS } from './membersTypes'

const items = (isPending, sendInvite) => {
  const actions = [
    {
      title: 'Edit member',
      icon: 'icon-pencil-write'
    },
    {
      title: 'Delete',
      icon: 'icon-bin-1'
    }
  ]
  if (isPending) {
    actions.unshift({
      title: 'Send invite',
      icon: 'icon-email-action-send-2',
      onClick: sendInvite
    })
  }
  return actions
}

function MembersBlock({ projectId, type }) {
  const dispatch = useDispatch()
  const [checkedMembers, setCheckedMembers] = useState([])
  const members = useSelector(state => state.projectMembers[type])
  useEffect(() => {
    setCheckedMembers([])
    if (type === ACTIVE_MEMBERS) {
      dispatch(startFetchActiveProjectMembers(projectId))
    } else {
      dispatch(startFetchPendingProjectMembers(projectId))
    }
  }, [dispatch, projectId, type])

  const sendInvite = useCallback(() => {
    dispatch(inviteMembers(projectId, checkedMembers))
  }, [checkedMembers, dispatch, projectId])

  const updateCheckedMembers = useCallback(value => {
    setCheckedMembers(toggleArray(checkedMembers, value))
  }, [checkedMembers])

  return (
    <React.Fragment>
      <div>
        <span className="tab-description">Manage members and grant access</span>
        <DropDown
          btnName="Action"
          className="manage-members-actions-button mt-4"
          defaultValues={items(type === PENDING_MEMBERS, sendInvite)}
        />
      </div>
      <div>
        <MemberTable
          members={members}
          projectId={projectId}
          type={type}
          updateCheckedMembers={updateCheckedMembers}
          checkedMembers={checkedMembers}
        />
      </div>
    </React.Fragment>
  )
}

export default MembersBlock
