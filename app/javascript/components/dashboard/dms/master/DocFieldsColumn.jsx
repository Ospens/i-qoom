import React, { Component } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import DocFieldsElement from './DocFieldsElement'

export default class DocFieldsColumn extends Component {
  render() {
    const { fields, column } = this.props

    return (
      <Droppable droppableId={column}>
        {(provided, snapshot) => (
          <div
            className='col-6'
            ref={provided.innerRef}
            style={{  }}
            {...provided.droppableProps}
            style={{ /*backgroundColor: snapshot.draggingOverWith ? 'blue' : 'inherit'*/ }}
          >
            {fields.map((field, i) => {
              return (
                <DocFieldsElement
                  className='form-group'
                  key={i}
                  column={column}
                  field={field}
                  index={i}
                />
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    )
  }
}
