import React from 'react'
import FieldForm from './FieldForm'

function CodificationTable({}) {
  return (
    <div className='codification-codes-values-table'>
      <div className='codification-codes-values-column'>
        <FieldForm type='originating_company' title='Originating company'/>
      </div>

      <div className='codification-codes-values-column'>
        <FieldForm type='discipline' title='Discipline' />
      </div>

      <div className='codification-codes-values-column'>
        <FieldForm type='document_type' title='Document type' />
      </div>
    </div>
  )
}

export default CodificationTable
