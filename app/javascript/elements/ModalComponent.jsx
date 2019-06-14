import React from 'react'

// TODO: Change this component to Modal everywhere

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
        <div className='modal-window' role='document'>
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
