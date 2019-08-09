import React from 'react'
import { FieldArray, Field } from 'redux-form'
import { Droppable } from 'react-beautiful-dnd'
import DocFieldsElement from './DocFieldsElement'

const docVlues = row => {
  if (!row) return
  if (row.kind === 'select_field' && row.document_field_values.length < 1) {
    return 'Add some value'
  } else {
    return undefined
  }
}

const DroppableColumn = ({ fields, column, openInputForm, disabled }) => {
  return (
    <Droppable droppableId={column}>
      {provided => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {fields.map((field, i) => {
            return (
              <Field
                key={i}
                name={field}
                component={DocFieldsElement}
                column={column}
                index={i}
                disabled={disabled}
                openInputForm={openInputForm}
                removeField={() => fields.remove(i)}
                validate={[docVlues]}
              />
            )
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export const DocFieldsColumn = (props) => {
  return (
    <FieldArray
      {...props}
      name={`column_${props.column}`}
      component={DroppableColumn}
    />
  )
}
