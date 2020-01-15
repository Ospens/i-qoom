import React, { useState } from 'react'
import classnames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { useSelector } from 'react-redux'
import { formValueSelector, Field } from 'redux-form'
import { Link, useParams } from 'react-router-dom'
import DropZoneField from '../../../../../elements/DropZoneField'
import InputField from '../../../../../elements/InputField'
import { required } from '../../../../../elements/validations'
import UploadForm from './UploadForm'

export const changeFile = value => (value || typeof value === 'number'
  ? undefined
  : 'Please change the file')

const selector = formValueSelector('document_form')

function UploadFile() {
  const [uploadForm, setUploadForm] = useState(false)
  const { projectId } = useParams()
  const documentFields = useSelector(state => selector(state, 'document_fields'))
  if (!(documentFields && documentFields.length > 0)) return <div />

  const docFile = documentFields.find(el => el.codification_kind === 'document_native_file')
  const docIndex = documentFields.findIndex(el => el.codification_kind === 'document_native_file')

  return (
    <div>
      <div className="dms-content__header">
        <div className="d-flex">
          <h4>Add new revision</h4>
        </div>
      </div>

      <div className="content-body bottom-padding">
        <div className={classnames('collapsible-block', { opened: uploadForm })}>
          <button
            type="button"
            className="collapsible__button mb-4"
            onClick={() => setUploadForm(!uploadForm)}
          >
            <span>Open upload form</span>
            <span className="arrow-icon icon-arrow-button-down" />
          </button>
          <CSSTransition
            unmountOnExit
            in={uploadForm}
            timeout={300}
            classNames="collapsible__content"
          >
            <div className="collapsible__content overflow-visible">
              <UploadForm editableRevision />
            </div>
          </CSSTransition>
        </div>
        <div className="form-group col-6 pl-0">
          <Field
            component={InputField}
            name="contractor"
            id="contractor"
            placeholder="Originator"
            label="Type in originator*"
            validate={[required]}
          />
        </div>
        <div className="row mt-5">
          <div className="col-6">
            <Field
              label={docFile.title}
              name={`document_fields[${docIndex}].file`}
              id={`document_fields[${docIndex}].file`}
              validate={[changeFile]}
              placeholder={docFile.command}
              component={DropZoneField}
              renameFile
              filename={docFile.filename}
              revisionPlaceholder
            />
          </div>
        </div>
      </div>

      <div className="dms-footer">
        <Link className="btn btn-white" to={`/dashboard/projects/${projectId}/documents/`}>
          Cancel
        </Link>
        <button type="submit" className="btn btn-purple">
          Next
        </button>
      </div>
    </div>
  )
}

export default UploadFile
