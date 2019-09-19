import React from 'react'
import classnames from 'classnames'
import { fields, projectInputs, placeholders, freeTextPlaceholders } from './Content'

function SecondCodeStructure() {
  return (
    <div className='codification-second-conv'>
      <div className='codification-second-conv__project-block'>
        <div className='codification-second-conv__left-block'>
          <span className='codification-codes-title-column__title'>
            Project
          </span>
          <div className='codification-codes-title-column__code'>
            {projectInputs()}
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
      <div className='codification-codes-title-row second-convention py-4'>
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
                  {i === 0 && projectInputs()}
                  {i !== 0 && placeholders(el)}
                  {i === 6 && freeTextPlaceholders()}
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

export default SecondCodeStructure
