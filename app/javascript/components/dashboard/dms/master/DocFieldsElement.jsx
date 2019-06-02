import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import DropDown from '../../../../elements/DropDown'
import classnames from 'classnames'
import { actionDDitems } from '../constants'

export default class DocFieldsElement extends Component {


  renderDocIdFields = () => (
    <React.Fragment>
      <div className="draggable-container">
        <div className='form-group'>
          <label>Pleace select or generate Document ID</label>

          <div className='input-container'>
            <div className="document-id-code">
              <input
                className='form-control'
                type='text'
                name='document_id'
                id='document_id'
                placeholder='MWP'
                disabled
              />
            </div>
            <div className="document-id-code">
              <input
                className='form-control'
                type='text'
                name='document_id'
                id='document_id'
                placeholder='STX'
                disabled
              />
            </div>
            <div className="document-id-code">
              <input
                className='form-control'
                type='text'
                name='document_id'
                id='document_id'
                placeholder='EOS'
                disabled
              />
            </div>
            <div className="document-id-code">
              <input
                className='form-control'
                type='text'
                name='document_id'
                id='document_id'
                placeholder='XXX'
                disabled
              />
            </div>
            <div className="document-id-code">
              <input
                className='form-control'
                type='text'
                name='document_id'
                id='document_id'
                placeholder='XXXX'
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div className="draggable-container">
        <div className='form-group'>
          <div className='checkbox-field justify-content-center'>
            <input
              name='generate_id'
              id='generate_id'
              type='checkbox'
              className='form-check-input'
            />
            <label className='form-check-label mr-2' htmlFor='generate_id' />
            <span>Generate Document ID through file code</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  )

  render() {
    const { index, field, column } = this.props

    return (
      <Draggable draggableId={`column_${column}_${index}`} index={index}>
        {(provided, snapshot) => (
          <div
            className={classnames("draggable-container", { 'dragging': snapshot.isDragging })}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {field.title === 'test'
              ? this.renderDocIdFields()
              : <div className='form-group'>
                  <div className="d-flex">
                    <DropDown
                      dots={true}
                      className='dropdown-with-icon form-group_drop-down'
                      defaultValues={actionDDitems}
                    />
                    <label htmlFor="document_titile">{field.title}</label>
                  </div>
                  <input
                    className='form-control'
                    type='text'
                    name='document_titile'
                    id='document_titile'
                    placeholder='Title'
                  />
                  <button type='button' className="btn edit-button">
                    Edit
                </button>
              </div>
              }
          </div>
        )}
      </Draggable>
    )
  }
}
