import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import DocFieldsElement from './DocFieldsElement'

export const DocFieldsColumn = ({ fields, column, openInputForm }) => {
  return (
    <Droppable droppableId={column}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          style={{  }}
          {...provided.droppableProps}
        >
          {fields.map((field, i) => {
            return (
              <DocFieldsElement
                className='form-group'
                key={i}
                column={column}
                field={field}
                index={i}
                openInputForm={openInputForm}
              />
            )
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
