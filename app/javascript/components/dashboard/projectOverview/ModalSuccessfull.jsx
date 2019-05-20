import React from 'react'
import ModalComponent from '../../../elements/ModalComponent'

function ModalSuccessfull({ closeModal }) {
  return (
    <ModalComponent>
      <div className='modal-body terms-modal'>
        <h4>Well Done!</h4>
        <p>You have successfully created your first project.
        It is possible to make changes to your project data
        whetever you want, using the settings button.</p>
      </div>
      <div className='modal-footer'>
        <button type='button' className='btn btn-purple' onClick={closeModal}>Done</button>
      </div>
    </ModalComponent>
  )
}

export default ModalSuccessfull
