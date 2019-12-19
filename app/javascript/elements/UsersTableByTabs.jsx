import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FieldArray } from 'redux-form'
import UsersTable from './UsersTable'
import { dmsUsers } from '../actions/projectActions'
import Tabs from './Tabs'

export const submitButtonText = (added, removed) => {
  let submitText
  if (added.length && removed.length) {
    submitText = `Add ${added.length} member${added.length > 1 ? 's' : ''} and
    remove ${removed.length} member${removed.length > 1 ? 's' : ''}`
  } else if (added.length) {
    submitText = `Add ${added.length} member${added.length > 1 ? 's' : ''}`
  } else if (removed.length) {
    submitText = `Remove ${removed.length} member${removed.length > 1 ? 's' : ''}`
  }
  return submitText
}

export const newUsersIds = values => {
  values.users = values.users ? values.users.map(({ id }) => id) : []

  if (values.removed_users) {
    values.users = values.users.filter(id => !values.removed_users.includes(id))
  }
  if (values.added_users) {
    values.users = values.users.concat(values.added_users)
  }
  delete values.removed_users
  delete values.added_users

  return values.users
}

function UsersTableByTabs({
  firstTabLabel, secondTabLabel, selector, teams = false
}) {
  const dispatch = useDispatch()
  const [freeUsers, setFreeUsers] = useState([])
  const { projectId } = useParams()
  const usersItem = useSelector(state => selector(state, 'users')) || []
  const allUsers = useSelector(state => state.documents.users)
  useEffect(() => {
    const removedUsers = usersItem.map(u => u.id)
    const fu = allUsers.filter(({ id }) => !removedUsers.includes(id))
    setFreeUsers(fu)
  }, [allUsers])
  useEffect(() => {
    dispatch(dmsUsers(projectId, teams))
  }, [dispatch, projectId])

  return (
    <Tabs>
      <div label={firstTabLabel}>
        <FieldArray
          name="added_users"
          component={UsersTable}
          users={freeUsers}
        />
      </div>
      <div label={secondTabLabel}>
        <FieldArray
          name="removed_users"
          component={UsersTable}
          users={usersItem}
        />
      </div>
    </Tabs>
  )
}

export default UsersTableByTabs
