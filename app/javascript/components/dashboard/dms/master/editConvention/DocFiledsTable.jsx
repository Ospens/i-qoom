import React, { Component } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import DocFieldsColumn from './DocFieldsColumn'
import ModalCreateField from './ModalCreateField'

export default class DocFiledsTable extends Component {

  state = {
    fields: this.props.fields,
    creatingField: true
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
    const { fields, creatingField } = this.state

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {creatingField &&
          <ModalCreateField
            closeModal={() => this.setState({ creatingField: false })}
          />
        }
        <form className='form-body p-4'>
          <div className='row'>
            {Object.keys(fields).map((key, i) => (
              <DocFieldsColumn column={i + 1} fields={fields[key]} key={i}/>
            ))}
          </div>
          <button
            type='button'
            className="btn btn-create-new-field btn-purple my-4"
            onClick={() => this.setState({ creatingField: true })}
          >
            Create new input field
          </button>
        </form>
        <div className='dms-footer edit-convetion-footer'>
          <div className='changes-description'>
            You made changes to the upload <b>form 1.0 of convention 2 (not applied)</b>.
            Do you want to save all changes to update this form to <b>version 1.1</b>?
          </div>
          <div className="d-flex">
            <button type='button' className='btn btn-white'>Discard</button>
            <button type='submit' className='btn btn-purple'>Save all changes</button>
          </div>
        </div>
      </ DragDropContext>
    )
  }
}
