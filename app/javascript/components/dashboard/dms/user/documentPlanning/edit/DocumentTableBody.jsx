/* eslint-disable no-nested-ternary */
import React, { useCallback } from 'react'
import {
  change, touch, Field
} from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import SelectField from '../../../../../../elements/SelectField'
import {
  required,
  maxLength4,
  maxLength2,
  minLength2,
  minLength4
} from '../../../../../../elements/validations'
import InputField from '../../../../../../elements/InputField'
import DatePickerField from '../../../../../../elements/DatePickerField'
import { Body, BodyRow, BodyCell } from '../../../../../table/Table'

const INFO_FEEDBACK = 'Updated manually'
const generateId = () => `f${((Math.random() * 1e8)).toString(16)}`

function DocumentTableBody({
  fields, checkedDocs, toggleChecked, changedRows, setChangedRows
}) {
  const dispatch = useDispatch()
  const projectCode = useSelector(state => state.projects.current.project_code)
  // Select options haven't ids
  const changeValues = useCallback((value, document, fieldIndex, fieldValues) => {
    const newValues = fieldValues.map(f => {
      const selected = f.value === value
      return {
        ...f,
        selected
      }
    })
    dispatch(change('dms_planned_list',
      `${document}.document.document_fields[${fieldIndex}].document_field_values`,
      newValues))
  }, [dispatch])

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
  }, [changedRows, setChangedRows])

  const copyDoc = useCallback(index => {
    const currentField = fields.get(index)
    const newValue = {
      ...currentField,
      document: {
        ...currentField.document,
        email_title: undefined,
        email_text: undefined,
        revision_version: undefined,
        user_id: undefined,
        document_revision_id: undefined,
        convention_id: undefined,
        emails: undefined,
        doc_id: undefined,
        contractor: undefined,
        id: undefined
      },
      id: undefined,
      temp_id: generateId()
    }
    fields.push(newValue)
  }, [fields])

  const blurPadStart = useCallback((document, index, padStart, event) => {
    event.preventDefault()
    const newValue = String(event.target.value).padStart(padStart, 0)
    dispatch(change('dms_planned_list',
      `${document}.document.document_fields[${index}].value`,
      newValue))
    dispatch(touch('dms_planned_list', `document_fields[${index}].value`))
  }, [dispatch])

  const removeField = useCallback(i => {
    const currentField = fields.get(i)
    if (!currentField.document.id) {
      fields.remove(i)
      return
    }
    const newValue = {
      ...currentField,
      // eslint-disable-next-line no-underscore-dangle
      _destroy: currentField._destroy === '1' ? null : '1'
    }

    fields.splice(i, 1, newValue)
  }, [fields])

  const lessThanTwo = fields.length < 2
  return (
    <Body stripped={false} component={TransitionGroup}>
      {fields.map((fieldName, i) => {
        const {
          temp_id: tempId, id, document, _destroy
        } = fields.get(i)
        const documentFields = document.document_fields
        const documentTypeIndex = documentFields
          .findIndex(el => el.codification_kind === 'document_type')
        const revNumberIndex = documentFields
          .findIndex(el => el.codification_kind === 'revision_number')
        const revDateIndex = documentFields
          .findIndex(el => el.codification_kind === 'revision_date')
        const disciplineIndex = documentFields
          .findIndex(el => el.codification_kind === 'discipline')
        const companyIndex = documentFields
          .findIndex(el => el.codification_kind === 'originating_company')
        const docNumberIndex = documentFields
          .findIndex(el => el.codification_kind === 'document_number')
        const informationIndex = documentFields
          .findIndex(el => el.codification_kind === 'additional_information')
        const documentTypeValues = documentFields[documentTypeIndex].document_field_values
        const disciplineValues = documentFields[disciplineIndex].document_field_values
        const companyValues = documentFields[companyIndex].document_field_values

        const checked = checkedDocs.includes(tempId)
        const changedRow = changedRows[tempId] || []
        const changed = changedRow.length > 0
        const bordered = !document.id || changed || _destroy
        const projectCodeName = `${fieldName}.document.project_code`
        const companyName = `${fieldName}.document.document_fields[${companyIndex}].value`
        const disciplineName = `${fieldName}.document.document_fields[${disciplineIndex}].value`
        const docTypeName = `${fieldName}.document.document_fields[${documentTypeIndex}].value`
        const docNumberName = `${fieldName}.document.document_fields[${docNumberIndex}].value`
        const revNumberName = `${fieldName}.document.document_fields[${revNumberIndex}].value`
        const revDateName = `${fieldName}.document.document_fields[${revDateIndex}].value`
        const titleName = `${fieldName}.document.title`
        const informationName = `${fieldName}.document.document_fields[${informationIndex}].value`
        const feedBackText = name => (changedRow.includes(name) && id ? INFO_FEEDBACK : '')
        const labelText = () => {
          if (!bordered) return ''
          if (_destroy) return 'deleted'
          if (document.id) return 'changed'
          return 'new'
        }
        return (
          <CSSTransition key={tempId} timeout={200} classNames="Rtable-row">
            <BodyRow checked={checked} bordered={bordered}>
              <BodyCell className="event-name">
                <div className={classnames({ active: bordered })}>
                  {labelText()}
                </div>
              </BodyCell>
              <BodyCell className="table-checkbox">
                <input
                  type="checkbox"
                  id={tempId}
                  checked={checked}
                  onChange={() => toggleChecked(tempId)}
                  disabled={_destroy}
                />
                <label htmlFor={tempId} />
              </BodyCell>
              <BodyCell>
                <div>
                  {`${i + 1}.`}
                </div>
              </BodyCell>
              <BodyCell>
                <button
                  type="button"
                  onClick={() => removeField(i)}
                  className={classnames({ 'd-invisible': lessThanTwo })}
                  disabled={lessThanTwo}
                >
                  <span
                    className={classnames({ 'icon-undo': _destroy }, { 'icon-bin-1': !_destroy })}
                  />
                </button>
              </BodyCell>

              <BodyCell>
                <button type="button" onClick={() => copyDoc(i)} disabled={_destroy}>
                  <span className="icon-common-file-double-1" />
                </button>
              </BodyCell>

              <BodyCell>
                <Field
                  component={InputField}
                  className="form-group project-code"
                  name={projectCodeName}
                  id={projectCodeName}
                  placeholder={projectCode}
                  disabled
                  infoFeedback={feedBackText(projectCodeName)}
                  isDirty={v => toggleChangedRows(v, tempId, projectCodeName)}
                />
              </BodyCell>

              <BodyCell>
                <Field
                  name={companyName}
                  id={companyName}
                  options={companyValues}
                  className="form-group document-codification-field"
                  component={SelectField}
                  validate={[required]}
                  onChange={v => changeValues(v, fieldName, companyIndex, companyValues)}
                  placeholder="XXX"
                  valueAsTitle
                  infoFeedback={feedBackText(companyName)}
                  isDirty={v => toggleChangedRows(v, tempId, companyName)}
                  disabled={_destroy}
                />
              </BodyCell>

              <BodyCell>
                <Field
                  name={disciplineName}
                  id={disciplineName}
                  options={disciplineValues}
                  className="form-group document-codification-field"
                  component={SelectField}
                  validate={[required]}
                  onChange={v => changeValues(v, fieldName, disciplineIndex, disciplineValues)}
                  placeholder="XXX"
                  valueAsTitle
                  infoFeedback={feedBackText(disciplineName)}
                  isDirty={v => toggleChangedRows(v, tempId, disciplineName)}
                  disabled={_destroy}
                />
              </BodyCell>

              <BodyCell>
                <Field
                  name={docTypeName}
                  id={docTypeName}
                  options={documentTypeValues}
                  className="form-group document-codification-field"
                  component={SelectField}
                  validate={[required]}
                  onChange={v => changeValues(v, fieldName, documentTypeIndex, documentTypeValues)}
                  placeholder="XXX"
                  valueAsTitle
                  infoFeedback={feedBackText(docTypeName)}
                  isDirty={v => toggleChangedRows(v, tempId, docTypeName)}
                  disabled={_destroy}
                />
              </BodyCell>

              <BodyCell>
                <Field
                  name={docNumberName}
                  id={docNumberName}
                  component={InputField}
                  type="number"
                  className="form-group document-number"
                  validate={[required, maxLength4, minLength4]}
                  placeholder="0000"
                  maxLength="4"
                  min="0000"
                  onBlur={v => blurPadStart(fieldName, docNumberIndex, 4, v)}
                  infoFeedback={feedBackText(docNumberName)}
                  isDirty={v => toggleChangedRows(v, tempId, docNumberName)}
                  disabled={_destroy}
                />
              </BodyCell>

              <BodyCell>
                <Field
                  name={revNumberName}
                  id={revNumberName}
                  component={InputField}
                  type="number"
                  className="form-group revision-number"
                  validate={[required, maxLength2, minLength2]}
                  placeholder="00"
                  maxLength="2"
                  min="00"
                  onBlur={v => blurPadStart(fieldName, revNumberIndex, 2, v)}
                  infoFeedback={feedBackText(revNumberName)}
                  isDirty={v => toggleChangedRows(v, tempId, revNumberName)}
                  disabled={_destroy}
                />
              </BodyCell>

              <BodyCell>
                <Field
                  name={revDateName}
                  id={revDateName}
                  component={DatePickerField}
                  className="form-group revision-date"
                  validate={[required]}
                  placeholder="01/01/2019"
                  infoFeedback={feedBackText(revDateName)}
                  isDirty={v => toggleChangedRows(v, tempId, revDateName)}
                  disabled={_destroy}
                />
              </BodyCell>

              <BodyCell>
                <Field
                  name={titleName}
                  id={titleName}
                  component={InputField}
                  className="form-group document-title"
                  validate={[required]}
                  placeholder="Title"
                  infoFeedback={feedBackText(titleName)}
                  isDirty={v => toggleChangedRows(v, tempId, titleName)}
                  disabled={_destroy}
                />
              </BodyCell>

              <BodyCell>
                <Field
                  name={informationName}
                  id={informationName}
                  component={InputField}
                  className="form-group"
                  placeholder="Additional information"
                  infoFeedback={feedBackText(informationName)}
                  isDirty={v => toggleChangedRows(v, tempId, informationName)}
                  disabled={_destroy}
                />
              </BodyCell>

            </BodyRow>
          </CSSTransition>
        )
      })}
    </Body>
  )
}

export default DocumentTableBody
