import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialize } from 'redux-form'
import AccessRow from './AccessRow'

const columns = [
  { title: 'Name', divider: true },
  { title: 'Originating Company', divider: true },
  { title: 'Discipline', divider: true },
  { title: 'Document type', divider: true },
  { title: 'Timelimit', divider: true }
]

function AccessTable({
  type, rows, submitRow, toggleMembers, checkedValues
}) {
  const dispatch = useDispatch()
  const fields = useSelector(state => state.accessRights.fields)

  return (
    <div className="Rtable-container">
      <table className="Rtable">
        <thead className="Rtable__header">
          <tr className="Rtable-row">
            <th className="Rtable__row-cell" />
            <th className="Rtable__row-cell table-checkbox">
              <div className="d-flex">
                <input
                  type="checkbox"
                  id="check_all"
                />
                <label htmlFor="check_all" />
              </div>
            </th>
            {columns.map(({ title }) => (
              <th className="Rtable__row-cell" key={title}>
                <div className="Rtable__row-cell__header">
                  <span>{title}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="Rtable__body non-stripped">
          {rows.map(row => {
            dispatch(initialize(`access_rights_form_${row.id}`, row))
            return (
              <AccessRow
                key={row.id}
                type={type}
                toggleMembers={toggleMembers}
                checkedValues={checkedValues}
                fields={fields}
                columnsLength={columns.length + 1}
                submitRow={submitRow}
                form={`access_rights_form_${row.id}`}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AccessTable
