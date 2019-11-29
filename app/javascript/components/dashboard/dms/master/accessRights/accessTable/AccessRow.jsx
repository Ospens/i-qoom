import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { getFormValues, reduxForm } from 'redux-form'
import classnames from 'classnames'
import UserAvatar from 'react-user-avatar'
import RightsDropDown from './RightsDropDown'
import ShowMembersPopup from '../ShowMembersPopup'
import TeamForm from '../team/teamForm/TeamForm'
import DropDown from '../../../../../../elements/DropDown'

const actions = (edit, copyDGToTeam, desyncDG, deleteMember) => (
  [
    {
      title: 'Edit team',
      icon: 'icon-business-team-goal',
      onClick: edit
    },
    {
      title: 'Copy DG-members to team',
      icon: 'icon-team-exchange-chat',
      onClick: copyDGToTeam
    },
    {
      title: 'Desynchronize with DG',
      icon: 'icon-synchronize-arrows',
      onClick: desyncDG
    },
    {
      title: 'Delete team',
      icon: 'icon-bin-1',
      onClick: deleteMember
    }
  ]
)

function TeamName({ values, handleOpen }) {
  return (
    <div className="user-info-avatar">
      <div className="user-info-avatar">
        <div className="team-icon">
          <UserAvatar size="42" name="T" />
        </div>
      </div>
      <div className="user-and-company">
        <span className="user_names">
          {values.name || 'Team without name'}
        </span>
        <div className="d-flex">
          <button type="button" className="with-icon" onClick={handleOpen}>
            <span>Add new members</span>
          </button>
          {values.users
          && values.users.length > 0
          && (
            <ShowMembersPopup
              teamId={values.id}
              users={values.users}
              handleOpen={handleOpen}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function AccessRow({
  toggleMembers,
  checkedValues,
  submitRow,
  columnsLength,
  form,
  handleSubmit,
  fields,
  pristine,
  reset
}) {
  const [openModal, setOpenModal] = useState(false)
  const [initStep, setInitStep] = useState(1)
  const handleOpen = useCallback(step => {
    setInitStep(step)
    setOpenModal(true)
  }, [])

  const deleteTeam = useCallback(() => {
    alert('No action for delete')
  }, [])

  const copyDGToTeam = useCallback(() => {
    alert("DG isn't realized")
  }, [])

  const desyncDG = useCallback(() => {
    alert("DG isn't realized")
  }, [])
  const values = useSelector(state => getFormValues(`${form}`)(state))
  if (!values) return <React.Fragment />
  const checked = checkedValues.includes(values.id)
  return (
    <React.Fragment>
      <tr className={classnames('Rtable-row', { 'row-changed': !pristine }, { 'Rtable-row__checked': checked })}>
        <td className="Rtable__row-cell">
          <DropDown
            dots
            className="dropdown-with-icon"
            defaultValues={actions(() => handleOpen(1), copyDGToTeam, desyncDG, deleteTeam)}
          />
        </td>
        <td className="Rtable__row-cell table-checkbox">
          <input
            type="checkbox"
            id={`accessRow${values.id}`}
            checked={checked}
            onChange={() => toggleMembers(values.id)}
          />
          <label htmlFor={`accessRow${values.id}`} />
        </td>
        <td className="Rtable__row-cell name-column team-info-cell">
          <TeamForm
            initStep={initStep}
            open={openModal}
            setOpen={setOpenModal}
            teamId={values.id}
          />
          <TeamName values={values} handleOpen={() => handleOpen(2)} />
        </td>
        <td className="Rtable__row-cell">
          <RightsDropDown
            values={fields.originating_company}
            rowId={values.id}
            rights={values.document_rights}
            columnTitle="Originating company"
          />
        </td>
        <td className="Rtable__row-cell">
          <RightsDropDown
            values={fields.discipline}
            rowId={values.id}
            rights={values.document_rights}
            columnTitle="Discipline"
          />
        </td>
        <td className="Rtable__row-cell">
          <RightsDropDown
            values={fields.document_type}
            rowId={values.id}
            rights={values.document_rights}
            columnTitle="Document type"
          />
        </td>
        <td className="Rtable__row-cell">
          <div className="lightgrey">
            Undefined
          </div>
        </td>
      </tr>
      {!pristine
      && (
        <React.Fragment>
          <tr className="Rtable-row">
            <td className="Rtable__row-cell" />
            <td className="Rtable__row-cell" colSpan={columnsLength}>
              <form onSubmit={handleSubmit(submitRow)} className="d-flex align-items-center">
                <span>
                  You made changes to the access rights of this member. Do you want to apply?
                </span>
                <div className="ml-5">
                  <button type="button" className="btn btn-white" onClick={reset}>Discard</button>
                  <button type="submit" className="btn btn-purple ml-2">Apply changes</button>
                </div>
              </form>
            </td>
          </tr>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default reduxForm()(AccessRow)
