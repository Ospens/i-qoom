import React, { useState } from 'react'
import NewModal from '../../../../elements/Modal'
import AdminModalContent from './AdminModalContent'

function NewAdmin({ projectId, index, form, updateAdmin }) {
  const [modal, toggleModal] = useState(false)

  return (
    <React.Fragment>
      <div className='block-title'>
        <span>{`Project administrator ${index}`}</span>
      </div>
      <button
        type='button'
        className='btn btn-purple full-wide second-admin'
        onClick={() => toggleModal(true)}
      >
        Add project administrator
      </button>
      <NewModal
        content={
          <AdminModalContent
            close={() => toggleModal(false)}
            form={form}
            submit={updateAdmin}
            projectId={projectId}
          />
        }
        open={modal}
        onClose={() => toggleModal(false)}
      />
    </React.Fragment>
  )
}

export default NewAdmin
