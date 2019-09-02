import React from 'react'
import DropDown from '../../../../elements/DropDown'

function ModalList({ closeModal, items, openForm, removeItem, type }) {
  return (
    <div className='new-modal'>
      <div className='new-modal__header'>
        <h4>{`${type.replace(/^\w/, c => c.toUpperCase())} list`}</h4>
      </div>
      <div className='new-modal__body'>
        <ul>
          <li>
            <button type='button' className='btn with-icon pl-0' onClick={() => openForm()}>
              <i className='svg-icon blue-plus-icon' />
              <span>{`Add a ${type}`}</span>
            </button>
          </li>
          {items.map((item, index) => (
            <li key={index} className='item-block'>
              <div>
                <div className='item-block__title'>{item.title}</div>
                <DropDown
                  dots={true}
                  className='dropdown-with-icon dropright ml-2'
                >
                  <React.Fragment>
                    <li className='dropdown-item' onClick={() => openForm(item)}>
                      <i className='svg-icon gray mr-2 pencil-icon' />
                      <span className='item-text'>{`Rename ${type}`}</span>
                    </li>
                    <li className='dropdown-item' onClick={() => removeItem(item.id)}>
                      <i className='svg-icon gray mr-2 trash-icon' />
                      <span className='item-text'>Delete</span>
                    </li>
                  </React.Fragment>
                </DropDown>
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
