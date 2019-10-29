import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import classnames from 'classnames'
import { startFetchDocuments } from '../../../../../actions/documentsActions'
import useDebounce from '../../../../../elements/useDebounce'

function Header({ checkedDocs }) {
  const dispatch = useDispatch()
  const { project_id } = useParams()
  const checkedLength = checkedDocs.length
  const btnClass = classnames('with-icon', { 'disable': checkedLength === 0 })
  const [searchTerm, setSearchTerm] = useState(undefined)
  // const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  
  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      // setIsSearching(true)
      dispatch(startFetchDocuments(project_id, { search: debouncedSearchTerm })).then(results => {
        // setIsSearching(false)
      })
    }
  }, [debouncedSearchTerm, project_id])

  return (
    <div className='dms-header'>
      <ul className='buttons-with-icons-list'>
        <li>
          <Link
            className='d-flex align-items-center'
            to={`/dashboard/projects/${project_id}/documents/new/`}
          >
            <span className='icon-add_1 mr-2' />
            <span data-title='Create new Document'>Create new Document</span>
          </Link>
        </li>
        <li>
          <button type='button' className={btnClass}>
            <span className='icon-Revise_1 mr-2' />
            <span data-title={`Add revision ${checkedLength > 0 ? checkedLength : ''}`}>
              Add revision {checkedLength > 0 ? checkedLength : ''}
            </span>
          </button>
        </li>
        <li>
          <button type='button' className={btnClass}>
            <span className='icon-common-file-edit mr-2' />
            <span className='head-button__gray-text' data-title={`Edit document {checkedLength > 0 ? checkedLength : ''}`}>
              Edit document {checkedLength > 0 ? checkedLength : ''}
            </span>
          </button>
        </li>
        <li className='search-item'>
          <input
            type='text'
            className='search-input ml-auto'
            placeholder='Search'
            onChange={e => setSearchTerm(e.target.value)}
          />
        </li>
      </ul>
    </div>
  )
}

export default Header
