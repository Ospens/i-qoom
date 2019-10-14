import React, { useState } from 'react'
import classnames from 'classnames'
import NewModal from '../../../../../elements/Modal'
import { fields, projectInputs, placeholders, freeTextPlaceholders } from './Content'

function Content({ disabled }) {
  return (
    <div className='new-modal'>
      <div className='new-modal__header'><h4>Default convention: Convention 1 </h4></div>
      <div className='new-modal__body'>
        This is the codification of convention 1
        <div className='codification-codes_modal'>
          {fields.map((el, i) => {
            return (
              <div className={classnames('codification-codes-title-column', el.className, { disabled })} key={i}>
                <div>
                  <div className='codification-codes-title-column__code'>
                    {(() => {
                      if (i === 0) {
                        return placeholders(el)
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
                <span className='codification-codes-title-column__title'>
                  {el.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <div className='new-modal__footer'><h4></h4></div>
    </div>
  )
}

function ModalInfo({  }) {
  const [modal, toggleModal] = useState(false)

  return (
    <NewModal
      content={<Content />}
      open={false}
      onClose={() => toggleModal(false)}
      closeOnDimmerClick={false}
    />
  )
}

export default ModalInfo
