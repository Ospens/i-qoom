import React from 'react'

function CreateProjectStepOne({toogleTerms}) {
  return (
    <div className='modal-body'>
      <p>Please read our <a href='#'>Terms and Conditions</a></p>
      <p>and check the box below</p>

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
  )
}

export default CreateProjectStepOne
