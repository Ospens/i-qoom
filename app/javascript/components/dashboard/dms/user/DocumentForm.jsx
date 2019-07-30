
import React from 'react'
import DocumentsAndFiles from './DocumentsAndFiles'
import AccessAndCommunication from './AccessAndCommunication'

function DocumentForm({ handleSubmit, step, toggleStep }) {

  return (
    <form className='dms-content bordered' onSubmit={handleSubmit}>
      {step === 1
        ? <DocumentsAndFiles />
        : <AccessAndCommunication backStep={() => toggleStep(1)} />
      }
    </form>
  )
}

export default DocumentForm