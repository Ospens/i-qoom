import React, { useState, useEffect } from 'react'
import NewModal from '../../../../../elements/Modal'

function Content({ close }) {
  return (
    <div className='new-modal selected-convention-warning'>
      <div className='new-modal__header'>
        <h6>
          <div>Well done! You selected "Convention 1".</div>
          <div>You have to add at least one position (code) to each codification field to be able to upload documents</div>
        </h6>
      </div>
      <div className='new-modal__body'>
        <div><span className='icon-d-print-warning2' /></div>
        <div>
          <div>Please do these task in order to use i-Qoom document managment.</div>
          <div>You can still change the project code later.</div>
        </div>
      </div>
      <div className='new-modal__footer'>
        <button
          onClick={close}
          className='btn btn-purple'
        >
          OK, I understand
        </button>
      </div>
    </div>
  )
}

function WellDone({ projectCode }) {
  const [open, toggleModal] = useState(false)
  useEffect(() => {
    if (projectCode === null) {
      toggleModal(true) 
    }
  }, [projectCode])

  return (
    <NewModal
      content={<Content close={() => toggleModal(!open)} />}
      open={open}
      onClose={() => toggleModal()}
    />
  )
}

export default WellDone
