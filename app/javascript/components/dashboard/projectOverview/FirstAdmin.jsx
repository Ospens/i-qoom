import React from 'react'
import AdministratorFields from '../../../elements/forms/AdministratorFields'

const FirstAdmin = ({ submitErrors, closeModal, projectId }) => {

  return (
    <React.Fragment>
      <div className='new-modal__body'>
        <h6 className='new-modal__body-title'>Who is the project administrator?</h6>
        <label className='project-admin'>Project administrator</label>
        <AdministratorFields admin={`admins[${projectId ? '1' : '0'}]`} submitErrors={submitErrors}/>
      </div>
      <div className='new-modal__footer'>
        <button type='button' className='btn btn-white' onClick={closeModal}>Cancel</button>
        <button type='submit' className='btn btn-purple'>Next</button>
      </div>
    </React.Fragment>
  )
}

export default FirstAdmin
