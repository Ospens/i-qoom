import React from 'react'
import { Link } from 'react-router-dom'

const ModalTerms = ({ toogleTerms, closeModal, termsAccepted, nextStep}) => {
  return (
    <div>
      <div className='modal-body terms-modal'>
        <h5 className='text-center'>
          Please read our <Link to='/terms' target='_blank'>Terms and Conditions</Link> and check the box below
        </h5>

        <div className='checkbox-terms rect-checkbox'>
          <input
            type='checkbox'
            id='terms'
            onClick={toogleTerms}
          />
          <label htmlFor='terms' className='mr-2'/>
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
