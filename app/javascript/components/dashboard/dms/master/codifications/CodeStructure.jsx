import React from 'react'
import classnames from 'classnames'
import { fields, projectInputs, placeholders, freeTextPlaceholders } from './Content'

function CodeStructure({ disabled }) {
  return (
    <div className='codification-codes-title-row'>
      {fields.map((el, i) => {
        const labelText = i === 0
          ? 'Change project code'
          : i === 1
            ? 'Code structure'
            : ''
        return (
          <React.Fragment key={i}>
            <div className={classnames('codification-codes-title-column', el.className, { disabled })}>
              {!disabled && <label>{labelText}</label>}
              <span className='codification-codes-title-column__title'>
                {el.title}
              </span>
              <div className='codification-codes-title-column__code'>
                {(() => {
                  if (i === 0) {
                    return (
                      <React.Fragment>
                        <input className='form-control' maxLength='1' placeholder='A' disabled={disabled} />
                        <input className='form-control' maxLength='1' placeholder='B' disabled={disabled} />
                        <input className='form-control' maxLength='1' placeholder='C' disabled={disabled} />
                      </React.Fragment>)
                  } else if (disabled) {
                    return projectInputs(el.symbols, disabled)
                  } else if (i === 6) {
                    return freeTextPlaceholders()
                  } else {
                    return placeholders(el)
                  }
                })()}
              </div>
            </div>
            {i !== 6 &&
              <div className={classnames('codification-codes-title-column', { disabled })}>
                {!disabled && <div />}
                <div className='codification-codes-title-column__title' />
                <span className='dash-symbol'>&mdash;</span>
              </div>}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default CodeStructure
