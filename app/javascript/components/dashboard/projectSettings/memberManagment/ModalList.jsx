import React from 'react'
import DropDown from '../../../../elements/DropDown'

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
            <button type='button' className='btn with-icon pl-0' onClick={() => openForm()}>
              <span className='icon-add_1' />
              <span>{`Add a ${type}`}</span>
            </button>
          </li>
          {items.map((item, index) => (
            <li key={index} className='item-block'>
              <div>
                <div className='item-block__title'>{item.title}</div>
                {item.title !== 'Project Administrator' && item.title !== 'i-Qoom Admin' &&
                <DropDown
                  dots={true}
                  className='dropdown-with-icon dropright ml-2'
                  defaultValues={ddOptions(item)}
                />}
              </div>
            </li>
          ))}
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
