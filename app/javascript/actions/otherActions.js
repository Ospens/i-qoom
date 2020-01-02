import axios from 'axios'
import { errorNotify } from './notificationsActions'

const sendEmail = (values, afterUpdate) => dispatch => {
  const request = { contact: { ...values } }

  return (
    axios.post('/api/v1/contacts', request)
      .then(() => afterUpdate())
      .catch(() => {
        dispatch(errorNotify('Problem'))
      })
  )
}

export default sendEmail
