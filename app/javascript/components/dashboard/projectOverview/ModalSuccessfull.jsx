import React from 'react'

function ModalSuccessfull({ closeModal }) {
  return (
    <div>
      <div className='modal-body terms-modal'>
        <h4>Well Done!</h4>
        <p>You have successfully created your first project.
        It is possible to make changes to your project data
        whetever you want, using the settings button.</p>
      </div>
      <div className='modal-footer'>
        <button type='button' className='btn btn-purple' onClick={closeModal}>Done</button>
      </div>
    </div>
  )
}

export default ModalSuccessfull
