import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { reduxForm } from 'redux-form'
import { starUpdateAdmin } from '../../../../actions/projectActions'
import AdministratorFields from '../../../../elements/forms/AdministratorFields'

function AdminModalContent({ handleSubmit, close, projectId }) {
  const dispatch = useDispatch()

  const updateAdmin = useCallback(values =>
    dispatch(starUpdateAdmin(projectId, values)).then(close)
    [dispatch])

  return (
    <form noValidate={true} className='new-modal' onSubmit={handleSubmit(updateAdmin)}>
      <div className='new-modal__header'><h4>New project administrator</h4></div>
      <div className='new-modal__body'>
        <div>
          <h6 className='new-modal__body-title'>Who is the new project administrator?</h6>
          <label className='project-admin'>Another project administrator</label>
          <AdministratorFields />
        </div>
      </div>
      {<div className='new-modal__footer'>
        <button
          type='button'
          className='btn btn-white'
          onClick={close}
        >
          Cancel
        </button>
        <button
          type='submit'
          className='btn btn-purple'
        >
          Invite
        </button>
      </div>}
    </form>
  )
}

export default reduxForm()(AdminModalContent)
