import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { initialize } from 'redux-form'
import AccessRow from './AccessRow'
import toggleArray from '../../../../../../elements/toggleArray'

const columns = [
  { title: 'Name', divider: true },
  { title: 'Member-ID', divider: true },
  { title: 'Originating Company', divider: true },
  { title: 'Discipline', divider: true },
  { title: 'Document type', divider: true },
  { title: 'Timelimit', divider: true }
]

function AccessTable({ type, rows, submitRow }) {
  const [checked, setChecked] = useState([])
  const fields = useSelector(state => state.accessRights.fields)

  const toggleMemeber = useCallback(value => {
    setChecked(toggleArray(checked, value))
  }, [checked])

  return (
    <table className='Rtable'>
      <thead className='Rtable__header'>
        <tr className='Rtable-row'>
          <th className='Rtable__row-cell table-checkbox'>
            <div className='d-flex'>
              <input
                type='checkbox'
                id='check_all'
              />
              <label htmlFor='check_all' />
            </div>
          </th>
          {columns.map(({ title, searchable, sortable }) => (
            <th className='Rtable__row-cell' key={title}>
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
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='Rtable__body'>
        {rows.map(row => {
          initialize(`access_rights_form_${row.id}`, row)
          return (
            <AccessRow 
              key={row.id}
              type={type}
              checkedValues={checked}
              toggleValues={setChecked}
              fields={fields}
              initialValues={row}
              columnsLength={columns.length}
              submitRow={submitRow}
              form={`access_rights_form_${row.id}`}
            />
        )})}
      </tbody>
    </table>
  )
}

export default AccessTable
