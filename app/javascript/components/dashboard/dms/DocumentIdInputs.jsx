import React from 'react'
import { useSelector } from 'react-redux'

function DocumentIdInputs({
  origCompanyValue,
  disciplineValue,
  docTypeValue,
  docNumberValue
}) {
  const projectCode = useSelector(state => state.projects.current.project_code)
  return (
    <div className='form-group'>
      <div className='form-group__title'>
      <label>Pleace select or generate Document ID</label>
        </div>
      <div className='input-container'>
        <div className='document-id-code'>
          <input
            className='form-control'
            type='text'
            id='document_id_name'
            value={projectCode || 'MWP'}
            disabled
          />
        </div>
        <div className='document-id-code'>
          <input
            className='form-control'
            type='text'
            id='document_id_orig_company'
            placeholder='XXX'
            value={origCompanyValue || ''}
            disabled
          />
        </div>
        <div className='document-id-code'>
          <input
            className='form-control'
            type='text'
            id='document_id_discipline'
            placeholder='XXX'
            value={disciplineValue || ''}
            disabled
          />
        </div>
        <div className='document-id-code'>
          <input
            className='form-control'
            type='text'
            id='document_id_doc_type'
            placeholder='XXX'
            value={docTypeValue || ''}
            disabled
          />
        </div>
        <div className='document-id-code'>
          <input
            className='form-control'
            type='text'
            id='document_id_doc_number'
            placeholder='XXX'
            value={docNumberValue || ''}
            disabled
          />
        </div>
      </div>
    </div>
  )
}

export default DocumentIdInputs
