import React, { Component } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import UserRow from './UserRow'

export class UserTableBody extends Component {

  render() {
    const { checkItem, checked, users, type } = this.props

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
}

export default UserTableBody
