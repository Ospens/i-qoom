import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialize } from 'redux-form'
import { withRouter } from 'react-router-dom'
import {
  fetchDisciplineList,
  deleteDiscipline,
  startCreateDiscipline,
  startUpdateDiscipline
} from '../../../../actions/disciplinesActions'
import FieldForm from './FieldForm'
import ModalList from './ModalList'

function DisciplineList({ closeModal, match: { params: { projectId } } }) {
  const [inputForm, toggleForm] = useState(false)

  const dispatch = useDispatch()

  const getDisciplineList = useCallback(() =>
    dispatch(fetchDisciplineList(projectId)),
    [dispatch])

  const removeDiscipline = useCallback(id =>
    dispatch(deleteDiscipline(id, projectId)),
    [dispatch])

  const openForm = useCallback(values => {
    if (values) dispatch(initialize('field_form', values))
    toggleForm(true)
    }, [dispatch])

  const submitForm = useCallback(values => {
    values.id
      ? dispatch(startUpdateDiscipline(values, projectId)).then(() => toggleForm(false))
      : dispatch(startCreateDiscipline(values, projectId)).then(() => toggleForm(false))
  }, [dispatch])

  useEffect(() => { getDisciplineList(projectId) }, [])

  const disciplines = useSelector(state => state.projectMembers.disciplines)

  if (inputForm) {
    return <FieldForm submitForm={submitForm} type='discipline'/>
  } else {
    return (
      <ModalList
        items={disciplines}
        closeModal={closeModal}
        openForm={openForm}
        removeItem={removeDiscipline}
        type='discipline'
      />
    )
  }
}

export default withRouter(DisciplineList)
