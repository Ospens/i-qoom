import React from 'react'
import classnames from 'classnames'

function Header({ checkedDocs }) {
  const checkedLength = checkedDocs.length
  const btnClass = classnames('with-icon', { 'disable': checkedLength === 0 })

  return (
    <div className='dms-header'>
      <ul className='buttons-with-icons-list'>
        <div>
          <h4>Example XY Schedule</h4>
          <label>(Selected planned list)</label>
        </div>
        <li className='ml-4'>
          <button type='button' className={btnClass}>
            <span className='icon-add_1 mr-2' />
            <span data-title={`Add revision ${checkedLength > 0 ? checkedLength : ''}`}>
              Use {checkedLength > 0 ? checkedLength : ''} selected planned document(s) as upload template
            </span>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Header
