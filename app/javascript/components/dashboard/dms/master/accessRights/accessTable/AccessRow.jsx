import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { getFormValues, reduxForm } from 'redux-form'
import classnames from 'classnames'
import UserAvatar from 'react-user-avatar'
import RightsDropDown from './RightsDropDown'
import ShowMembersPopup from '../ShowMembersPopup'
import TeamForm from '../team/teamForm/TeamForm'

function ModalTrigger({ handleOpen }) {
  return <button type="button" className="with-icon" onClick={handleOpen}><span>Add new members</span></button>
}

function TeamName({ values }) {
  const [openModal, setOpenModal] = useState(false)

  const handleOpen = useCallback(() => {
    setOpenModal(true)
  }, [])
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
          <TeamForm initStep={2} open={openModal} setOpen={setOpenModal} teamId={values.id} />
          <ModalTrigger handleOpen={handleOpen} />
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

function MemberName({ values }) {
  return (
    <div className="user-info-avatar">
      {values.team
      && (
        <div className="team-icon with-avatar">
          <UserAvatar size="42" name="T" />
          <span className="team-length">{values.team.members || 0}</span>
        </div>
      )}
      <UserAvatar size="42" name={`${values.first_name} ${values.last_name}`} />
      <div className="user-and-company">
        <span className="user_names">{`${values.name}`}</span>
        <span className="text-secondary">Company</span>
      </div>
    </div>
  )
}

function AccessRow({
  submitRow,
  columnsLength,
  isMember,
  form,
  handleSubmit,
  fields,
  pristine,
  reset
}) {
  const values = useSelector(state => getFormValues(`${form}`)(state))
  if (!values) return <React.Fragment />

  return (
    <React.Fragment>
      <tr className={classnames('Rtable-row non-stripped', { 'row-changed': !pristine })}>
        <td className="Rtable__row-cell" />
        <td className="Rtable__row-cell table-checkbox">
          <input
            type="checkbox"
            id={values.id}
            // checked={checkedValues.includes(values.id)}
            // onChange={() => toggleValues(values.id)}
          />
          <label htmlFor={values.id} />
        </td>
        <td className="Rtable__row-cell name-column team-info-cell">
          {isMember ? <MemberName values={values} /> : <TeamName values={values} />}
        </td>
        <td className="member-id Rtable__row-cell">
          <span>{`${values.id} Member id`}</span>
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
        <td className="Rtable__row-cell" />
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
          <tr />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default reduxForm({ enableReinitialize: true })(AccessRow)
