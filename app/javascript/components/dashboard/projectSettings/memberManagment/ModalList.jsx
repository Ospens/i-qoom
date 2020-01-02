import React from 'react'
import classnames from 'classnames'
import DropDown from '../../../../elements/DropDown'

const mainVals = ['Project Administrator', 'i-Qoom Admin']

function ModalList({ closeModal, items, openForm, removeItem, type }) {
  const ddOptions = item => [
    {
      title: `Rename ${type}`,
      icon: 'icon-pencil-write',
      onClick: () => openForm(item),
    },
    {
      title: 'Delete',
      icon: 'icon-bin-1',
      onClick: () => removeItem(item.id),
    }
  ]
  return (
    <div className='new-modal'>
      <div className='new-modal__header'>
        <h4>{`${type.replace(/^\w/, c => c.toUpperCase())} list`}</h4>
      </div>
      <div className='new-modal__body'>
        <ul>
          <li>
            <button type='button' className='btn button-with-icon pl-0' onClick={() => openForm()}>
              <span className='icon-add_1' />
              <span>{`Add a ${type}`}</span>
            </button>
          </li>
          {items.map((item, index) => {
            const isMain = mainVals.includes(item.title)
            return (
              <li key={index} className='item-block'>
                <div>
                  <div className={classnames('item-block__title', { 'bold': isMain })}>{item.title}</div>
                  {!isMain &&
                  <DropDown
                    dots={true}
                    className='dropdown-with-icon dropright ml-2'
                    defaultValues={ddOptions(item)}
                  />}
                </div>
              </li>
            )})}
        </ul>
      </div>
      <div className='new-modal__footer'>
        <button type='submit' className='btn btn-purple' onClick={closeModal}>
          Done
        </button>
      </div>
    </div>
  )
}

export default ModalList
