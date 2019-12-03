import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialize } from 'redux-form'
import { useParams } from 'react-router-dom'
import {
  fetchDisciplineList,
  deleteDiscipline,
  startCreateDiscipline,
  startUpdateDiscipline
} from '../../../../actions/disciplinesActions'
import FieldForm from './FieldForm'
import ModalList from './ModalList'

function DisciplineList({ closeModal }) {
  const { projectId } = useParams()
  const [inputForm, toggleForm] = useState(false)

  const dispatch = useDispatch()

  const getDisciplineList = useCallback(() => dispatch(fetchDisciplineList(projectId)),
    [dispatch, projectId])

  const removeDiscipline = useCallback(id => dispatch(deleteDiscipline(id, projectId)),
    [dispatch, projectId])

  const openForm = useCallback(values => {
    if (values) dispatch(initialize('field_form', values))
    toggleForm(true)
  }, [dispatch])

  const submitForm = useCallback(values => {
    if (values.id) {
      dispatch(startUpdateDiscipline(values, projectId)).then(() => toggleForm(false))
    } else {
      dispatch(startCreateDiscipline(values, projectId)).then(() => toggleForm(false))
    }
  }, [dispatch, projectId])

  useEffect(() => { getDisciplineList(projectId) }, [getDisciplineList, projectId])

  const disciplines = useSelector(state => state.projectMembers.disciplines)

  if (inputForm) {
    return <FieldForm submitForm={submitForm} type="discipline" />
  }
  return (
    <ModalList
      items={disciplines}
      closeModal={closeModal}
      openForm={openForm}
      removeItem={removeDiscipline}
      type="discipline"
    />
  )
}

export default DisciplineList
