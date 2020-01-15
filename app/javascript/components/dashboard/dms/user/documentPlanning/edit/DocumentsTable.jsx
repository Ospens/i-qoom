import React, { useCallback, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FieldArray, reduxForm, arrayPush } from 'redux-form'
import DocumentTableBody from './DocumentTableBody'
import { updatePlannedListDocuments } from '../../../../../../actions/plannedListActions'
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell
} from '../../../../../table/Table'
import generateId from '../../../../../../elements/generateId'

const columns = [
  { title: 'Project' },
  { title: 'Company' },
  { title: 'Discipline' },
  { title: 'Doc-Type' },
  { title: 'Doc-No.' },
  { title: 'Rev-No.' },
  { title: 'Rev-date' },
  { title: 'Document title' },
  { title: 'Add additional information' }
]

function tableFooter(pristine, reset, projectId, listId) {
  if (pristine) {
    return (
      <div className="dms-footer data-changed-footer">
        <div className="d-flex">
          <Link
            to={`/dashboard/projects/${projectId}/documents/planning/${listId}`}
            className="btn btn-white"
          >
            Close edit mode
          </Link>
        </div>
      </div>
    )
  }
  return (
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
  )
}

function DocumentsTable({
  handleSubmit, pristine, reset, checkedDocs, toggleChecked
}) {
  const dispatch = useDispatch()
  const [changedRows, setChangedRows] = useState({})
  const { projectId, listId } = useParams()
  const onSubmit = useCallback(values => (
    dispatch(updatePlannedListDocuments(projectId, listId, values)).then(() => {
      setChangedRows({})
    })
  ), [dispatch, projectId, listId, setChangedRows])
  const newFields = useSelector(state => state.plannedLists.edit.new)
  const addDocument = useCallback(() => {
    const emptyDoc = {
      document: newFields,
      temp_id: generateId()
    }
    dispatch(arrayPush('dms_planned_list', 'document_mains', emptyDoc))
  }, [dispatch, newFields])
  const resetTable = useCallback(() => {
    reset()
    setChangedRows({})
  }, [reset])
  return (
    <form noValidate className="dms-content bordered" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-body">
        <div className="d-flex mb-4">
          <h4>Add multiple document data</h4>
          <button type="button" className="button-with-icon ml-auto" onClick={addDocument}>
            <span className="icon-add_1 mr-2" />
            <span data-title="Add document">Add document</span>
          </button>
          <button type="button" className="color-blue ml-4">
            Upload list
          </button>
        </div>
        <Table separated>
          <Header>
            <HeaderRow>
              <HeaderCell className="event-name" />
              <HeaderCell className="table-checkbox">
                <div className="d-flex">
                  <input
                    type="checkbox"
                    id="check_all"
                  />
                  <label htmlFor="check_all" />
                </div>
              </HeaderCell>
              <HeaderCell>
                <span>Pos.</span>
              </HeaderCell>
              <HeaderCell />
              <HeaderCell />
              {columns.map(({ title }) => (
                <HeaderCell key={title}>
                  <span>{title}</span>
                </HeaderCell>
              ))}
            </HeaderRow>
          </Header>
          <FieldArray
            name="document_mains"
            component={DocumentTableBody}
            checkedDocs={checkedDocs}
            toggleChecked={toggleChecked}
            changedRows={changedRows}
            setChangedRows={setChangedRows}
            rerenderOnEveryChange
          />
        </Table>
      </div>
      {tableFooter(pristine, resetTable, projectId, listId)}
    </form>
  )
}

export default reduxForm({ form: 'dms_planned_list' })(DocumentsTable)
