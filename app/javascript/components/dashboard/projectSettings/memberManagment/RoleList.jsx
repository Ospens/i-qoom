import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialize } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { fetchRoleList, deleteRole, startUpdateRole, startCreateRole } from '../../../../actions/rolesActions'
import FieldForm from './FieldForm'
import ModalList from './ModalList'

function RoleList({ closeModal, match: { params: { projectId } } }) {
  const [inputForm, toggleForm] = useState(false)

  const dispatch = useDispatch()

  const getRoleList = useCallback(() =>
    dispatch(fetchRoleList(projectId)),
    [dispatch])

  const removeRole = useCallback(id =>
    dispatch(deleteRole(id, projectId)),
    [dispatch])

  const openForm = useCallback(values => {
    if (values) dispatch(initialize('field_form', values))
    toggleForm(true)
  }, [dispatch])

  const submitForm = useCallback(values => {
    values.id
      ? dispatch(startUpdateRole(values, projectId)).then(() => toggleForm(false))
      : dispatch(startCreateRole(values, projectId)).then(() => toggleForm(false))
  }, [dispatch])

  useEffect(() => { getRoleList(projectId) }, [])

  const roles = useSelector(state => state.projectMembers.roles)

  if (inputForm) {
    return <FieldForm submitForm={submitForm} type='role' />
  } else {
    return (
      <ModalList
        items={roles}
        closeModal={closeModal}
        openForm={openForm}
        removeItem={removeRole}
        type='role'
      />
    )
  }
}

export default withRouter(RoleList)
