import React from 'react'
import { FieldArray, reduxForm } from 'redux-form'
import DocumentTableBody from './DocumentTableBody'

const columns = [
  { title: 'Project' },
  { title: 'Company' },
  { title: 'Discipline' },
  { title: 'Doc-Type' },
  { title: 'Doc-No.' },
  { title: 'Document title' },
  { title: 'Add additional information' }
]

function DocumentsTable({ pristine, reset }) {
  return (
    <div className="dms-content bordered">
      <div className="form-body">
        <div className="d-flex mb-4">
          <h4>Add multiple document data</h4>
          <button type="button" className="ml-auto">
            Upload list
          </button>
        </div>
        <div className="Rtable-container">
          <div className="Rtable">
            <div className="Rtable__header">
              <div className="Rtable-row">
                <div className="Rtable__row-cell">
                  <div className="Rtable__row-cell__header">
                    <span>Pos.</span>
                  </div>
                </div>
                <div className="Rtable__row-cell" />
                <div className="Rtable__row-cell table-checkbox">
                  <div className="d-flex">
                    <input
                      type="checkbox"
                      id="check_all"
                    />
                    <label htmlFor="check_all" />
                  </div>
                </div>
                {columns.map(({ title }) => (
                  <div className="Rtable__row-cell" key={title}>
                    <div className="Rtable__row-cell__header">
                      <span>{title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <FieldArray
              name="document_mains"
              component={DocumentTableBody}
            />
          </div>
        </div>

      </div>

      {!pristine
      && (
        <div className="dms-footer data-changed-footer">
          <div className="changes-description">
            <span>You made changes to existing planned list. Do you want to apply? </span>
          </div>
          <div className="d-flex">
            <button type="button" className="btn btn-white" onClick={reset}>
            Discard
            </button>
            <button type="submit" className="btn btn-purple">
             Apply changes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default reduxForm({ form: 'dms_planned_list' })(DocumentsTable)
