import React from 'react'

function ModalTerms({ toogleTerms, closeModal, termsAccepted, nextStep}) {
  return (
    <div>
      <div className='modal-body terms-modal'>
        <h6>Please read our <a href='#'>Terms and Conditions</a></h6>
        <h6>and check the box below</h6>

        <div className='checkbox-terms'>
          <input
            type='checkbox'
            id='terms'
            onClick={toogleTerms}
          />
          <label htmlFor='terms'></label>
          <span>I have read and agree to the Terms</span>
        </div>
      </div>
      <div className='modal-footer'>
        <button type='button' className='btn btn-white' onClick={closeModal}>Cancel</button>
        <button type='button' className='btn btn-purple' disabled={!termsAccepted} onClick={nextStep}>Next</button>
      </div>
    </div>
  )
}

export default ModalTerms
