import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reorderFields } from '../../../../../actions/conventionActions'
import { DragDropContext } from 'react-beautiful-dnd'
import DocFieldsColumn from './DocFieldsColumn'
import ModalCreateField from './ModalCreateField'

class DocFiledsTable extends Component {

  onDragEnd = result => {
    const { fields, reorderFields } = this.props
    reorderFields(result, fields)
  }

  render() {
    const { fields } = this.props
    const fieldsKeys = Object.keys(fields)
    console.log(fields)
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <form className='form-body p-4'>
          <div className='row'>
            {fieldsKeys.map((key, i) => (
              <DocFieldsColumn column={i + 1} fields={fields[key]} key={i}/>
            ))}
          </div>

          <ModalCreateField
            column={fieldsKeys.length}
            row={fields[fieldsKeys.length].length + 1}
            closeUpdate={() => this.forceUpdate()}
          />
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

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => ({
  reorderFields: (result, fields) => dispatch(reorderFields(result, fields))
})

export default connect(mapStateToProps, mapDispatchToProps)(DocFiledsTable)
