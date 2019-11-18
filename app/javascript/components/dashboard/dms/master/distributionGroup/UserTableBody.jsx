import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import UserRow from './UserRow'

function UserTableBody({ checkItem, checked, users, type }) {
  return (
    <Droppable droppableId={type}>
      {provided => (
        <tbody
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {users.map((user, i) => (
            <UserRow
              type={type}
              key={i}
              checkItem={checkItem}
              checked={checked}
              i={i}
              user={user}
            />
          ))}
          {provided.placeholder}
        </ tbody>
      )}
    </ Droppable>
  )
}

export default UserTableBody
