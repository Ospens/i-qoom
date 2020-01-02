import React from 'react'
import { useSelector } from 'react-redux'
import { formValueSelector } from 'redux-form'
import UsersTableByTabs, { submitButtonText } from '../../../../../../../elements/UsersTableByTabs'

const selector = formValueSelector('team_form')

function TeamMembers({
  handleClose, handleSubmit, onSubmit, handleBack
}) {
  const name = useSelector(state => selector(state, 'name'))
  const newMembers = useSelector(state => selector(state, 'added_users')) || []
  const removedUsers = useSelector(state => selector(state, 'removed_users')) || []
  const submitText = submitButtonText(newMembers, removedUsers)

  return (
    <React.Fragment>
      <div className="new-modal__header">
        <h4>{`Edit - ${name || 'Untitled'}`}</h4>
      </div>

      <div className="new-modal__body">
        <UsersTableByTabs
          firstTabLabel="Add members"
          secondTabLabel="Team members"
          selector={selector}
          teams
        />
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
