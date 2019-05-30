import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import DropDown from '../../../../elements/DropDown'
import classnames from 'classnames'
import { actionDDitems } from '../constants'

export default class DocFieldsElement extends Component {
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
            <div className='form-group'>
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
          </div>
        )}
      </Draggable>
    )
  }
}
