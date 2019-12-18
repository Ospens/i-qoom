import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import {
  createPlannedList,
  updatePlannedListMembers
} from '../../../../../../actions/plannedListActions'
import PlannedListName from './PlannedListName'
import PlannedListUsers from './PlannedListUsers'

function PlannedListForm({
  handleSubmit, handleClose, handleBack, handleNext, step, listId
}) {
  const dispatch = useDispatch()
  const { projectId } = useParams()
  // const oldTeams = useSelector(state => state.accessRights.oldTeams)
  // const newTeams = useSelector(state => state.accessRights.newTeams)
  // const teams = oldTeams.concat(newTeams)

  const onSubmit = useCallback(values => {
    if (step > 2) {
      handleNext()
      // dispatch(createPlannedList(projectId, values)).then(handleNext)
    } else {
      // dispatch(updatePlannedListMembers(projectId, values)).then(handleClose)
    }
  }, [step, dispatch, projectId, handleNext, handleClose])

  useEffect(() => {
    // if (!teamId) return

    // const team = teams.find(t => t.id === listId)
    // initialize(team)
  }, [listId])

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="new-modal wide">
      {(() => {
        if (step === 1) {
          return <PlannedListName handleClose={handleClose} />
        }
        return (
          <PlannedListUsers
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            handleBack={handleBack}
          />
        )
      })()}
    </form>
  )
}
export default reduxForm({ form: 'planned_list_form' })(PlannedListForm)
