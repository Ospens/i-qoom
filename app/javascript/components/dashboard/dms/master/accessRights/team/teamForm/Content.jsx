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
import { newUsersIds } from '../../../../../../../elements/UsersTableByTabs'
import TeamName from './TeamName'
import TeamMembers from './TeamMembers'
import AccessRightsTeam from './AccessRightsTeam'

function Content({
  initialize, handleSubmit, handleClose, handleBack, handleNext, step, teamId
}) {
  const dispatch = useDispatch()
  const { projectId } = useParams()
  const oldTeams = useSelector(state => state.accessRights.oldTeams)
  const newTeams = useSelector(state => state.accessRights.newTeams)
  const teams = oldTeams.concat(newTeams)

  const onSubmit = useCallback(values => {
    if (step < 2) {
      if (values.id) {
        dispatch(updateTeam(projectId, values)).then(handleNext)
      } else {
        dispatch(createTeam(projectId, values)).then(handleNext)
      }
    } else if (step < 3) {
      values.users = newUsersIds(values)
      if (values.skipAccess) {
        delete values.skipAccess
        dispatch(updateTeamMembers(projectId, values)).then(handleClose)
      } else {
        dispatch(updateTeamMembers(projectId, values)).then(handleNext)
      }
    } else if (step < 4) {
      dispatch(updateTeamRights(projectId, [values])).then(handleClose)
    }
  }, [step, dispatch, projectId, handleNext, handleClose])

  useEffect(() => {
    if (!teamId) return

    const team = teams.find(t => t.id === teamId)
    initialize(team)
  }, [teamId])

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
            />
          )
        }
        return <AccessRightsTeam handleClose={handleClose} />
      })()}
    </form>
  )
}
export default reduxForm({ form: 'team_form' })(Content)
