import React, { Component } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import DocFieldsColumn from './DocFieldsColumn'

export default class DocumentFiledsTable extends Component {

  state = {
    fields: this.props.fields
  }

  onDragEnd = result => {
    const { fields } = this.state
    const { destination, source } = result
    let { draggableId } = result
    draggableId = draggableId.replace(/column_(.)_/g, '')

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
      ) {
      return
    }

    if (source.droppableId === destination.droppableId) {
      const column = fields[source.droppableId]
      const newFields = new Array(...column)

      newFields.splice(source.index, 1)
      newFields.splice(destination.index, 0, column[draggableId])

      const newState = {
        fields: {
          ...fields,
          [source.droppableId]: newFields
        }
      }

      this.setState(newState)
      return
    }

    const startColumn = fields[source.droppableId]
    const startFields = new Array(...startColumn)

    startFields.splice(source.index, 1)

    const finishColumn = fields[destination.droppableId]
    const finishFields = new Array(...finishColumn)
    finishFields.splice(destination.index, 0, startColumn[draggableId])

    const newState = {
      fields: {
        ...fields,
        [source.droppableId]: startFields,
        [destination.droppableId]: finishFields
      }
    }

    this.setState(newState)
  }

  render() {
    const { fields } = this.state

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <form className='form-body p-4'>
          <div className='row'>
            {Object.keys(fields).map((key, i) => (
              <DocFieldsColumn column={i + 1} fields={fields[key]} key={i}/>
            ))}
          </div>
        </form>
      </ DragDropContext>
    )
  }
}
