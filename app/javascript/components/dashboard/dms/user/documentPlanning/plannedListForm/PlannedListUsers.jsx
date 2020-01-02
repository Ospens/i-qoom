import React from 'react'
import { useSelector } from 'react-redux'
import { formValueSelector } from 'redux-form'
import UsersTableByTabs, { submitButtonText } from '../../../../../../elements/UsersTableByTabs'

const selector = formValueSelector('planned_list_form')

function PlannedListUsers({
  handleClose, handleSubmit, onSubmit, handleBack
}) {
  const newMembers = useSelector(state => selector(state, 'added_users')) || []
  const removedUsers = useSelector(state => selector(state, 'removed_users')) || []
  const submitText = submitButtonText(newMembers, removedUsers)

  return (
    <React.Fragment>
      <div className="new-modal__header">
        <h4>Apply members to planned list</h4>
      </div>

      <div className="new-modal__body">
        <UsersTableByTabs
          firstTabLabel="Add members"
          secondTabLabel="Applied to planned list"
          selector={selector}
        />
      </div>

      <div className="new-modal__footer">
        <button
          type="button"
          className="btn btn-white"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-white ml-2"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-purple"
        >
          {submitText ? `${submitText}` : 'Create planned list'}
        </button>
      </div>

    </React.Fragment>
  )
}

export default PlannedListUsers
