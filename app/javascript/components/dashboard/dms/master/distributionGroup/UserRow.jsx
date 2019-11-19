import React from 'react'
import UserAvatar from 'react-user-avatar'
import classnames from 'classnames'
import { Draggable } from 'react-beautiful-dnd'
import { Table } from 'semantic-ui-react'

function UserRow({ checkItem, checked, i, user, type }) {
  return (
    <Draggable draggableId={`row_${i}_${type}`} index={i}>
      {(provided, snapshot) => (
        <tr
          className={classnames('draggable-table-row', { 'dragging': snapshot.isDragging })}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {type === 'DG' &&
            <Table.Cell className='align-middle'>
              <i className='close-icon' />
            </Table.Cell>}
          <Table.Cell className='table-checkbox'>
            <div>
              <input
                type='checkbox'
                id={`${type}_${i}`}
                checked={checked.includes(user.id)}
                onChange={() => checkItem(`checked${type}`, user.id)}
              />
              <label htmlFor={`${type}_${i}`} />
            </div>
          </Table.Cell>
          <Table.Cell className='name-column '>
            <div className='d-flex'>
              <div className='user-info-avatar'>
                <UserAvatar size='42' name={user.name} />
              </div>
              <div className='user-and-company'>
                <span>{user.name}</span>
                <span className='text-secondary'>{user.company}</span>
              </div>
            </div>
          </Table.Cell>
          <Table.Cell>
            {user.company}
          </Table.Cell>
        </tr>
      )}
    </Draggable>
  )
}

export default UserRow
