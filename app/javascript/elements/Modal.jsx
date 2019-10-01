import React from 'react'
import classnames from 'classnames'
import { Modal } from 'semantic-ui-react'

const NewModal = ({ content, className, ...props}) => {

  // TODO: change new modal styles
  return (
    <Modal {...props} className={classnames('modal-window', { className })}>
      {content}
    </Modal>
  )
}

export default NewModal
