import React from 'react'
import classnames from 'classnames'

function Header() {
  const btnClass = classnames('with-icon')

  return (
    <div className="dms-header">
      <ul className="buttons-with-icons-list">
        <li>
          <h4>Example XY Schedule</h4>
          <label>(Selected planned list)</label>
        </li>
        <li className="ml-4">
          <button type="button" className={btnClass}>
            <span className="icon-add_1 mr-2" />
            <span data-title="Add planned document(s)">
              <span>Add planned document(s)</span>
            </span>
          </button>
        </li>
        <li className="ml-4">
          <button type="button" className={btnClass}>
            <span className="icon-add_1 mr-2" />
            <span data-title="Create new planned list">
              <span>Create new planned list</span>
            </span>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Header
