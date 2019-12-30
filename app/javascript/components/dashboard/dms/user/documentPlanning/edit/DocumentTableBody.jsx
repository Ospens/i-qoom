import React, { Fragment, useCallback, useState } from 'react'
import { change, Field } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import SelectField from '../../../../../../elements/SelectField'
import { required } from '../../../../../../elements/validations'
import InputField from '../../../../../../elements/InputField'
import DatePickerField from '../../../../../../elements/DatePickerField'

const INFO_FEEDBACK = 'Updated manually'

function DocumentTableBody({ fields, checkedDocs, toggleChecked }) {
  const dispatch = useDispatch()
  const [changedRows, setChangedRows] = useState({})
  const documentFields = useSelector(state => state.conventions.current.document_fields)
  const documentTypeIndex = documentFields.findIndex(el => el.codification_kind === 'document_type')
  const revNumberIndex = documentFields.findIndex(el => el.codification_kind === 'revision_number')
  const revDateIndex = documentFields.findIndex(el => el.codification_kind === 'revision_date')
  const disciplineIndex = documentFields.findIndex(el => el.codification_kind === 'discipline')
  const companyIndex = documentFields
    .findIndex(el => el.codification_kind === 'originating_company')
  const docNumberIndex = documentFields
    .findIndex(el => el.codification_kind === 'document_number')
  const informationIndex = documentFields
    .findIndex(el => el.codification_kind === 'additional_information')
  // const emptyDoc = { document: useSelector(state => state.plannedLists.edit.new) }
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
      `${document}.document.document_fields[${fieldIndex}].document_field_values`,
      newValues))
  }, [dispatch, documentFields])

  const toggleChangedRows = useCallback((dirty, index, field) => {
    const value = changedRows[index] || []
    if (!dirty && value.length < 1) return

    let newVal = { ...changedRows }
    if (dirty) {
      value.push(field)
      newVal = {
        ...changedRows,
        [index]: value
      }
    } else {
      newVal = {
        ...changedRows,
        [index]: value.filter(v => v !== field)
      }
    }
    setChangedRows(newVal)
  }, [changedRows])

  const copyDoc = useCallback(index => {
    const currentField = fields.get(index)
    const newValue = {
      ...currentField,
      id: undefined,
      temp_id: `f${((Math.random() * 1e8)).toString(16)}`
    }
    fields.splice(index + 1, 0, newValue)
  }, [fields])
  if (documentTypeIndex < 0 || disciplineIndex < 0 || companyIndex < 0) return <Fragment />

  const lessThanTwo = fields.length < 2
  return (
    <TransitionGroup className="Rtable__body non-stripped">
      {fields.map((field, i) => {
        const { temp_id: tempId, id } = fields.get(i)
        const checked = checkedDocs.includes(tempId)
        const changedRow = changedRows[tempId] || []
        const changed = changedRow.length > 0
        const bordered = !id || changed
        const projectCodeName = `${field}.document.project_code`
        const companyName = `${field}.document.document_fields[${companyIndex}].value`
        const disciplineName = `${field}.document.document_fields[${disciplineIndex}].value`
        const docTypeName = `${field}.document.document_fields[${documentTypeIndex}].value`
        const docNumberName = `${field}.document.document_fields[${docNumberIndex}].value`
        const revNumberName = `${field}.document.document_fields[${revNumberIndex}].value`
        const revDateName = `${field}.document.document_fields[${revDateIndex}].value`
        const titleName = `${field}.document.title`
        const informationName = `${field}.document.document_fields[${informationIndex}].value`
        const feedBackText = name => (changedRow.includes(name) ? INFO_FEEDBACK : '')

        return (
          <CSSTransition key={tempId} timeout={200} classNames="Rtable-row">
            <div
              className={classnames('Rtable-row',
                { 'Rtable-row__checked': checked },
                { 'event-border': bordered })}
            >
              <div className="Rtable__row-cell event-name">
                <div className={classnames({ active: bordered })}>
                  { id ? 'changed' : 'new'}
                </div>
              </div>
              <div className="Rtable__row-cell table-checkbox">
                <input
                  type="checkbox"
                  id={tempId}
                  checked={checked}
                  onChange={() => toggleChecked(tempId)}
                />
                <label htmlFor={tempId} />
              </div>
              <div className="Rtable__row-cell">
                <div>
                  {`${i + 1}.`}
                </div>
              </div>
              <div className="Rtable__row-cell">
                <button
                  type="button"
                  onClick={() => fields.remove(i)}
                  className={classnames({ 'd-invisible': lessThanTwo })}
                  disabled={lessThanTwo}
                >
                  <span className="icon-bin-1" />
                </button>
              </div>

              <div className="Rtable__row-cell">
                <button type="button" onClick={() => copyDoc(i)}>
                  <span className="icon-common-file-double-1" />
                </button>
              </div>

              <div className="Rtable__row-cell">
                <Field
                  component={InputField}
                  className="form-group project-code"
                  name={projectCodeName}
                  id={projectCodeName}
                  placeholder="MWP"
                  disabled
                  infoFeedback={feedBackText(projectCodeName)}
                  isDirty={v => toggleChangedRows(v, tempId, projectCodeName)}
                />
              </div>

              <div className="Rtable__row-cell">
                <Field
                  name={companyName}
                  id={companyName}
                  options={documentFields[companyIndex].document_field_values}
                  className="form-group document-codification-field"
                  component={SelectField}
                  validate={[required]}
                  onChange={v => changeValues(v, field, companyIndex)}
                  placeholder="XXX"
                  valueAsTitle
                  infoFeedback={feedBackText(companyName)}
                  isDirty={v => toggleChangedRows(v, tempId, companyName)}
                />
              </div>

              <div className="Rtable__row-cell">
                <Field
                  name={disciplineName}
                  id={disciplineName}
                  options={documentFields[disciplineIndex].document_field_values}
                  className="form-group document-codification-field"
                  component={SelectField}
                  validate={[required]}
                  onChange={v => changeValues(v, field, disciplineIndex)}
                  placeholder="XXX"
                  valueAsTitle
                  infoFeedback={feedBackText(disciplineName)}
                  isDirty={v => toggleChangedRows(v, tempId, disciplineName)}
                />
              </div>

              <div className="Rtable__row-cell">
                <Field
                  name={docTypeName}
                  id={docTypeName}
                  options={documentFields[documentTypeIndex].document_field_values}
                  className="form-group document-codification-field"
                  component={SelectField}
                  validate={[required]}
                  onChange={v => changeValues(v, field, documentTypeIndex)}
                  placeholder="XXX"
                  valueAsTitle
                  infoFeedback={feedBackText(docTypeName)}
                  isDirty={v => toggleChangedRows(v, tempId, docTypeName)}
                />
              </div>

              <div className="Rtable__row-cell">
                <Field
                  name={docNumberName}
                  id={docNumberName}
                  component={InputField}
                  className="form-group document-number"
                  validate={[required]}
                  placeholder="0000"
                  infoFeedback={feedBackText(docNumberName)}
                  isDirty={v => toggleChangedRows(v, tempId, docNumberName)}
                />
              </div>

              <div className="Rtable__row-cell">
                <Field
                  name={revNumberName}
                  id={revNumberName}
                  component={InputField}
                  className="form-group revision-number"
                  validate={[required]}
                  placeholder="00"
                  infoFeedback={feedBackText(revNumberName)}
                  isDirty={v => toggleChangedRows(v, tempId, revNumberName)}
                />
              </div>

              <div className="Rtable__row-cell">
                <Field
                  name={revDateName}
                  id={revDateName}
                  component={DatePickerField}
                  className="form-group revision-date"
                  validate={[required]}
                  placeholder="01/01/2019"
                  infoFeedback={feedBackText(revDateName)}
                  isDirty={v => toggleChangedRows(v, tempId, revDateName)}
                />
              </div>

              <div className="Rtable__row-cell">
                <Field
                  name={titleName}
                  id={titleName}
                  component={InputField}
                  className="form-group document-title"
                  validate={[required]}
                  placeholder="Title"
                  infoFeedback={feedBackText(titleName)}
                  isDirty={v => toggleChangedRows(v, tempId, titleName)}
                />
              </div>

              <div className="Rtable__row-cell">
                <Field
                  name={informationName}
                  id={informationName}
                  component={InputField}
                  className="form-group"
                  validate={[required]}
                  placeholder="Additional information"
                  infoFeedback={feedBackText(informationName)}
                  isDirty={v => toggleChangedRows(v, tempId, informationName)}
                />
              </div>

            </div>
          </CSSTransition>
        )
      })}
      {/* <div className="Rtable-row">
        <div className="Rtable__row-cell" />
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
        <div className="Rtable__row-cell" />
      </div> */}
    </TransitionGroup>
  )
}

export default DocumentTableBody
