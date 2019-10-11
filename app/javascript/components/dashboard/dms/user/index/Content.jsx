import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import moment from 'moment'
import { Table } from 'semantic-ui-react'
import DropDown from '../../../../../elements/DropDown'
import { columns, DtOptions } from '../../constants'
import { DropDownItems } from './elements'
import { downloadList, downloadDetailFile, downloadNativeFile } from '../../../../../actions/documentsActions'
import toggleArray from '../../../../../elements/toggleArray'

function DropDownValue({ fields, type }) {
  const field = fields.find(field => field.codification_kind === type)
  if (!field) return ''

  const value = field.document_field_values.find(v => v.selected) || {}
  return value.title
}

function DownloadDocuments({ docId, downloadByOption }) {
  const [types, setTypes] = useState([])

  const toggleTypes = useCallback((checked, value) => {
    setTypes(toggleArray(checked, value))
  }, [types])
  
  return (
    <DropDown
      className='dropdown-submenu show'
      btnClass='dropdown-submenu'
      btnComponent={<span className='icon-common-file-text-download black' />}
    >
      <div className='download-files-dropdown'>
        <div className='download-files-dropdown__title'>
          <span>Download</span>
        </div>
        <div className='download-files-dropdown__list'>
          <div className='download-files-dropdown__list_item'>
            <input 
              type='checkbox'
              checked={types.includes('native')}
              id={`download_native_file_${docId}`}
              onChange={() => toggleTypes(types, 'native')}
            />
            <label htmlFor={`download_native_file_${docId}`} />
            <label htmlFor={`download_native_file_${docId}`} className='label-with-icon'>
              <span className='icon-common-file-text_big mx-2'><span className='path1'></span><span className='path2'></span><span className='path3'></span><span className='path4'></span></span>
              Native file title
            </label>
          </div>
          <div className='download-files-dropdown__list_item'>
            <input
              type='checkbox'
              checked={types.includes('details')}
              id={`download_details_${docId}`}
              onChange={() => toggleTypes(types, 'details')}
            />
            <label htmlFor={`download_details_${docId}`} />
            <label htmlFor={`download_details_${docId}`} className='label-with-icon'>
              <span className='icon-common-file-text-download mx-2' />
              Download details
            </label>
          </div>
        </div>
        <div className='button-block'>
          <button type='button' className='btn btn-white cancel-button'>Cancel</button>
          <button
            type='button'
            onClick={() => {
              downloadByOption(types)
              setTypes([])
            }}
            disabled={types.length < 1}
            className='btn btn-white-blue'
          >
            Download files
          </button>
        </div>
      </div>
    </DropDown>
  )
}

function renderTableHeader() {
  const checkedDocTypes = []
  return (
    <div className='dms-container__table-header'>
      <span className='mr-4 grey'>Show</span>
      <DropDown
        btnName='Documents Types'
        btnClass='dms-topbar-menu__dropdown'
      >
        <ul>
          {DtOptions.map(({ key, title }, i) => {
            const checked = checkedDocTypes.includes(key)
            const liClass = classnames('dms-topbar-menu__li-item', { checked })

            return (
              <li key={i} className={liClass}>
                <input
                  type='checkbox'
                  id={`dt_${key}`}
                  // checked={checked}
                  // onChange={() => checkItem('checkedDocTypes', checkedDocTypes, key)}
                />
                <label htmlFor={`dt_${key}`} />
                <span htmlFor={`dt_${key}`}>{title}</span>
              </li>
            )
          })}
          <li className='dms-topbar-menu__li-item'>
            <span>Variation Orders</span>
          </li>
          <li className='dms-topbar-menu__li-item'>
            <span>Vorem</span>
          </li>
        </ul>
      </DropDown>

      <DropDown
        btnName='Documents Types'
        btnClass='dms-topbar-menu__dropdown'
      >
        <ul>
          <li>
            <span>Contractor</span>
          </li>
        </ul>
      </DropDown>

      <DropDown
        btnName='Discipline'
        btnClass='dms-topbar-menu__dropdown'
      >
        <ul>
          <li>
            <span>Contractor</span>
          </li>
        </ul>
      </DropDown>

      <DropDown
        btnName='Quality Reports'
        btnClass='dms-topbar-menu__dropdown'
      >
        <ul>
          <li>
            <span>Contractor</span>
          </li>
        </ul>
      </DropDown>

      <DropDown
        btnName='Relevance'
        btnClass='dms-topbar-menu__dropdown'
      >
        <ul>
          <li>
            <span>Contractor</span>
          </li>
        </ul>
      </DropDown>

      <DropDown
        btnName='Reports'
        btnClass='dms-topbar-menu__dropdown'
      >
        <ul>
          <li>
            <span>Contractor</span>
          </li>
        </ul>
      </DropDown>
    </div>
  )
}

