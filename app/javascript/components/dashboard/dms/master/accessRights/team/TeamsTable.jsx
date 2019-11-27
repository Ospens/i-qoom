import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import DropDown from '../../../../../../elements/DropDown'
import { getTeams, updateTeamRights } from '../../../../../../actions/accessRightsActions'
import toggleArray from '../../../../../../elements/toggleArray'
import TeamForm from './teamForm/TeamForm'
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

function ModalTrigger({ handleOpen }) {
  return (
    <ul className='buttons-with-icons-list ml-auto'>
      <li className='p-0'>
        <button className='d-flex align-items-center with-icon' onClick={handleOpen}>
          <span className='icon-add_1 mr-2' />
          <span data-title='Create new team'>Create new team</span>
        </button>
      </li>
    </ul>
  )
}

function TeamsTable({ type }) {
  const { project_id } = useParams()
  const dispatch = useDispatch()
  const [checkedMembers, changeChecked] = useState([])
  const [openModal, setOpenModal] = useState(false)
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
    dispatch(updateTeamRights(project_id, v))
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
        <ModalTrigger handleOpen={() => setOpenModal(true)} />
        <TeamForm open={openModal} setOpen={setOpenModal} />
      </div>
      <AccessTable rows={teams} type={type} submitRow={submitRow} />
    </React.Fragment>
  )
}

export default TeamsTable
