import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialize } from 'redux-form'
import { useParams } from 'react-router-dom'
import DropDown from '../../../../../../elements/DropDown'
import MemberRow from '../MemberRow'
import {
  getGrantAccessTeams,
  getGrandedAccessMembers
} from '../../../../../../actions/accessRightsActions'
import toggleArray from '../../../../../../elements/toggleArray'
import CreateTeam from './CreateTeam'

const columns = [
  { title: 'Name', divider: true },
  { title: 'Member-ID', divider: true },
  { title: 'Originating Company', divider: true },
  { title: 'Discipline', divider: true },
  { title: 'Document type', divider: true },
  { title: 'Timelimit', divider: true }
]

const optionBtn = [
  {
    title: 'Define access rights',
    icon: 'icon-common-file-share'
  },
  {
    title: 'Show profile',
    icon: 'icon-single-neutral-actions-text-1'
  },
  {
    title: 'Send message',
    icon: 'icon-email-action-unread'
  },
  {
    title: 'Add to team',
    icon: 'icon-business-team-goal'
  },
  {
    title: 'Add to distribution G.',
    icon: 'icon-business-team-goal'
  },
  {
    title: 'Delete',
    icon: 'icon-bin-1'
  }
]

function TeamsTable({ type }) {
  const { project_id } = useParams()
  const dispatch = useDispatch()
  const members = useSelector(state => state.accessRights[type])
  const [checkedMembers, changeChecked] = useState([])
  const fields = useSelector(state => state.accessRights.fields)

  useEffect(() => {
    changeChecked([])
    if (type === 'newMembers') {
      dispatch(getGrantAccessTeams(project_id))
    } else if (type === 'oldMembers') {
      dispatch(getGrandedAccessMembers(project_id))
    }
  }, [dispatch, type])

  const toggleMemeber = useCallback(value => {
    setCheckedDocs(toggleArray(checkedMembers, value))
  }, [checkedMembers])

  let optionsText = 'Options'

  if (checkedMembers.length) {
    optionsText += `: ${checkedMembers.length} members selected`
  }

  return (
    <React.Fragment>
      <div><label>Select Access rights for members</label></div>
      <div className='d-flex my-4'>
        <DropDown btnName={optionsText} defaultValues={optionBtn} className='d-flex align-self-center' />
        <CreateTeam />
      </div>
    </React.Fragment>
  )
}

export default TeamsTable
