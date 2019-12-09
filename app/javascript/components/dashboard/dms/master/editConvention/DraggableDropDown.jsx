import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import {
  formValueSelector,
  Field,
  change
} from 'redux-form'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import InputField from '../../../../../elements/InputField'
import DropDown from '../../../../../elements/DropDown'

const portal = document.createElement('div')
portal.classList.add('draggable-portal')


const options = (index, addNewSection, copySection, removeSection) => [
  {
    title: 'New section above',
    icon: 'icon-upload-menu2',
    onClick: (e => addNewSection(e, index))
  },
  {
    title: 'New section below',
    icon: 'icon-upload-menu1',
    onClick: (e => addNewSection(e, index + 1))
  },
  {
    title: 'Copy',
    icon: 'icon-common-file-double-1',
    onClick: (() => copySection(index))
  },
  {
    title: 'Delete',
    icon: 'icon-bin-1',
    onClick: (() => removeSection(index))
  }
]

function DropDownElement({
  index, addNewSection, copySection, removeSection, input: { name }
}) {
  document.body.appendChild(portal)
  useEffect(() => {
    document.body.appendChild(portal)
  }, [])

  return (
    <Draggable draggableId={`field_${index}`} index={index}>
      {(provided, snapshot) => {
        const usePortal = snapshot.isDragging

        const child = (
          <div
            className={classnames('draggable-container', { dragging: snapshot.isDragging })}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="dropdown-section">
              <Field
                component={InputField}
                name={`${name}.value`}
                className="dropdown-section__input-block"
              />
              <DropDown
                dots
                className="dropdown-with-icon dropleft ml-2"
                defaultValues={options(index, addNewSection, copySection, removeSection)}
              />
            </div>
          </div>
        )
        if (!usePortal) return child

        return ReactDOM.createPortal(child, portal)
      }}
    </Draggable>
  )
}


function DropDownColumn({ fields, ...props }) {
  return (
    <Droppable droppableId="column_1">
      {provided => (
        <div
          className="dropdown-section-block"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {fields.map((field, i) => (
            <Field
              {...props}
              key={field}
              name={field}
              component={DropDownElement}
              index={i}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

const selector = formValueSelector('convention_input_form')

function DraggableDropDown({ fields, ...props }) {
  const dispatch = useDispatch()
  const newSection = useSelector(state => selector(state, 'new_section'))
  const copySection = useCallback(index => {
    const newValue = fields.get(index)
    fields.splice(index, 0, newValue)
  }, [fields])
  const removeSection = useCallback(index => {
    fields.remove(index)
  }, [fields])
  const addNewSection = useCallback((e, index) => {
    e.preventDefault()
    if (index === undefined && newSection.length < 1) return

    const position = index > -1 ? index : fields.length
    const newValue = {
      value: newSection,
      title: ''
    }
    fields.splice(position, 0, newValue)
    dispatch(change('convention_input_form', 'new_section', ''))
  }, [dispatch, fields, newSection])

  const onDragEnd = useCallback(result => {
    const { destination, source } = result
    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    fields.move(source.index, destination.index)
  }, [fields])
  return (
    <React.Fragment>
      <div>
        <label className={classnames({ 'form-group': fields.length < 1 })}>
          Define selections
        </label>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <DropDownColumn
          {...props}
          fields={fields}
          addNewSection={addNewSection}
          removeSection={removeSection}
          copySection={copySection}
        />
        <div className="new-dropdown-section-block">
          <div><label>Selections</label></div>
          <div className="new-dropdown-section">
            <Field
              component={InputField}
              id="new_section"
              name="new_section"
              placeholder={`Section ${fields.length + 1}`}
              onBlur={e => addNewSection(e)}
            />
          </div>
        </div>
      </DragDropContext>
    </React.Fragment>
  )
}

export default DraggableDropDown
