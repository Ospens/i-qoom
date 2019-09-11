import React from 'react'
import { Field } from 'redux-form'
import DropDown from '../../../../../elements/DropDown'
import CheckField from '../../../../../elements/CheckField'


function DropDownRow({ index, valueTitle, memberId }) {
  return (
    <div className='acceess-rights__drop-down-row'>
      <div className='col-4'>
        <span>{valueTitle}</span>
      </div>
      <div className='col-4'>
        <Field
          component={CheckField}
          id={`document_rights[${index}].enabled${memberId}`}
          name={`document_rights[${index}].enabled`}
          className='form-group'
        />
      </div>
      <div className='col-4'>
        <Field
          component={CheckField}
          id={`document_rights[${index}].view_only${memberId}`}
          name={`document_rights[${index}].view_only`}
          className='form-group'
        />
      </div>
    </div>
  )
}

function RightsDropDown({ memberId, columnTitle, values, rights }) {
  const allOptions = rights.filter(r => r.document_field_id === values.id) || []
  const activeOption = allOptions.filter(o => o.enabled) || []
  const title = values.values.filter(v => activeOption.map(ao => ao.document_field_value_id).includes(v.id)).map(el => el.value)

  return (
    <DropDown
      className='dropdown-with-switch'
      btnName={title.join(', ')}
      btnClass='btn btn-for-switch'
    >
      <div className='acceess-rights__drop-down'>
        <div className='acceess-rights__drop-down-row'>
          <div className='col-4'>
            <label>{columnTitle}</label>
          </div>
          <div className='col-4'>
            <label>Enabled</label>
          </div>
          <div className='col-4'>
            <label>View only</label>
          </div>
        </div>
        {values &&
        values.values.map(({ value, id }, index) => {
          const currentRightIndex = rights.findIndex(r => r.document_field_id === values.id && r.document_field_value_id === id)
          if (currentRightIndex < 0) return

          return (
            <DropDownRow
              key={index}
              memberId={memberId}
              rowId={values.id}
              index={currentRightIndex}
              valueTitle={value}
            />
        )})}
      </div>
    </DropDown>
  )
}

export default RightsDropDown
