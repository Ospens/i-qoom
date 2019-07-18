import React from 'react'
import { Modal } from 'semantic-ui-react'

const NewModal = ({ content, ...props}) => {

  // TODO: change new modal styles
  return (
    <Modal {...props} className='modal-window'>
      {content}
    </Modal>
  )
}

export default NewModal
