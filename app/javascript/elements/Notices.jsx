
import { toast } from 'react-toastify'

export const errorNotify = (msg) => {
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