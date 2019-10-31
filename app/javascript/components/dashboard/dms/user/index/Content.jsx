import React, { useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import moment from 'moment'
import DropDown from '../../../../../elements/DropDown'
import { columns } from '../../constants'
import { DropDownItems } from './elements'
import Filters from './Filters'
import DownloadDocuments from './DownloadDocuments'
import { downloadList, downloadDetailFile, downloadNativeFile } from '../../../../../actions/documentsActions'
import toggleArray from '../../../../../elements/toggleArray'
import { toggleSearchFilters, sortTable } from '../../../../../actions/documentsActions'
import useDebounce from '../../../../../elements/useDebounce'

function Content({ projectId, checkedDocs, checkItem }) {
  const dispatch = useDispatch()
  const [formats, changeFormats] = useState([])
  const [searchTerm, setSearchTerm] = useState({})
  const documents = useSelector(state => state.documents.allDocuments)
  const sortBy = useSelector(state => state.documents.sortBy)
  const filters = useSelector(state => state.documents.searchFilters)
  const loading = useSelector(state => state.documents.loading)
  const downloadFiles = useCallback(docId => { dispatch(downloadList(projectId, docId, formats)) }, [dispatch, formats])
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const downloadByOption = useCallback((docId, types) => {
    if (types.includes('native')) {
      dispatch(downloadNativeFile(docId))
    }
    if (types.includes('details')) {
      dispatch(downloadDetailFile(docId))
    }
  } , [dispatch])

  const toggleFormats = useCallback((checked, value) => { changeFormats(toggleArray(checked, value)) }, [formats])
  
  const toggleSort = useCallback(column => { dispatch(sortTable(column)) }, [dispatch])
  
  const changeFilters = useCallback((title, value) => {
    let newVal = { ...filters }
    const index = newVal.filters.findIndex(el => el.title === title)
    if (title === 'Document title') {
      newVal = { ...newVal, document_title: value }
    } else if (value.length === 0) {
      newVal.filters = newVal.filters.filter((_, i) => i !== index)
    } else if (index < 0) {
      newVal.filters.push({ title, value })
    } else {
      newVal.filters[index] = { title, value }
    }
    setSearchTerm(newVal)
  }, [filters])

  useEffect(() => {
    dispatch(toggleSearchFilters(projectId, debouncedSearchTerm))
  }, [dispatch, debouncedSearchTerm, projectId])

  return (
    <div className='dms-content'>
      <Filters />
      <div className='overview-table-contaniner'>
        {loading &&
        <div className='loader-container'>
          <div className='lds-ring'><div></div><div></div><div></div><div></div></div>
        </div>}
        <div className='Rtable'>
          <div className='Rtable__header'>
            <div className='Rtable-row'>
              <div className='Rtable__row-cell' />
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
            {documents.map((doc, i) => {
              return (
                <div key={i} className={classnames('Rtable-row', { 'Rtable-row__checked': checkedDocs.includes(doc.id) })}>
                  <div className='Rtable__row-cell table-checkbox'>
                    <DropDown
                      dots={true}
                      className='dropdown-with-icon'
                    >
                      <DropDownItems
                        key='DropDownItems__Content'
                        id={doc.id}
                        projectId={projectId}
                        downloadFiles={() => downloadFiles(doc.id)}
                        formats={formats}
                        toggleFormats={v => toggleFormats(formats, v)}
                      />
                    </DropDown>
                  </div>

                  <div className='Rtable__row-cell table-checkbox'>
                    <input
                      type='checkbox' id={doc.id}
                      onChange={() => checkItem(doc.id)}
                      checked={checkedDocs.includes(doc.id)}
                    />
                    <label htmlFor={doc.id} />
                  </div>

                  <div className='Rtable__row-cell doc-id-cell'>
                    <Link to={`/dashboard/projects/${projectId}/documents/${doc.id}`}>
                      {doc.codification_string}
                    </Link>
                  </div>

                  <div className='Rtable__row-cell title-cell'>
                    <Link to={`/dashboard/projects/${projectId}/documents/${doc.id}`}>
                      {doc.title}
                    </Link>
                  </div>

                  <div className='Rtable__row-cell td-files'>
                    <DownloadDocuments
                      downloadFiles={downloadFiles}
                      docId={doc.id}
                      downloadByOption={types => downloadByOption(doc.id, types)}
                    />
                  </div>

                  <div className='Rtable__row-cell td-files'>
                    <div>
                      <span className='icon-common-file-text_big'>
                        <span className='path1' />
                        <span className='path2' />
                        <span className='path3' />
                        <span className='path4' />
                      </span>
                    </div>
                  </div>

                  <div className='Rtable__row-cell td-files'>
                    {/* <div>
                    <span className='icon-Work-Office-Companies---Office-Files---office-file-pdf' />
                    </div> */}
                  </div>

                  <div className='Rtable__row-cell td-date'>
                    {moment(doc.revision_date).format('M.D.YYYY')}
                  </div>

                  <div className='Rtable__row-cell'>
                    {doc.discipline}
                  </div>

                  <div className='Rtable__row-cell'>
                    {doc.document_type}
                  </div>

                  <div className='Rtable__row-cell'>
                    {doc.originating_company}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='d-flex'>
          <span className={classnames('grey', { 'ml-auto': documents.length > 0 }, { 'mx-auto': documents.length < 1 })}>{documents.length} total documents</span>
        </div>
      </div>
    </div>
  )
}

export default Content
