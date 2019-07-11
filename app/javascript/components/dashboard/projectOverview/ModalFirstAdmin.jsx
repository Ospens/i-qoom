import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFormSubmitErrors, formValueSelector } from 'redux-form'
import AdministratorFields from '../../../elements/forms/AdministratorFields'

const renderSubmitButtons = ({
  closeModal,
  nextStep,
  username,
  last_name,
  first_name,
  email
}) => {
  const hasEmptyFields = !username || !last_name || !first_name || !email
  return (
    <div className='modal-footer'>
      <button type='button' className='btn btn-white' onClick={closeModal}>Cancel</button>
      <button
        type='button'
        className='btn btn-purple'
        disabled={hasEmptyFields}
        onClick={nextStep}
      >
        Next
      </button>
    </div>
  )
}

const ModalFirstAdmin = ({ submitErrors, fields, ...props }) => {
  if (fields.length < 1) fields.push({})

  return (
    <div className='new-project-modal'>
      <h4>New project</h4>
      <div className='modal-body'>
        <h6>Who is the project administrator?</h6>
        <label className='project-admin'>Project administrator</label>
        <AdministratorFields submitErrors={submitErrors} admin={'admins[0]'} />
      </div>
      {renderSubmitButtons(props)}
    </div>
  )
}

const selector = formValueSelector('project_form')

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('project_form')(state),
  username: selector(state, 'admins[0].username'),
  last_name: selector(state, 'admins[0].last_name'),
  first_name: selector(state, 'admins[0].first_name'),
  email: selector(state, 'admins[0].email')
})

export default connect(mapStateToProps)(ModalFirstAdmin)

