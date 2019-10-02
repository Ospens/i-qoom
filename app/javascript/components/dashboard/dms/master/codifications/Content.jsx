import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import SecondCodeStructure from './SecondCodeStructure'
import CodeStructure from './CodeStructure'
import CodificationTable from './CodificationTable'
import ModalInfo from './ModalInfo'
import { startEditConvention } from '../../../../../actions/conventionActions'

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

function Content({ match: { params: { project_id } } }) {
  const dispatch = useDispatch()
  useEffect(() => { dispatch(startEditConvention(project_id)) }, [])

  return (
    <div className='dms-content'>
      <ModalInfo />
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

export default withRouter(Content)
