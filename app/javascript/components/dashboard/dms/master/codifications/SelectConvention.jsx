import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import NewModal from '../../../../../elements/Modal'
import { placeholders, freeTextPlaceholders } from './Content'

const fields = [
  {
    title: 'Project code',
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

const fields2 = [
  {
    title: 'Originating company',
    className: 'originating_company',
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

const fields3 = [
  {
    title: '???',
    className: 'project',
    symbols: 3
  },
  {
    title: '???',
    className: 'company',
    symbols: 3
  },
  {
    title: '???',
    className: 'discipline',
    symbols: 3
  },
  {
    title: '???',
    className: 'document_type',
    symbols: 3
  },
  {
    title: '???',
    className: 'document_number',
    symbols: 4
  },
  {
    title: '???',
    className: 'revision',
    symbols: 2
  },
  {
    title: '???',
    className: 'free_text',
    symbols: 1
  }
]

function Row({ active, number, columns }) {
  return (
    <div className={classnames('convention-item', { active })}>
      <div className='convention-item__checkbox-zone'>
        <input
          defaultChecked={active}
          disabled={true}
          type='checkbox'
          component='input'
          className='form-control checkbox-input'
          id='check-conv'
        />
        <label htmlFor='check-conv' />
      </div>
      <div className='convention-item__body'>
        <div className='convention-item__title'>Convention {number}:</div>
        <div className='convention-item__main'>
          {columns.map((el, i) => {
            return (
              <div className={classnames('convention-item__main-column', el.className)} key={i}>
                <div className='convention-item__main-x-row'>
                  <div className='convention-item__main-x-row-column'>
                    <div>
                      {(() => {
                        if (i === 6) {
                          return freeTextPlaceholders()
                        } else {
                          return placeholders(el)
                        }
                      })()}
                    </div>
                  </div>
                  {i !== 6 && <span className='divider-symbol'>-</span>}
                </div>
                <div className='convention-item__main-titles-row-column'>
                  {el.title}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
function Content({ close }) {
  return (
    <div className='new-modal select-codification'>
      <div className='new-modal__header'>
        <h4>
          <div>Select a convention!</div>
          <div>This defines the codification of the managed documents</div>
        </h4>
      </div>
      <div className='new-modal__body modal-conventions-list'>
        <Row active={true} number='1' columns={fields}/>
        <Row active={false} number='2' columns={fields2}/>
        <Row active={false} number='3' columns={fields3} />

        <div className='conv-info'>
          <div>You can change and edit the convention under:</div>
          <div><b>Master Settings – Codification</b></div>
        </div>
      </div>
      <div className='new-modal__footer'>
        <button onClick={close} className='btn btn-purple'>
          OK
        </button>
      </div>
    </div>
  )
}

function SelectConvention({ projectCode }) {
  const [open, toggleModal] = useState(false)
  useEffect(() => {
    if (projectCode === null) {
      toggleModal(true)
    }
  }, [projectCode])

  return (
    <NewModal
      content={<Content close={() => toggleModal(false)} />}
      open={open}
      onClose={() => toggleModal()}
      closeOnDimmerClick={false}
    />
  )
}

export default SelectConvention
