
import React from 'react'
import { toast } from 'react-toastify'

const Msg = ({ text, closeToast }) => (
  <div>
    {text}
    <div className='d-flex'>
      <button type='button' className='mt-2 ml-auto btn btn-white-blue' onClick={closeToast}>OK</button>
    </div>
  </div>
)

export const errorNotify = msg => {
  toast.error(msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  }
  )
}

export const successNotify =  msg => {
  toast.success(msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  }
  )
}

export const infoNotify = msg => {
  toast.info(msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  }
  )
}