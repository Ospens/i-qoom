import React, { useCallback } from 'react'
import { connect, useDispatch } from 'react-redux'
import { getFormValues, reduxForm } from 'redux-form'
import classnames from 'classnames'
import { useParams } from 'react-router-dom'
import UserAvatar from 'react-user-avatar'
import RightsDropDown from './RightsDropDown'
import { startUpdateAccessMembers } from '../../../../../actions/accessRightsActions'

function MemberRow({
  handleSubmit,
  member,
  type,
  checkedMembers,
  toggleMemeber,
  fields,
  pristine,
  reset
}) {
  const dispatch = useDispatch()
  const { project_id } = useParams()
  const submitMember = useCallback(values => {
    dispatch(startUpdateAccessMembers(project_id, values, type))
  }, [dispatch, project_id, type])

  if (!member) return <React.Fragment />

  return (
    <form onSubmit={handleSubmit(submitMember)} className={classnames({ 'row-changed': !pristine })}>
      <div className="table-row">
        <div className="table__row-cell table-checkbox">
          <div>
            <input
              type="checkbox"
              id={`userId${member.id}`}
              checked={checkedMembers.includes(member.id)}
              onChange={() => toggleMemeber(member.id)}
            />
            <label htmlFor={`userId${member.id}`} />
          </div>
        </div>
        <div className="name-column user-info-avatar table__row-cell">
          <div className="user-info-avatar">
            {member.team
              && (
                <div className="team-icon with-avatar">
                  <UserAvatar size="42" name="T" />
                  <span className="team-length">{member.team.members || 0}</span>
                </div>
              )}
            <UserAvatar size="42" name={`${member.first_name} ${member.last_name}`} />
          </div>
          <div className="user-and-company">
            <span className="user_names">{`${member.first_name} ${member.last_name}`}</span>
            <span className="text-secondary">Company</span>
          </div>
        </div>
        <div className="member-id table__row-cell">
          <span>{`${member.id} Member id`}</span>
        </div>
        <div className="table__row-cell access-rights-cell">
          <RightsDropDown
            values={fields.originating_company}
            memberId={member.id}
            rights={member.document_rights}
            columnTitle="Originating company"
          />
        </div>
        <div className="table__row-cell">
          <RightsDropDown
            values={fields.discipline}
            memberId={member.id}
            rights={member.document_rights}
            columnTitle="Discipline"
          />
        </div>
        <div className="table__row-cell">
          <RightsDropDown
            values={fields.document_type}
            memberId={member.id}
            rights={member.document_rights}
            columnTitle="Document type"
          />
        </div>
        <div>
          <span>{member.email}</span>
        </div>
      </div>
      {!pristine
      && (
        <div className="change-info">
          <span>You made changes to the access rights of this member. Do you want to apply?</span>
          <div className="ml-5">
            <button type="button" className="btn btn-white" onClick={reset}>Discard</button>
            <button type="submit" className="btn btn-purple ml-2">Apply changes</button>
          </div>
        </div>
      )}
    </form>
  )
}

const mapStateToProps = (state, ownProps) => ({
  member: getFormValues(`${ownProps.form}`)(state)
})

export default connect(mapStateToProps)(reduxForm({ enableReinitialize: true })(MemberRow))
