import React, { useEffect } from 'react'
import FieldForm from './FieldForm'
import { useSelector } from 'react-redux'

function CodificationTable({ viewOnly = false }) {
  const document_fields = useSelector(state => state.conventions.current.document_fields)

  const document_type = document_fields.find(el => el.codification_kind === 'document_type')
  const discipline = document_fields.find(el => el.codification_kind === 'discipline')
  const originating_company = document_fields.find(el => el.codification_kind === 'originating_company')

  useEffect(() => {
    if (document_type && discipline && originating_company) {
      if (originating_company.document_field_values.length < 2) {
        originating_company.document_field_values.push({ position: originating_company.document_field_values.length + 1 })
      }
      if (discipline.document_field_values.length < 2) {
        discipline.document_field_values.push({ position: discipline.document_field_values.length + 1  })
      }
      if (document_type.document_field_values.length < 2) {
        document_type.document_field_values.push({ position: document_type.document_field_values.length + 1  })
      }
    }
  }, [document_type, discipline, originating_company])

  if (!document_type || !discipline || !originating_company) return <div />

  return (
    <div className='codification-codes-values-table px-3'>
      <div className='codification-codes-values-column'>
        <FieldForm 
          form='originating_company'
          title='Originating company'
          viewOnly={viewOnly}
          initialValues={{ originating_company: originating_company ? originating_company.document_field_values : [] }}
        />
      </div>

      <div className='codification-codes-values-column'>
        <FieldForm
          form='discipline' 
          title='Discipline'
          initialValues={{ discipline: discipline ? discipline.document_field_values : [] }}
          viewOnly={viewOnly}
        />
      </div>

      <div className='codification-codes-values-column'>
        <FieldForm 
          form='document_type' 
          title='Document type'
          initialValues={{ document_type: document_type ? document_type.document_field_values : [] }}
          viewOnly={viewOnly}
        />
      </div>
    </div>
  )
}

export default CodificationTable
