import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialize } from 'redux-form'
import { useParams } from 'react-router-dom'
import DropDown from '../../../../../../elements/DropDown'
import { getTeams, updateTeamRights } from '../../../../../../actions/accessRightsActions'
import toggleArray from '../../../../../../elements/toggleArray'
import TeamForm from './teamForm/TeamForm'
import AccessTable from '../accessTable/AccessTable'
import BulkEditRights from './BulkEditRights'
import NewModal from '../../../../../../elements/Modal'

const actions = (checkedLength, handleOpenBulkEdit) => {
  const disabled = checkedLength === 0
  const multiple = checkedLength > 1

  return (
    [
      {
        title: 'Edit team',
        icon: 'icon-business-team-goal',
        onClick: handleOpenBulkEdit,
        disabled
      },
      {
        title: 'Copy DG-members to team',
        icon: 'icon-team-exchange-chat',
        disabled: disabled || multiple
      },
      {
        title: 'Desynchronize with DG',
        icon: 'icon-synchronize-arrows',
        disabled: disabled || multiple
      },
      {
        title: 'Delete team',
        icon: 'icon-bin-1',
        disabled
      }
    ]
  )
}

function ModalTrigger({ handleOpen }) {
  return (
    <ul className="buttons-with-icons-list ml-auto">
      <li className="p-0">
        <button type="button" className="d-flex align-items-center with-icon" onClick={handleOpen}>
          <span className="icon-add_1 mr-2" />
          <span data-title="Create new team">Create new team</span>
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
  const [openBulkEdit, setOpenBulkEdit] = useState(false)
  const teams = useSelector(state => state.accessRights[type])

  useEffect(() => {
    changeChecked([])
    if (type === 'oldTeams') {
      dispatch(getTeams(project_id))
    } else if (type === 'newTeams') {
      dispatch(getTeams(project_id, true))
    }
  }, [dispatch, project_id, type])

  useEffect(() => {
    if (checkedMembers < 1 || !openBulkEdit) return

    const documentRights = teams[0].document_rights
    const newRights = documentRights.map(r => ({ ...r, view_only: false, enabled: false }))
    dispatch(initialize('team_bulk_edit', { document_rights: newRights }))
  }, [dispatch, checkedMembers, teams, openBulkEdit])

  const toggleMembers = useCallback(value => {
    changeChecked(toggleArray(checkedMembers, value))
  }, [checkedMembers])

  const submitRow = useCallback(v => {
    dispatch(updateTeamRights(project_id, v))
  }, [dispatch, project_id])

  const handleOpenBulkEdit = useCallback(() => {
    setOpenBulkEdit(true)
  }, [])

  let optionsText = 'Options'

  if (checkedMembers.length) {
    optionsText += `: ${checkedMembers.length} members selected`
  }
  const bulkEditRights = (
    <BulkEditRights
      handleClose={() => setOpenBulkEdit(false)}
      members={checkedMembers}
    />
  )

  return (
    <React.Fragment>
      <div><label>Select Access rights for members</label></div>
      <div className="d-flex my-4">
        <DropDown
          btnName={optionsText}
          defaultValues={actions(checkedMembers.length, handleOpenBulkEdit)}
          className="d-flex align-self-center"
        />
        <ModalTrigger handleOpen={() => setOpenModal(true)} />
        <TeamForm open={openModal} setOpen={setOpenModal} />
      </div>
      <AccessTable
        rows={teams}
        type={type}
        submitRow={submitRow}
        toggleMembers={toggleMembers}
        checkedValues={checkedMembers}
      />
      <NewModal
        content={bulkEditRights}
        open={openBulkEdit}
        onClose={() => setOpenBulkEdit(false)}
      />
    </React.Fragment>
  )
}

export default TeamsTable
