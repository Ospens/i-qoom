import React from 'react'

function ModalInfo({ closeModal, title, body, buttonText }) {
  return (
    <div>
      <div
        className={'modal fade show'}
        id='exampleModalLong'
        tabIndex='-1'
        role='dialog'
        aria-modal='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div>
              <div className='modal-body terms-modal'>
                <h4>{title}</h4>
                {body}
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-purple' onClick={closeModal}>{buttonText}</button>
              </div>
              <div className='modal-backdrop fade show'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalInfo
