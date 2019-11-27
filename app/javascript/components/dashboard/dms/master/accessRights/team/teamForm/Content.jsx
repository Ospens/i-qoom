import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import {
  createTeam,
  updateTeamMembers,
  updateTeam,
  updateTeamRights
} from '../../../../../../../actions/accessRightsActions'
import TeamName from './TeamName'
import TeamMembers from './TeamMembers'
import AccessRightsTeam from './AccessRightsTeam'

function Content({
  initialize, handleSubmit, handleClose, handleBack, handleNext, step, teamId
}) {
  const dispatch = useDispatch()
  const { project_id } = useParams()
  const teams = useSelector(state => state.accessRights.oldTeams)
  const onSubmit = useCallback(values => {
    if (step < 2) {
      values.id
        ? dispatch(updateTeam(project_id, values)).then(handleNext)
        : dispatch(createTeam(project_id, values)).then(handleNext)
    } else if (step < 3) {
      values.users = values.users.map(({ id }) => id)

      if (values.removed_users) {
        values.users = values.users.filter(id => !values.removed_users.includes(id))
      }
      if (values.added_users) {
        values.users = values.users.concat(values.added_users)
      }
      delete values.removed_users
      delete values.added_users

      if (values.skipAccess) {
        delete values.skipAccess
        return dispatch(updateTeamMembers(project_id, values)).then(handleClose)
      }
      return dispatch(updateTeamMembers(project_id, values)).then(handleNext)
    } else if (step < 4) {
      dispatch(updateTeamRights(project_id, values)).then(handleClose)
    }
  }, [step, dispatch, project_id, handleNext, handleClose])

  useEffect(() => {
    if (!teamId) return

    const team = teams.find(t => t.id === teamId)
    initialize(team)
  }, [initialize, teamId, teams])

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="new-modal wide">
      {(() => {
        if (step === 1) {
          return <TeamName handleClose={handleClose} />
        } if (step === 2) {
          return (
            <TeamMembers
              handleClose={handleClose}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              handleBack={handleBack}
              step={step}
            />
          )
        } if (step === 3) {
          return <AccessRightsTeam handleClose={handleClose} />
        }
      })()}
    </form>
  )
}
export default reduxForm({ form: 'team_form' })(Content)
