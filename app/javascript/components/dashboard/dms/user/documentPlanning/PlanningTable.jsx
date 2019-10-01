import React, { useEffect } from 'react'
import classnames from 'classnames'
import moment from 'moment'
import { Table } from 'semantic-ui-react'
import DropDown from '../../../../../elements/DropDown'

function PlanningTable({ documents, checkedDocs, toggleDocs, type }) {
  // useEffect(() => { toggleDocs([]) }, [type])

  return (
    <div>
      <Table sortable striped className='main-table-block plannig-table'>
        <Table.Header>
          <Table.Row>
            
            <Table.HeaderCell className='dot-column'/>
            
            <Table.HeaderCell className='number-column'><span>No.</span></Table.HeaderCell>
            
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
            
            <Table.HeaderCell>
              <span className='divider' />
              <span>DOC-ID</span>
            </Table.HeaderCell>
            
            <Table.HeaderCell>
              <span className='divider' />
              <span>Document title</span>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {documents.map((doc, i) => (
            <Table.Row key={i}>
              <Table.Cell className='dot-column'>
                {type === 'uploaded'
                  ? <span className='icon-check_3 mr-3' />
                  : <span className='yellow-dot' />}
              </Table.Cell>

              <Table.Cell className='number-column'><div>{ i + 1 }.</div></Table.Cell>

              <Table.Cell className='dd-column'>
                <DropDown
                  dots={true}
                  className='dropdown-with-icon'
                >
                </DropDown>
              </Table.Cell>

              <Table.Cell className='table-checkbox'>
                <div>
                  <input
                    type='checkbox'
                    id={doc.id}
                    onChange={() => toggleDocs(checkedDocs, doc.id)}
                    checked={checkedDocs.includes(doc.id)}
                  />
                  <label htmlFor={doc.id}/>
                </div>
              </Table.Cell>

              <Table.Cell className='doc-id-column'>MWP-STX-EOS-LET-1234</Table.Cell>

              <Table.Cell>
                {doc.title || 'Undefined'}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className='d-flex'>
        <span className='ml-auto'>{documents.length} total documents</span>
      </div>
    </div>
  )
}

export default PlanningTable
