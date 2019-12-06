import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getFormValues, reduxForm } from 'redux-form'
import RightsDropDown from '../accessTable/RightsDropDown'
import { updateTeamRights } from '../../../../../../actions/accessRightsActions'

function BulkEditRights({ handleSubmit, handleClose, members }) {
  const dispatch = useDispatch()
  const { projectId } = useParams()
  const fields = useSelector(state => state.accessRights.fields)
  const formValues = useSelector(state => getFormValues('team_bulk_edit')(state))
  const oldTeams = useSelector(state => state.accessRights.oldTeams)
  const newTeams = useSelector(state => state.accessRights.newTeams)
  const teams = oldTeams.concat(newTeams).filter(t => members.includes(t.id))
  const onSubmit = useCallback(({ document_rights: documentRights }) => {
    const updatedMembers = teams.map(m => ({
      ...m,
      document_rights: {
        ...m.document_rights.map(dr => ({
          ...documentRights.find(v => v.document_field_id === dr.document_field_id
            && v.document_field_value_id === dr.document_field_value_id),
          id: dr.id
        }))
      }
    }))
    dispatch(updateTeamRights(projectId, updatedMembers)).then(handleClose)
  }, [dispatch, handleClose, projectId, teams])

  if ((Object.entries(fields).length === 0 && fields.constructor === Object) || !formValues) {
    return <React.Fragment />
  }

  return (
    <form className="new-modal" onSubmit={handleSubmit(onSubmit)}>
      <div className="new-modal__header">
        <h4>Apply attributes to selected members</h4>
      </div>

      <div className="new-modal__body">
        <label>Selected teams</label>
        <div className="users-row-margin-left">
          <ul>
            {teams.map(t => <li key={t.id}>{t.name}</li>)}
          </ul>
        </div>

        <div className="my-4">
          <div className="form-group">
            <label>Originating company</label>
            <RightsDropDown
              values={fields.originating_company}
              rowId="bulkEdit1"
              rights={formValues.document_rights}
              columnTitle="Originating company"
            />
          </div>

          <div className="form-group">
            <label>Document type</label>
            <RightsDropDown
              values={fields.discipline}
              rowId="bulkEdit2"
              rights={formValues.document_rights}
              columnTitle="Discipline"
            />
          </div>

          <div className="form-group">
            <label>Select document type</label>
            <RightsDropDown
              values={fields.document_type}
              rowId="bulkEdit3"
              rights={formValues.document_rights}
              columnTitle="Document type"
            />
          </div>
        </div>
      </div>

      <div className="new-modal__footer">
        <button
          type="button"
          className="btn btn-white"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-purple">Apply</button>
      </div>
    </form>
  )
}

export default reduxForm({ form: 'team_bulk_edit' })(BulkEditRights)
