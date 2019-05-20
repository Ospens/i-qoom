import React from 'react'

function ModalComponent({ children }) {
  return (
    <div>
      <div
        className='modal fade show'
        id='exampleModalLong'
        tabIndex='-1'
        role='dialog'
        aria-modal='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            {children}
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show' />
    </div>
  )
}

export default ModalComponent
