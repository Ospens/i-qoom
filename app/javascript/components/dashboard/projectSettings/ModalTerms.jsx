import React from 'react'
import ModalComponent from '../../../elements/ModalComponent'

function ModalExcellent({ closeModal, termsAccepted, nextStep}) {
  return (
    <ModalComponent>
      <div>
        <div className='modal-body terms-modal'>
          <h4>Excellent!</h4>
          <p>An email has benn sent to the second project</p>
          <p>administrator. Please note that the email address</p>
          <p>must be confirmed, before the status of the</p>
          <p>new administrator is set to "active"</p>
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn btn-white' onClick={closeModal}>Cancel</button>
          <button type='button' className='btn btn-purple' disabled={!termsAccepted} onClick={nextStep}>Next</button>
        </div>
      </div>
    </ModalComponent>
  )
}

export default ModalExcellent
