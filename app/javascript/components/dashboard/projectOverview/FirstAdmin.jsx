import React from 'react'
import { connect } from 'react-redux'
import { getFormSubmitErrors, isValid } from 'redux-form'
import AdministratorFields from '../../../elements/forms/AdministratorFields'

const renderSubmitButtons = ({ closeModal, nextStep, isValid }) => {
  return (
    <div className='modal-footer'>
      <button type='button' className='btn btn-white' onClick={closeModal}>Cancel</button>
      <button
        type='button'
        className='btn btn-purple'
        onClick={nextStep}
        disabled={!isValid}
      >
        Next
      </button>
    </div>
  )
}

const FirstAdmin = ({ submitErrors, ...props }) => {

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

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('project_form')(state),
  isValid: isValid('project_form')(state),
})

export default connect(mapStateToProps)(FirstAdmin)

