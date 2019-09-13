import React, { useState, useEffect } from 'react'
import AdministratorFields from '../../../elements/forms/AdministratorFields'

function renderSubmitButtons(secondAdmin, { closeModal, backStep }) {
  return (
    <div className='new-modal__footer'>
      <button type='button' className='btn btn-back' onClick={() => backStep('admins[2]')}>
        <i className='svg-icon arrow-left-icon' />
        Back
      </button>
      <button
        type='button'
        className='btn btn-white'
        onClick={closeModal}
      >
        Cancel
      </button>
      <button type='submit' className='btn btn-purple'>
        {secondAdmin ? 'Next' : 'Skip'}
      </button>
    </div>
  )
}

function SecondAdmin({ adminsLength, ...props }) {
  const [secondAdmin, togglesecondAdmin] = useState(false)
  useEffect(() => { if (adminsLength > 2) { togglesecondAdmin(true) } }, [adminsLength])

  return (
    <React.Fragment>
      <div className='new-modal__body'>
        {secondAdmin
          ? <React.Fragment>
              <h6 className='new-modal__body-title'>Who is the new project administrator?</h6>
              <label className='project-admin'>Project second administrator</label>
            <AdministratorFields admin='admins[2]' submitErrors={props.submitErrors} />
            </React.Fragment>
          : <React.Fragment>
              <h6 className='new-modal__body-title'>
                Would you like to add another administrator now?
              </h6>
              <button
                type='button'
                className='btn btn-purple wide-button'
                onClick={() => togglesecondAdmin(true)}
              >
                Add a second administrator
              </button>
            </React.Fragment>
          }
      </div>
      {renderSubmitButtons(secondAdmin, props)}
    </React.Fragment>
  )
}

export default SecondAdmin