function Content({ projectId, checkedDocs, checkItem }) {
  const dispatch = useDispatch()
  const [formats, changeFormats] = useState([])
  const documents = useSelector(state => state.documents.allDocuments)
  const downloadFiles = useCallback(docId => { dispatch(downloadList(projectId, docId, formats)) }, [dispatch, formats])

  const downloadByOption = useCallback((docId, types) => {
    if (types.includes('native')) {
      dispatch(downloadNativeFile(docId))
    }
    if (types.includes('details')) {
      dispatch(downloadDetailFile(docId))
    }
  } , [dispatch])

  const toggleFormats = useCallback((checked, value) => {
    changeFormats(toggleArray(checked, value))
  }, [formats])
  
  return (
    <div className='dms-content'>
      {renderTableHeader()}
      <div className='overview-table-contaniner'>
        <Table sortable striped className='main-table-block'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell className='table-checkbox'>
                <div>
                  <input
                    type='checkbox'
                    id='check_all'
                  />
                  <label htmlFor='check_all' />
                </div>
              </Table.HeaderCell>
              {columns.map(({ title, divider }, i) => (
                <Table.HeaderCell key={i}>
                  {divider && <span className='divider' />}
                  <span>{title}</span>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {documents.map((doc, i) => (
              <Table.Row key={i} className={classnames({ 'checked-document-row': checkedDocs.includes(doc.id) })}>

                <Table.Cell>
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
                </Table.Cell>

                <Table.Cell className='table-checkbox'>
                  <div>
                    <input type='checkbox' id={doc.id} />
                    <label
                      htmlFor={doc.id}
                      onClick={() => checkItem('checkedDocs', checkedDocs, doc.id)}
                    />
                  </div>
                </Table.Cell>

                <Table.Cell className='doc-id-cell'>
                  <Link to={`/dashboard/projects/${projectId}/documents/${doc.id}`}>
                    {doc.codification_string}
                  </Link>
                </Table.Cell>

                <Table.Cell className='title-cell'>
                  <Link
                    to={`/dashboard/projects/${projectId}/documents/${doc.id}`}
                  >
                    {doc.title || 'Undefined'}
                  </Link>
                </Table.Cell>

                <Table.Cell className='td-files'>
                  <DownloadDocuments
                    downloadFiles={downloadFiles}
                    docId={doc.id}
                    downloadByOption={types => downloadByOption(doc.id, types)}
                  />
                </Table.Cell>

                <Table.Cell className='td-files'>
                  <div>
                    <span className='icon-common-file-text_big'><span className='path1'></span><span className='path2'></span><span className='path3'></span><span className='path4'></span></span>
                  </div>
                </Table.Cell>

                <Table.Cell className='td-files'>
                  {/* <div>
                    <span className='icon-Work-Office-Companies---Office-Files---office-file-pdf' />
                  </div> */}
                </Table.Cell>

                <Table.Cell className='td-date'>
                  {moment(doc.created_at).format('M.D.YYYY')}
                </Table.Cell>

                <Table.Cell>
                  <DropDownValue fields={doc.document_fields} type='discipline' />
                </Table.Cell>

                <Table.Cell>
                  <DropDownValue fields={doc.document_fields} type='document_type' />
                </Table.Cell>

                <Table.Cell>
                  <DropDownValue fields={doc.document_fields} type='originating_company' />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className='d-flex'>
          <span className={classnames('grey', { 'ml-auto': documents.length > 0 }, { 'mx-auto': documents.length < 1 })}>{documents.length} total documents</span>
        </div>
      </div>
    </div>
  )
}

export default Content