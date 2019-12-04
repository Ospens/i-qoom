import React from 'react'
import { Field } from 'redux-form'
import DropDown from '../../../../../../elements/DropDown'
import CheckField from '../../../../../../elements/CheckField'

function DropDownRow({ index, valueTitle, id }) {
  return (
    <div className="access-rights__drop-down-row">
      <span>{valueTitle}</span>
      <Field
        component={CheckField}
        id={`document_rights[${index}].enabled${id}`}
        name={`document_rights[${index}].enabled`}
        className="form-group"
      />
      <Field
        component={CheckField}
        id={`document_rights[${index}].view_only${id}`}
        name={`document_rights[${index}].view_only`}
        className="form-group"
      />
    </div>
  )
}

function RightsDropDown({
  rowId, columnTitle, values, rights
}) {
  const allOptions = rights.filter(r => r.document_field_id === values.id) || []
  const activeOptions = allOptions.filter(o => o.enabled) || []
  const aoIds = activeOptions.map(o => o.document_field_value_id)
  const title = values.values.filter(v => aoIds.includes(v.id)).map(el => el.value)

  return (
    <DropDown
      className="dropdown-with-switch access-rights__drop-down"
      btnName={title.join(', ')}
      btnClass="btn btn-for-switch"
    >
      <div className="access-rights__drop-down-content">
        <div className="access-rights__drop-down-row">
          <label>{columnTitle}</label>
          {/* <div className='form-group'>
            <input
              onChange={e => checkAll('enabled', e.target.checked)}
              type='checkbox'
              component='input'
              className='form-control checkbox-input'
              id={`toggle-all-enabled${values.id}${formName}`}
            />
            <label htmlFor={`toggle-all-enabled${values.id}${formName}`} />
            <span className='grey'>Enabled</span>
          </div> */}
          <label>Enabled</label>
          <label>View only</label>
        </div>
        {values && values.values.map(({ value, id }) => {
          const currentRightIndex = rights
            .findIndex(r => r.document_field_id === values.id && r.document_field_value_id === id)
          if (currentRightIndex < 0) return <React.Fragment key={id} />

          return (
            <DropDownRow
              key={id}
              id={rowId}
              rowId={values.id}
              index={currentRightIndex}
              valueTitle={value}
            />
          )
        })}
      </div>
    </DropDown>
  )
}

export default RightsDropDown
