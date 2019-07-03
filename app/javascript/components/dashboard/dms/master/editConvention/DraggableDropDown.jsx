import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import ReactSVG from 'react-svg'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import DropDown from '../../../../../elements/DropDown'
import dots from '../../../../../images/dots-horizontal'
import trashIcon from '../../../../../images/trash_bucket'
import sectionBelow from '../../../../../images/upload-menu1'
import sectionAbove from '../../../../../images/upload-menu2'
import copyIcon from '../../../../../images/folder-empty'

const portal = document.createElement('div')
portal.classList.add('draggable-portal')

class DropDownElement extends Component {

  render() {
    const {
      index,
      field,
      addNewSection,
      changeDDSection,
      copySection,
      removeSection
    } = this.props

    const newDDElementOtions = [
      {
        title: 'New section above',
        icon: sectionAbove,
        onClick: ((index) => addNewSection(index))
      },
      {
        title: 'New section below',
        icon: sectionBelow,
        onClick: ((index) => addNewSection(index + 1))
      },
      {
        title: 'Copy',
        icon: copyIcon,
        onClick: ((index) => copySection(index))
      },
      {
        title: 'Delete',
        icon: trashIcon,
        onClick: ((index) => removeSection(index))
      }
    ]
    document.body.appendChild(portal)
    
    return (
      <Draggable draggableId={`field_${index}`} index={index}>
        {(provided, snapshot) => {
          const usePortal = snapshot.isDragging

          const child = (
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
                  onChange={(e) => changeDDSection(e.target.value, index)}
                />
                <DropDown
                  dots={true}
                  dotsStyles={{ height: 25, width: 25, marginLeft: 10 }}
                  className='dropdown-with-icon dropleft'
                >
                  {newDDElementOtions.map(({icon, title, onClick }, i) => (
                    <React.Fragment key={i}>
                      <li
                        className='dropdown-item'
                        onClick={() => onClick(index)}
                      >
                        <ReactSVG
                          svgStyle={{ height: 15, width: 15 }}
                          src={icon}
                        />
                        <span className='item-text'>{title}</span>
                      </li>
                    </React.Fragment>
                  ))}
                </DropDown>
              </div>
            </div>
          )
          if (!usePortal) {
            return child
          }
          return ReactDOM.createPortal(child, portal)
        }}
      </Draggable>
    )
  }
}

class DropDownColumn extends Component {
  render() {
    const {
      sections,
      column,
      addNewSection,
      changeDDSection,
      removeSection,
      copySection
    } = this.props

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
                  addNewSection={addNewSection}
                  removeSection={removeSection}
                  copySection={copySection}
                  changeDDSection={changeDDSection}
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

class DraggableDropDown extends Component {

  render() {
    const {
      sections,
      onDragEnd,
      addNewSection,
      changeDDSection,
      removeSection,
      copySection
    } = this.props

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <DropDownColumn
        sections={sections}
        addNewSection={addNewSection}
        removeSection={removeSection}
        copySection={copySection}
        changeDDSection={changeDDSection}
      />
      </DragDropContext>
    )
  }
}

export default DraggableDropDown 