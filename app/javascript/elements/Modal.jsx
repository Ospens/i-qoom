import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'

class NewModal extends Component {
  render() {
    const { content, trigger, modalOpen, handleClose } = this.props

    // TODO: change new modal styles
    return (
      <Modal
        trigger={trigger}
        open={modalOpen}
        onClose={handleClose}
        className='modal-window'
      >
        {content}
      </Modal>
    )
  }
}
export default NewModal