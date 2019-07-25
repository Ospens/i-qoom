import React, { Component } from 'react'
import classnames from 'classnames'
import DMSLayout from '../../DMSLayout'
import DmsSideBar from '../../DmsSideBar'
import CodificationTable from './CodificationTable'

const fields = [
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
    symbols: 0
  }
]

export class Codifications extends Component {

  renderProjectInputs = () => (
    <React.Fragment>
      <input className='form-control' maxLength='1' placeholder='X' />
      <input className='form-control' maxLength='1' placeholder='X' />
      <input className='form-control' maxLength='1' placeholder='X' />
    </React.Fragment>
  )

  renderPlaceholders = el => (
    <React.Fragment>
      {[...Array(el.symbols)].map((el, i) => (
        <span key={i}>X</span>
      ))}
    </React.Fragment>
  )

  renderFreeTextPlaceholders = el => (
    <React.Fragment>
      <span />
      <span>...</span>
      <span />
    </React.Fragment>
  )

  renderCodeStructure = () => {
    return (
      <div className='codification-codes-title-row p-4'>
        {fields.map((el, i) => {
          const labelText = i === 0
            ? 'Change project code'
            : i === 1
              ? 'Code structure'
              : ''
          return (
            <React.Fragment key={i}>
              <div className={classnames('codification-codes-title-column', el.className)}>
                <label>{labelText}</label>
                <span className='codification-codes-title-column__title'>
                  {el.title}
                </span>
                <div className='codification-codes-title-column__code'>
                  {i === 0 && this.renderProjectInputs()}
                  {i !== 0 && this.renderPlaceholders(el)}
                  {i === 6 && this.renderFreeTextPlaceholders()}
                </div>
              </div>
              {i !== 6 &&
                <div className='codification-codes-title-column'>
                  <div />
                  <div className='codification-codes-title-column__title' />
                  <span className='dash-symbol'>&mdash;</span>
                </div>}
            </React.Fragment>
          )
        })}
      </div>
    )
  }

  renderSecondCodeStructure = () => {
    return (
      <div className='codification-second-conv'>
        <div className='codification-second-conv__project-block px-4'>
          <div className='codification-second-conv__left-block'>
            <span className='codification-codes-title-column__title'>
              Project
            </span>
            <div className='codification-codes-title-column__code'>
              {this.renderProjectInputs()}
            </div>
          </div>
          <div className='codification-second-conv__right-block'>
            <span>
              You made changes to the project codification. This will influence
              all future documents. Are you sure?
            </span>
            <div className="codification-second-conv__right-block_buttons">
              <button className="btn btn-white-blue">
                Discard
              </button>
              <button className="btn btn-purple">
                Apply changes
              </button>
            </div>
          </div>
        </div>
        <div className='codification-codes-title-row second-convention p-4'>
          {fields.map((el, i) => {
            const labelText = i === 0
              ? 'Change project code'
              : i === 1
                ? 'Code structure'
                : ''
            return (
              <React.Fragment key={i}>
                <div className={classnames('codification-codes-title-column', el.className)}>
                  <label>{labelText}</label>
                  <span className='codification-codes-title-column__title'>
                    {el.title}
                  </span>
                  <div className='codification-codes-title-column__code'>
                    {i === 0 && this.renderProjectInputs()}
                    {i !== 0 && this.renderPlaceholders(el)}
                    {i === 6 && this.renderFreeTextPlaceholders()}
                  </div>
                </div>
                {i !== 6 &&
                  <div className='codification-codes-title-column'>
                    <div />
                    <div className='codification-codes-title-column__title' />
                    <span className='dash-symbol'>&mdash;</span>
                  </div>}
              </React.Fragment>
            )
          })}
        </div>        
      </div>
    )
  }

  renderContent = () => {
    return (
      <div className='dms-content bordered'>
        <div className='dms-content__header p-4'>
          <h4>Convention 1 - active</h4>
          <label>Administration codes for document codification</label>
        </div>
          {/* TODO: make switch for number of convention */}
        {this.renderSecondCodeStructure()}
        <CodificationTable />
      </div>
    )
  }

  render() {
    return (
      <DMSLayout
        sidebar={<DmsSideBar />}
        content={this.renderContent()}
      />
    )
  }
}

export default Codifications
