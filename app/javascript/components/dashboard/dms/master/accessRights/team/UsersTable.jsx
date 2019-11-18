import React, { useState, useCallback } from 'react'
import classnames from 'classnames'

const columns = [
  { title: 'Name' },
  { title: 'Member-ID' },
  { title: 'E-mail' },
  { title: 'Company' },
]

const users = [
  { id: 1 }
]

function UsersTable() {
  return (

    <div className='Rtable'>
      <div className='Rtable__header'>
        <div className='Rtable-row'>
          <div className='Rtable__row-cell table-checkbox'>
            <div className='d-flex'>
              <input
                type='checkbox'
                id='check_all'
              />
              <label htmlFor='check_all' />
            </div>
          </div>
          {columns.map(({ title, searchable, sortable }) => (
            <div className='Rtable__row-cell' key={title}>
              <div className='Rtable__row-cell__header' >
                <div>
                  {searchable
                    ? <input
                      type='text'
                      className='searchable-title' placeholder={title}
                      onChange={({ target }) => changeFilters(title, target.value)}
                    />
                    : <span>{title}</span>}
                </div>
                {sortable &&
                  <div
                    className={classnames(
                      'icon-arrow-button-down order-arrow',
                      { [sortBy.order]: sortBy.column === sortable })
                    }
                    onClick={() => toggleSort(sortable)}
                  />}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='Rtable__body'>
        {users.map((user, i) => {
          return (
            <div key={i} className={classnames('Rtable-row', { 'Rtable-row__checked': 'checkedDocs.includes(user.id)' })}>
              <div className='Rtable__row-cell table-checkbox'>
                <input
                  type='checkbox' id={user.id}
                  //onChange={() => checkItem(user.id)}
                  //checked={checkedDocs.includes(user.id)}
                />
                <label htmlFor={user.id} />
              </div>

              <div className='Rtable__row-cell'>
                name
              </div>

              <div className='Rtable__row-cell'>
                member id
              </div>

              <div className='Rtable__row-cell'>
                email
              </div>

              <div className='Rtable__row-cell'>
                company
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UsersTable
