import React from 'react'
import FieldForm from './FieldForm'

const originating_company = [
  {
    id: 1,
    value: 'QWE',
    title: 'Originating company'
  },
  {
    id: 2,
    value: 'ABC',
    title: 'Some text'
  },
]

const discipline = [
  {
    id: 1,
    value: 'RTY',
    title: 'Discipline'
  },
  {
    id: 2,
    value: 'FGH',
    title: 'Some discipline'
  },
]

const document_type = [
  {
    id: 1,
    value: 'VBN',
    title: 'Document type'
  },
]

function CodificationTable({}) {
  return (
    <div className='codification-codes-values-table'>
      <div className='codification-codes-values-column'>
        <FieldForm 
          form='originating_company'
          title='Originating company'
          initialValues={{originating_company}}
        />
      </div>

      <div className='codification-codes-values-column'>
        <FieldForm
          form='discipline' 
          title='Discipline'
          initialValues={{ discipline }}
        />
      </div>

      <div className='codification-codes-values-column'>
        <FieldForm 
          form='document_type' 
          title='Document type'
          initialValues={{ document_type }}
        />
      </div>
    </div>
  )
}

export default CodificationTable
