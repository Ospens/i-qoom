import React from 'react'
import AdministratorFields from '../../../elements/forms/AdministratorFields'

const FirstAdmin = ({ closeModal }) => {

  return (
    <React.Fragment>
      <div className='new-modal__body'>
        <h6 className='new-modal__body-title'>Who is the project administrator?</h6>
        <label className='project-admin'>Project administrator</label>
        <AdministratorFields admin='admins[1]' />
      </div>
      <div className='new-modal__footer'>
        <button type='button' className='btn btn-white' onClick={closeModal}>Cancel</button>
        <button type='submit' className='btn btn-purple'>Next</button>
      </div>
    </React.Fragment>
  )
}

export default FirstAdmin
