import React from 'react'
import SecondCodeStructure from './SecondCodeStructure'
import CodeStructure from './CodeStructure'
import CodificationTable from './CodificationTable'
import ModalInfo from './ModalInfo'

export const fields = [
    {
      title: 'Project',
      className: 'project',
      symbols: 3
    },
    {
      title: 'Company',
      className: 'company',
      symbols: 3
    },
    {
      title: 'Discipline',
      className: 'discipline',
      symbols: 3
    },
    {
      title: 'Document type',
      className: 'document_type',
      symbols: 3
    },
    {
      title: 'Document number',
      className: 'document_number',
      symbols: 4
    },
    {
      title: 'Revision',
      className: 'revision',
      symbols: 3
    },
    {
      title: 'Free text',
      className: 'free_text',
      symbols: 1
    }
  ]

export const projectInputs = (count = 3 , disabled = false) => (
  <React.Fragment>
    {[...Array(count)].map((_, i) => (
      <input className='form-control' maxLength='1' placeholder='X' disabled={disabled} key={i}/>
    ))}
  </React.Fragment>
)

export const placeholders = el => (
  <React.Fragment>
    {[...Array(el.symbols)].map((el, i) => (
      <span key={i}>X</span>
    ))}
  </React.Fragment>
)

export const freeTextPlaceholders = el => (
  <React.Fragment>
    <span />
    <span>...</span>
    <span />
  </React.Fragment>
)

function Content({ current }) {
  return (
    <div className='dms-content bordered'>
      <ModalInfo />
      <div className='dms-content__header'>
        <h4>Convention 1 - active</h4>
        <label>Administration codes for document codification</label>
      </div>
      {/* TODO: make switch for number of convention */}
      <div className='content-body'>
        {/*current ? <CodeStructure /> : <SecondCodeStructure />*/}
        <CodeStructure />
        <CodificationTable />
      </div>
    </div>
  )
}

export default Content
