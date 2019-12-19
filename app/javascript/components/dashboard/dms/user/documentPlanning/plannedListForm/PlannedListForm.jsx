import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import {
  createPlannedList,
  updatePlannedList,
  updatePlannedListMembers
} from '../../../../../../actions/plannedListActions'
import PlannedListName from './PlannedListName'
import PlannedListUsers from './PlannedListUsers'
import { newUsersIds } from '../../../../../../elements/UsersTableByTabs'

function PlannedListForm({
  handleSubmit, handleClose, handleBack, handleNext, step // listId
}) {
  const dispatch = useDispatch()
  const { projectId } = useParams()

  const onSubmit = useCallback(values => {
    if (step < 2) {
      if (values.id) {
        return dispatch(updatePlannedList(projectId, values)).then(handleNext)
      }
      return dispatch(createPlannedList(projectId, values)).then(handleNext)
    }
    values.users = newUsersIds(values)
    return dispatch(updatePlannedListMembers(projectId, values)).then(handleClose)
  }, [step, dispatch, projectId, handleNext, handleClose])

  // useEffect(() => {
  // if (!teamId) return

  // const team = teams.find(t => t.id === listId)
  // initialize(team)
  // }, [listId])

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
