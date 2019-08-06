
import { toast } from 'react-toastify'

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

export const successNotify = msg => {
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