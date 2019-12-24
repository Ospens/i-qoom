import React, { Fragment, useCallback } from 'react'
import { change, Field } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import SelectField from '../../../../../../elements/SelectField'
import { required } from '../../../../../../elements/validations'
import InputField from '../../../../../../elements/InputField'

function DocumentTableBody({ fields }) {
  const dispatch = useDispatch()
  const documentFields = useSelector(state => state.conventions.current.document_fields)
  const documentTypeIndex = documentFields.findIndex(el => el.codification_kind === 'document_type')
  const disciplineIndex = documentFields.findIndex(el => el.codification_kind === 'discipline')
  const companyIndex = documentFields
    .findIndex(el => el.codification_kind === 'originating_company')
  const docNumberIndex = documentFields
    .findIndex(el => el.codification_kind === 'document_number')
  const informationIndex = documentFields
    .findIndex(el => el.codification_kind === 'additional_information')
  const emptyDoc = useSelector(state => state.plannedLists.edit.new)
  // Select options haven't ids

  const changeValues = useCallback((value, document, fieldIndex) => {
    const newValues = documentFields[fieldIndex].document_field_values.map(field => {
      const selected = field.value === value
      return {
        ...field,
        selected
      }
    })
    dispatch(change('dms_planned_list',
      `${document}.document_fields[${fieldIndex}].document_field_values`,
      newValues))
  }, [dispatch, documentFields])

  if (documentTypeIndex < 0 || disciplineIndex < 0 || companyIndex < 0) return <Fragment />

  const moreThanTwo = fields.length > 1
  return (
    <div className="Rtable__body">
      {fields.map((field, i) => (
        <div
          key={field}
          className={classnames('Rtable-row')}
        >
          <div className="Rtable__row-cell">
            {`${i + 1}.`}
          </div>
          <div className="Rtable__row-cell">
            <button
              type="button"
              onClick={() => fields.remove(i)}
              className={classnames({ 'd-invisible': !moreThanTwo })}
            >
              <span className="icon-bin-1" />
            </button>
          </div>
          <div className="Rtable__row-cell table-checkbox">
            <input
              type="checkbox"
              id={field}
            />
            <label htmlFor={field} />
          </div>

          <div className="Rtable__row-cell">
            <Field
              component={InputField}
              className="form-group project-code"
              name={`${field}.project_code`}
              id={`${field}.project_code`}
              placeholder="MWP"
              disabled
            />
          </div>

          <div className="Rtable__row-cell">
            <Field
              name={`${field}.document_fields[${companyIndex}].value`}
              id={`${field}.document_fields[${companyIndex}].value`}
              options={documentFields[companyIndex].document_field_values}
              className="form-group"
              component={SelectField}
              validate={[required]}
              onChange={v => changeValues(v, field, companyIndex)}
              placeholder="XXX"
              valueAsTitle
            />
          </div>

          <div className="Rtable__row-cell">
            <Field
              name={`${field}.document_fields[${disciplineIndex}].value`}
              id={`${field}.document_fields[${disciplineIndex}].value`}
              options={documentFields[disciplineIndex].document_field_values}
              className="form-group"
              component={SelectField}
              validate={[required]}
              onChange={v => changeValues(v, field, disciplineIndex)}
              placeholder="XXX"
              valueAsTitle
            />
          </div>

          <div className="Rtable__row-cell">
            <Field
              name={`${field}.document_fields[${documentTypeIndex}].value`}
              id={`${field}.document_fields[${documentTypeIndex}].value`}
              options={documentFields[documentTypeIndex].document_field_values}
              className="form-group"
              component={SelectField}
              validate={[required]}
              onChange={v => changeValues(v, field, documentTypeIndex)}
              placeholder="XXX"
              valueAsTitle
            />
          </div>

          <div className="Rtable__row-cell">
            <Field
              component={InputField}
              className="form-group document-number"
              id={`${field}.document_fields[${docNumberIndex}].value`}
              name={`${field}.document_fields[${docNumberIndex}].value`}
              validate={[required]}
              placeholder="0000"
            />
          </div>

          <div className="Rtable__row-cell">
            <Field
              component={InputField}
              className="form-group"
              name={`${field}.title`}
              id={`${field}.title`}
              validate={[required]}
              placeholder="Title"
            />
          </div>

          <div className="Rtable__row-cell">
            <Field
              component={InputField}
              className="form-group"
              name={`${field}.document_fields[${informationIndex}].value`}
              id={`${field}.document_fields[${informationIndex}].value`}
              validate={[required]}
              placeholder="Additional information"
            />
          </div>

        </div>
      ))}
      <div className="Rtable-row">
        <div className="Rtable__row-cell" />
        <div className="Rtable__row-cell" />
        <div className="Rtable__row-cell" />
        <div className="Rtable__row-cell" />
        <div className="Rtable__row-cell" />
        <div className="Rtable__row-cell" />
        <div className="Rtable__row-cell" />
        <div className="Rtable__row-cell" />
        <div className="Rtable__row-cell">
          <button type="button" className="btn btn-purple" onClick={() => fields.push(emptyDoc)}>
            Add document
          </button>
        </div>
      </div>
    </div>
  )
}

export default DocumentTableBody
