import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import moment from 'moment'
import { Table } from 'semantic-ui-react'
import DropDown from '../../../../../elements/DropDown'
import { columns, DtOptions } from '../../constants'
import { DropDownItems } from './elements'
import { downloadList } from '../../../../../actions/documentsActions'
import toggleArray from '../../../../../elements/toggleArray'

function DropDownValue({ fields, type }) {
  const field = fields.find(field => field.codification_kind === type)
  if (!field) return ''

  const value = field.document_field_values.find(v => v.selected) || {}
  return value.title
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

export default function Content({ projectId, checkedDocs, checkItem }) {
  const dispatch = useDispatch()
  const [formats, changeFormats] = useState([])
  const documents = useSelector(state => state.documents.allDocuments)
  const downloadFiles = useCallback(docId => { dispatch(downloadList(projectId, docId, formats)) }, [dispatch, formats])

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
              <Table.Row key={i}>

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

                <Table.Cell>
                  IT-IS-NOT-REA-DY_{doc.id}
                </Table.Cell>

                <Table.Cell className='title-cell'>
                  {doc.title || 'Undefined'}
                </Table.Cell>

                <Table.Cell className='td-files'>
                  <div>
                    <span className='icon-common-file-text1 black' />
                  </div>
                </Table.Cell>

                <Table.Cell className='td-files'>
                  <div>
                    <span className='icon-common-file-text_big'><span className='path1'></span><span className='path2'></span><span className='path3'></span><span className='path4'></span></span>
                  </div>
                </Table.Cell>

                <Table.Cell className='td-files'>
                  <div>
                    <span className='icon-Work-Office-Companies---Office-Files---office-file-pdf' />
                  </div>
                </Table.Cell>

                <Table.Cell className='td-date'>
                  {moment(doc.created_at).format('MMMM Do YYYY')}
                </Table.Cell>

                <Table.Cell>
                  <DropDownValue fields={doc.document_fields} type='originating_company'/>
                </Table.Cell>

                <Table.Cell>
                  <DropDownValue fields={doc.document_fields} type='document_type' />
                </Table.Cell>

                <Table.Cell>
                  <DropDownValue fields={doc.document_fields} type='discipline' />
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
