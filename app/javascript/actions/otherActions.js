import axios from 'axios'
import { errorNotify } from '../elements/Notices'

export const sendEmail = (values, afterUpdate) => () => {
  const request = { contact: { ...values } }

  return (
    axios.post('/api/v1/contacts', request)
      .then(() => afterUpdate())
      .catch(() => {
        errorNotify('Something went wrong')
      })
  )
}
