import React, { Component } from 'react'
import classnames from 'classnames'
import ReactSVG from 'react-svg'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import DropDown from '../../../../../elements/DropDown'
import dots from '../../../../../images/dots-horizontal'
import trashIcon from '../../../../../images/trash_bucket'
import sectionBelow from '../../../../../images/upload-menu1'
import sectionAbove from '../../../../../images/upload-menu2'
import copyIcon from '../../../../../images/folder-empty'

const newDDElementOtions = [
  {
    title: 'New section above',
    icon: sectionAbove,
    onClick: (() => console.log('ssfdsf'))
  },
  {
    title: 'New section below',
    icon: sectionBelow
  },
  {
    title: 'Copy',
    icon: copyIcon
  },
  {
    title: 'Delete',
    icon: trashIcon
  }
]
class DropDownElement extends Component {

  render() {
    const { index, field } = this.props

    return (
      <Draggable draggableId={`field_${index}`} index={index}>
        {(provided, snapshot) => (
          <div
            className={classnames("draggable-container", { 'dragging': snapshot.isDragging })}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="dropdown-section">
              <input
                type='text'
                className='form-control'
                value={field.value}
                onChange={() => (console.log('change me'))}
              />
              <DropDown
                btnComponent={
                  <ReactSVG
                    className='svg-container'
                    svgStyle={{ height: 25, width: 25, marginLeft: 10 }}
                    src={dots}
                  />
                }
                className='dropdown-with-icon dropleft'
                defaultValues={newDDElementOtions}
              />
            </div>
          </div>
        )}
      </Draggable>
    )
  }
}

class DropDownColumn extends Component {
  render() {
    const { sections, column } = this.props

    return (
      <Droppable droppableId='column_1'>
        {provided => (
          <div
            className='dropdown-section-block form-group'
            ref={provided.innerRef}
            style={{}}
            {...provided.droppableProps}
          >
            {sections.map((field, i) => {
              return (
                <DropDownElement
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

export default class DraggableDropDown extends Component {

  render() {
    const { sections, onDragEnd } = this.props

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <DropDownColumn sections={sections}/>
      </DragDropContext>
    )
  }
}
