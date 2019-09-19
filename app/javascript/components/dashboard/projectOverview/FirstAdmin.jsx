import React from 'react'
import AdministratorFields from '../../../elements/forms/AdministratorFields'

const FirstAdmin = ({ submitErrors, closeModal, nextStep }) => {

  return (
    <React.Fragment>
      <div className='new-modal__body'>
        <h3>You will be the first project administrator. Please enter your details.</h3>
        <h6 className='new-modal__body-title mt-4'>After creating the first project, you can change the administrator whenever you like.</h6>
        <label className='project-admin'>Project administrator</label>
        <AdministratorFields admin='admins[0]' submitErrors={submitErrors} disabled />
      </div>
      <div className='new-modal__footer'>
        <button type='button' className='btn btn-white' onClick={closeModal}>Cancel</button>
        <button type='button' className='btn btn-purple' onClick={nextStep}>Next</button>
      </div>
    </React.Fragment>
  )
}

export default FirstAdmin
