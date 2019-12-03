import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialize } from 'redux-form'
import { useParams } from 'react-router-dom'
import {
  fetchRoleList, deleteRole, startUpdateRole, startCreateRole
} from '../../../../actions/rolesActions'
import FieldForm from './FieldForm'
import ModalList from './ModalList'

function RoleList({ closeModal }) {
  const { projectId } = useParams()
  const [inputForm, toggleForm] = useState(false)

  const dispatch = useDispatch()

  const getRoleList = useCallback(() => dispatch(fetchRoleList(projectId)),
    [dispatch, projectId])

  const removeRole = useCallback(id => dispatch(deleteRole(id, projectId)),
    [dispatch, projectId])

  const openForm = useCallback(values => {
    if (values) dispatch(initialize('field_form', values))
    toggleForm(true)
  }, [dispatch])

  const submitForm = useCallback(values => {
    if (values.id) {
      dispatch(startUpdateRole(values, projectId)).then(() => toggleForm(false))
    } else {
      dispatch(startCreateRole(values, projectId)).then(() => toggleForm(false))
    }
  }, [dispatch, projectId])

  useEffect(() => { getRoleList(projectId) }, [getRoleList, projectId])

  const roles = useSelector(state => state.projectMembers.roles)

  if (inputForm) {
    return <FieldForm submitForm={submitForm} type="role" />
  }
  return (
    <ModalList
      items={roles}
      closeModal={closeModal}
      openForm={openForm}
      removeItem={removeRole}
      type="role"
    />
  )
}

export default RoleList
