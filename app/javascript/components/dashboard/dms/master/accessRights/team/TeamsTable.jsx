import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import DropDown from '../../../../../../elements/DropDown'
import {
  getTeams,
  updateTeamRights,
  getGrandedAccessMembers
} from '../../../../../../actions/accessRightsActions'
import toggleArray from '../../../../../../elements/toggleArray'
import TeamForm from './TeamForm'
import AccessTable from '../accessTable/AccessTable'

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
  const [checkedMembers, changeChecked] = useState([])
  const teams = useSelector(state => state.accessRights[type])
  
  useEffect(() => {
    changeChecked([])
    if (type === 'oldTeams') {
      dispatch(getTeams(project_id))
    } else if (type === 'newTeams') {
      dispatch(getTeams(project_id, true))
    }
  }, [dispatch, type])

  const toggleMemeber = useCallback(value => {
    setCheckedDocs(toggleArray(checkedMembers, value))
  }, [checkedMembers])

  const submitRow = useCallback(v => {
    dispatch(updateTeamRights(project_id, v, type))
  }, [dispatch, project_id])

  let optionsText = 'Options'

  if (checkedMembers.length) {
    optionsText += `: ${checkedMembers.length} members selected`
  }

  return (
    <React.Fragment>
      <div><label>Select Access rights for members</label></div>
      <div className='d-flex my-4'>
        <DropDown btnName={optionsText} defaultValues={optionBtn} className='d-flex align-self-center' />
        <TeamForm submitRow={submitRow} />
      </div>
      <AccessTable rows={teams} type={type} submitRow={submitRow} />
    </React.Fragment>
  )
}

export default TeamsTable
