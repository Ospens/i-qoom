import React from 'react'
import NewModal from '../../../../../elements/Modal'
import CreateFieldForm from './CreateFieldForm'

const modalContent = (handleClose, initialValues) => (
  <CreateFieldForm initialValues={initialValues} handleClose={handleClose} />
)
// const title = useSelector(state => selector(state, 'title'))
/* if (limitAccess) {
    return (
      <ModalLimitAccess
        handleBack={() => this.setState({ limitAccess: false })}
        handleClose={handleClose}
        title={title}
      />
    )
  } */

function ModalCreateField({ modalOpen, handleClose, initialValues }) {
  return (
    <NewModal
      content={modalContent(handleClose, initialValues)}
      open={modalOpen}
      onClose={handleClose}
      className="modal-create-field"
      closeOnDimmerClick={false}
    />
  )
}

export default ModalCreateField
