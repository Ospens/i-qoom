import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { formValueSelector, FieldArray } from 'redux-form'
import UsersTable from '../UsersTable'
import { dmsUsers } from '../../../../../../../actions/projectActions'
import Tabs from '../../../../../../../elements/Tabs'

const selector = formValueSelector('team_form')

function TeamMembers({
  handleClose, handleSubmit, onSubmit, handleBack
}) {
  const dispatch = useDispatch()
  const [freeUsers, setFreeUsers] = useState([])
  const { projectId } = useParams()
  const name = useSelector(state => selector(state, 'name'))
  const teamMembers = useSelector(state => selector(state, 'users')) || []
  const newMembers = useSelector(state => selector(state, 'added_users')) || []
  const removedUsers = useSelector(state => selector(state, 'removed_users')) || []
  const allUsers = useSelector(state => state.documents.users)
  useEffect(() => {
    const teamMembersIds = teamMembers.map(u => u.id)
    const fu = allUsers.filter(({ id }) => !teamMembersIds.includes(id))
    setFreeUsers(fu)
  }, [allUsers])
  useEffect(() => {
    dispatch(dmsUsers(projectId, true))
  }, [dispatch, projectId])

  let submitText
  if (newMembers.length && removedUsers.length) {
    submitText = `Add ${newMembers.length} member${newMembers.length > 1 ? 's' : ''} and
    remove ${removedUsers.length} member${removedUsers.length > 1 ? 's' : ''}`
  } else if (newMembers.length) {
    submitText = `Add ${newMembers.length} member${newMembers.length > 1 ? 's' : ''}`
  } else if (removedUsers.length) {
    submitText = `Remove ${removedUsers.length} member${removedUsers.length > 1 ? 's' : ''}`
  }

  return (
    <React.Fragment>
      <div className="new-modal__header">
        <h4>{`Edit - ${name || 'Untitled'}`}</h4>
      </div>

      <div className="new-modal__body">
        <Tabs>
          <div label="Add members">
            <FieldArray
              name="added_users"
              component={UsersTable}
              users={freeUsers}
            />
          </div>
          <div label="Team members">
            <FieldArray
              name="removed_users"
              component={UsersTable}
              users={teamMembers}
            />
          </div>
        </Tabs>
      </div>

      <div className="new-modal__footer">
        <button
          type="button"
          className="btn btn-white mr-auto"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-white mx-auto"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-purple mx-auto"
          onClick={handleSubmit(values => onSubmit({ ...values, skipAccess: true }))}
        >
          {submitText ? `${submitText}` : 'Update with current members'}
        </button>
        <button
          type="submit"
          className="btn btn-purple ml-auto"
        >
          {submitText ? `${submitText} & define rights` : 'Define access rights'}
        </button>
      </div>

    </React.Fragment>
  )
}

export default TeamMembers
