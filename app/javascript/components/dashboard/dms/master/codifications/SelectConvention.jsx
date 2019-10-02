import React, { useState } from 'react'
import classnames from 'classnames'
import NewModal from '../../../../../elements/Modal'
import { fields, projectInputs, placeholders, freeTextPlaceholders } from './Content'

function Content({ close, disabled }) {
  return (
    <div className='new-modal select-codification'>
      <div className='new-modal__header'>
        <h4>
          <div>Select a convention!</div>
          <div>This defines the codification of the managed documents</div>
        </h4>
      </div>
      <div className='new-modal__body'>
        <div className='modal-convetions-list'>
          <div>
            <div>Convention 1:</div>
            <div className='codification-codes-title-row'>
              {fields.map((el, i) => {
                return (
                  <React.Fragment key={i}>
                    <div className={classnames('codification-codes-title-column', el.className, { disabled })}>
                      <span className='codification-codes-title-column__title'>
                        {el.title}
                      </span>
                      <div className='codification-codes-title-column__code'>
                        {(() => {
                          if (disabled) {
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
          </div>
          
          <div>convention 2:</div>
          <div>convention 3:</div>
        </div>
      </div>
      <div className='new-modal__footer'>
        <button
          onClick={close}
          className='btn btn-purple'
        >
          OK
        </button>
      </div>
    </div>
  )
}

function SelectConvention() {
  const [open, toggleModal] = useState(true)

  return (
    <NewModal
      content={<Content close={toggleModal} />}
      open={open}
      onClose={() => toggleModal()}
    />
  )
}

export default SelectConvention
