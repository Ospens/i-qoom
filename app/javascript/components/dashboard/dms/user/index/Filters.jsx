import React, { useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import DropDown from '../../../../../elements/DropDown'
import { toggleFilters } from '../../../../../actions/documentsActions'

function Filter({ mainTitle, values, change }) {
  return (
    <DropDown
      btnName={mainTitle}
      className='dms-topbar-menu__dropdown'
      btnClass='dms-topbar-menu__dropdown_button'
    >
      <ul>
        {values.map(({ title, value, checked }, i) => {
          const liClass = classnames('dms-topbar-menu__li-item', { checked })
          return (
            <li key={i} className={liClass}>
              <input
                type='checkbox'
                id={`${value}_${i}_${title}`}
                checked={checked}
                onChange={() => change(value)}
              />
              <label htmlFor={`${value}_${i}_${title}`} />
              <label
                className='dms-topbar-menu__label-text'
                htmlFor={`${value}_${i}_${title}`}
              >
                {title}
              </label>
            </li>
          )
        })}
      </ul>
    </DropDown>
  )
}

function Filters({ match: { params: { project_id } } }) {
  const dispatch = useDispatch()
  const discipline = useSelector(state => state.documents.discipline)
  const document_types = useSelector(state => state.documents.document_types)
  const originating_companies = useSelector(state => state.documents.originating_companies)

  const changeFilter = useCallback((type, value) => {
    dispatch(toggleFilters(project_id, { type, value }))
  }, [dispatch])

  
  return (
    <div className='dms-container__table-header'>
      <span className='mr-4 grey'>Show</span>
      <Filter
        mainTitle='Discipline'
        values={discipline}
        change={v => changeFilter('discipline', v)}
      />
      <Filter
        mainTitle='Originating companies'
        values={originating_companies}
        change={v => changeFilter('originating_companies', v)}
      />
      <Filter
        mainTitle='Document types'
        values={document_types}
        change={v => changeFilter('document_types', v)}
      />
    </div>
  )
}

export default withRouter(Filters)
