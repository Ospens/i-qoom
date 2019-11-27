import React from 'react'
import UserAvatar from 'react-user-avatar'
import classnames from 'classnames'

const columns = [
  { title: 'Name' },
  { title: 'Member-ID' },
  { title: 'E-mail' },
  { title: 'Company' }
]

function UsersTable({ fields, users }) {
  const all = fields.getAll() || []

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
          const index = all.findIndex(v => v === user.id)
          const checked = index > -1

          return (
            <div 
              key={i} 
              className={classnames('Rtable-row', { 'Rtable-row__checked': checked })}
            >
              <div className='Rtable__row-cell table-checkbox'>
                <input
                  type='checkbox'
                  id={user.id}
                  onChange={() => { return checked ? fields.remove(index) : fields.push(user.id) }}
                  checked={checked}
                />
                <label htmlFor={user.id} />
              </div>

              <div className='Rtable__row-cell'>
                <div className='d-flex'>
                  <UserAvatar size='42' name='A B' />
                  <div className='ml-2'>
                    <div>{user.first_name} {user.last_name}</div>
                    <div className='lightgrey'>Vestibulum</div>
                  </div>
                </div>
              </div>

              <div className='Rtable__row-cell member-id'>
                {user.username}
              </div>

              <div className='Rtable__row-cell'>
                qwe@gmail.com
              </div>

              <div className='Rtable__row-cell'>
                Company
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UsersTable
