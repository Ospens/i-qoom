import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialize } from 'redux-form'
import MemberTable from './MemberTable'
import MemberForm from './MemberForm'
import NewModal from '../../../../elements/Modal'
import DropDown from '../../../../elements/DropDown'
import {
  startFetchActiveProjectMembers,
  startFetchPendingProjectMembers,
  deleteMembers
} from '../../../../actions/projectMembersActions'
import { inviteMembers } from '../../../../actions/projectActions'
import toggleArray from '../../../../elements/toggleArray'
import { ACTIVE_MEMBERS, PENDING_MEMBERS } from './membersTypes'

const items = (checkedMembers, isPending, sendInvite, deleteMember, editForm) => {
  const disabled = checkedMembers.length === 0
  const multiple = checkedMembers.length > 1
  const actions = [
    {
      title: 'Edit member',
      icon: 'icon-pencil-write',
      onClick: editForm,
      disabled: disabled || multiple
    },
    {
      title: 'Delete',
      icon: 'icon-bin-1',
      onClick: deleteMember,
      disabled
    }
  ]
  if (isPending) {
    actions.unshift({
      title: 'Send invite',
      icon: 'icon-email-action-send-2',
      onClick: sendInvite,
      disabled
    })
  }
  return actions
}

function MembersBlock({ projectId, type }) {
  const dispatch = useDispatch()
  const [checkedMembers, setCheckedMembers] = useState([])
  const [modal, setModal] = useState(false)
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

  const startDeleteMembers = useCallback(() => {
    dispatch(deleteMembers(projectId, checkedMembers))
  }, [checkedMembers, dispatch, projectId])

  const updateCheckedMembers = useCallback(value => {
    setCheckedMembers(toggleArray(checkedMembers, value))
  }, [checkedMembers])

  const editForm = useCallback(() => {
    if (checkedMembers.length < 1) return

    const member = members.find(m => m.id === checkedMembers[0])
    setModal(true)
    dispatch(initialize('project_member_form', member))
  }, [dispatch, members, checkedMembers])

  const closeModal = useCallback(() => setModal(false), [])
  const memberForm = <MemberForm closeModal={closeModal} editing />
  const isPending = type === PENDING_MEMBERS
  return (
    <React.Fragment>
      <div>
        <NewModal
          content={memberForm}
          open={modal}
          onClose={closeModal}
          closeOnDimmerClick={false}
        />
        <span className="tab-description">Manage members and grant access</span>
        <DropDown
          btnName="Action"
          className="manage-members-actions-button mt-4"
          defaultValues={items(checkedMembers, isPending, sendInvite, startDeleteMembers, editForm)}
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
