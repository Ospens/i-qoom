import axios from 'axios'
import { addNotification } from './notificationsActions'

const sendEmail = (values, afterUpdate) => dispatch => {
  const request = { contact: { ...values } }

  return (
    axios.post('/api/v1/contacts', request)
      .then(() => afterUpdate())
      .catch(() => {
        dispatch(addNotification({ title: 'Problem', text: 'Something went wrong!', type: 'error' }, true))
      })
  )
}

export default sendEmail
