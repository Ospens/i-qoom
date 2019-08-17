import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getFormSubmitErrors, formValueSelector, isValid } from 'redux-form'
import AdministratorFields from '../../../elements/forms/AdministratorFields'

const renderSubmitButtons = (secondAdmin, props) => {
  const { closeModal, changeStep, isValid } = props

  return (
    <div className='modal-footer'>
      {!secondAdmin &&
        <button type='button' className='btn btn-back' onClick={() => changeStep(-1)}>
          <i className='svg-icon arrow-left-icon' />
          Back
        </button>}
      <button
        type='button'
        className='btn btn-white'
        onClick={closeModal}
      >
        Cancel
      </button>
      <button
        type='button'
        className='btn btn-purple'
        onClick={() => changeStep(1)}
        disabled={secondAdmin && !isValid}
      >
        {secondAdmin ? 'Next' : 'Skip'}
      </button>
    </div>
  )
}

const SecondAdmin = ({ submitErrors, fields, ...props }) => {
  const [secondAdmin, togglesecondAdmin] = useState(false)

  return (
    <div className='new-project-modal'>
      <h4>New project</h4>
      {secondAdmin &&
      <React.Fragment>
        <div className='modal-body'>
          <h6>Who is the new project administrator?</h6>
          <label className='project-admin'>Project second administrator</label>
          <AdministratorFields submitErrors={submitErrors} admin={'admins[1]'}/>
        </div>
      </React.Fragment>}
      {!secondAdmin &&
        <div className='modal-body'>
          <h6>Would you like to add a second administrator now?</h6>
          <button
            type='button'
            className='btn btn-purple wide-button'
            onClick={() => togglesecondAdmin(true)}
          >
            Add a second administrator
          </button>
        </div>}
      {renderSubmitButtons(secondAdmin, props)}
    </div>
  )
}

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('project_form')(state),
  isValid: isValid('project_form')(state)
})

export default connect(mapStateToProps)(SecondAdmin)

