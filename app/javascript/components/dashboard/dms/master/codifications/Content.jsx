import React from 'react'
import { useSelector } from 'react-redux'
import CodeStructure from './CodeStructure'
import CodificationTable from './CodificationTable'
import SelectConvention from './SelectConvention'
import WellDone from './WellDone'

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
      symbols: 2
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
    <span>...</span>
    <span />
  </React.Fragment>
)

function Content() {
  const project_code = useSelector(state => state.projects.current.project_code)

  return (
    <div className='dms-content'>
      {/* <ModalInfo /> */}
      <WellDone projectCode={project_code}/>
      <SelectConvention projectCode={project_code}/>
      <div className='dms-content__header'>
        <h4>Convention 1 - <span className='green'>active</span></h4>
      </div>
      {/* TODO: make switch for number of convention */}
      <div className='content-body'>
        <label>Administration codes for document codification</label>
        {/*current ? <CodeStructure /> : <SecondCodeStructure />*/}
        <CodeStructure />
        <CodificationTable />
      </div>
    </div>
  )
}

export default Content
