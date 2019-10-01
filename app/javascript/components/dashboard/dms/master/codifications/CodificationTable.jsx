import React from 'react'
import FieldForm from './FieldForm'
import { useSelector } from 'react-redux'

function CodificationTable({}) {
  const document_fields = useSelector(state => state.conventions.current.document_fields)

  const document_type = document_fields.find(el => el.codification_kind === 'document_type')
  const discipline = document_fields.find(el => el.codification_kind === 'discipline')
  const originating_company = document_fields.find(el => el.codification_kind === 'originating_company')

  if (!document_type || !discipline || !originating_company) return <div />

  return (
    <div className='codification-codes-values-table'>
      <div className='codification-codes-values-column'>
        <FieldForm 
          form='originating_company'
          title='Originating company'
          initialValues={{ originating_company: originating_company ? originating_company.document_field_values : [] }}
        />
      </div>

      <div className='codification-codes-values-column'>
        <FieldForm
          form='discipline' 
          title='Discipline'
          initialValues={{ discipline: discipline ? discipline.document_field_values : [] }}
        />
      </div>

      <div className='codification-codes-values-column'>
        <FieldForm 
          form='document_type' 
          title='Document type'
          initialValues={{ document_type: document_type ? document_type.document_field_values : [] }}
        />
      </div>
    </div>
  )
}

export default CodificationTable
