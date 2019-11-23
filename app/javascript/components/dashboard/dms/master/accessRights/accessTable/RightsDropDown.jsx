import React, { useCallback } from 'react'
import { Field, formValueSelector, change } from 'redux-form'
import { useSelector, useDispatch } from 'react-redux'
import DropDown from '../../../../../../elements/DropDown'
import CheckField from '../../../../../../elements/CheckField'

function DropDownRow({ index, valueTitle, id }) {
  return (
    <div className='acceess-rights__drop-down-row'>
      <span>{valueTitle}</span>
      <Field
        component={CheckField}
        id={`document_rights[${index}].enabled${id}`}
        name={`document_rights[${index}].enabled`}
        className='form-group'
      />
      <Field
        component={CheckField}
        id={`document_rights[${index}].view_only${id}`}
        name={`document_rights[${index}].view_only`}
        className='form-group'
      />
    </div>
  )
}

function RightsDropDown({ id, columnTitle, values, rights, formName }) {
  const dispatch = useDispatch()
  const allOptions = rights.filter(r => r.document_field_id === values.id) || []
  const activeOption = allOptions.filter(o => o.enabled) || []
  const title = values.values.filter(v => activeOption.map(ao => ao.document_field_value_id).includes(v.id)).map(el => el.value)

  const checkAll = useCallback((type, val) => {
    /* rights.map(f => f.document_field_id === values.id ? f[type] = val : f)
    dispatch(change(formName, 'document_rights', rights z))
    console.log(rights) */
  }, [dispatch, rights, formName])

  return (
    <DropDown
      className='dropdown-with-switch acceess-rights__drop-down'
      btnName={title.join(', ')}
      btnClass='btn btn-for-switch'
    >
      <div className='acceess-rights__drop-down-content'>
        <div className='acceess-rights__drop-down-row'>
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
        {values &&
        values.values.map(({ value, id }, index) => {
          const currentRightIndex = rights.findIndex(r => r.document_field_id === values.id && r.document_field_value_id === id)
          if (currentRightIndex < 0) return

          return (
            <DropDownRow
              key={index}
              id={id}
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
