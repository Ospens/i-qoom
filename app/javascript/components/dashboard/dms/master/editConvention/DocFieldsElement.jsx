import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popup } from 'semantic-ui-react'
import { Draggable } from 'react-beautiful-dnd'
import classnames from 'classnames'
import { initialize } from 'redux-form'
import DropDown from '../../../../../elements/DropDown'
import { SelectComponent } from '../../../../../elements/SelectField'

const actionConventions = index => (
  [
    {
      title: 'New field above',
      icon: 'icon-upload-menu2',
      offset: index
    },
    {
      title: 'New field below',
      icon: 'icon-upload-menu1',
      offset: index + 1
    },
    {
      title: 'Delete',
      icon: 'icon-bin-1',
      offset: index + 1
    }
  ]
)

class DocFieldsElement extends Component {

  editButton = row => {
    const { input: { value }, openInputForm, initModal } = this.props
    return (
      <button
        type='button'
        className='edit-button'
        onClick={() => {
          initModal({ ...value, row, new_section: '' })
          openInputForm()
        }}
      >
        Edit
      </button>
    )
  }

  accessList = () => (
    <Popup
      trigger={<span className='access-limited'>Access limited</span>}
      on='click'
    >
      <div className='tooltip-block'>
        <div className='tooltip-block-title'>
          <label className=''>Access limited to</label>
          <button className='btn p-0'>Edit</button>
        </div>
        <ul className='pt-2'>
          <li>Damla Lamm</li>
          <li>Damla Lamm</li>
        </ul>
      </div>
    </Popup>
  )

  renderInputByType = field => {
    const uniqName = `${field.column}_${field.row}`

    if (field.kind === 'upload_field') {
      return (
        <div className='drop-zone-area disabled'>
          <p>This is a drag & drop area.</p>
          <p>You can also browse your files manually.</p>
          <span>Click here to browse your files</span>
        </div>
      )
    } else if (field.kind === 'select_field') {
      return (
        <SelectComponent
          className='form-control-select'
          id={uniqName}
          placeholder={field.command}
          options={[]}
          isDisabled={true}
        />
      )
    } else if (field.kind === 'textarea_field') {
      return (
        <textarea
          className='form-control'
          id={uniqName}
          placeholder={field.command}
          readOnly={true}
          disabled
        />
      )
    } else {
      return (
        <input
          className='form-control'
          id={uniqName}
          placeholder={field.command}
          readOnly={true}
          disabled
          type='text'
        />
      )
    }
  }

  renderMenuItem = (icon, title, row, val = {}) => {
    const { openInputForm, initModal, input: { value } } = this.props

    return (
      <li
        className='dropdown-item'
        onClick={() => {
          openInputForm()
          initModal({ ...val, row, column: value.column })
        }}
      >
        <span className={classnames('gray', icon)} />
        <span className='item-text'>{title}</span>
      </li>
    )
  }

  renderCopyElement = () => {
    const { input: { value } } = this.props
    const row = value.row + 1
    const val = { ...value, id: undefined }
    return this.renderMenuItem('icon-common-file-double-1', 'Copy', row, val)
  }

  render() {
    const {
      index,
      column,
      removeField,
      disabled,
      input: { value },
      meta: { touched, error }
    } = this.props
    
    return (
      <Draggable
        draggableId={`row_${column}_${index}`}
        index={index}
        isDragDisabled={disabled}
      >
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={classnames(
              'draggable-container',
              { 'dragging': snapshot.isDragging },
              { 'undraggable': disabled }
            )}
            ref={provided.innerRef}
          >
            <div className='form-group'>
              <div className='form-group__title'>
                <DropDown
                  dots={true}
                  className='dropdown-with-icon mr-2'
                  defaultValues={actionConventions(index, value.codification_kind)}
                >
                  {!value.codification_kind &&
                  <React.Fragment>
                    {this.renderCopyElement()}
                    <li
                      className='dropdown-item'
                      onClick={() => removeField(column, index)}
                    >
                      <span className='' />
                      <span className='item-text'>Delete</span>
                    </li>
                  </React.Fragment>
                  }
                </DropDown>
                <label>{value.title}</label>
                {/* TODO: disable on the backed now */}
                {/* this.accessList() */}
              </div>
              {this.renderInputByType(value, index)}
              <div>
                {touched && error && 
                <div className='invalid-feedback convention-feedback'>
                  {error}
                </div>}
                {this.editButton(index)}
              </div>
            </div>
          </div>
        )}
      </Draggable>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  initModal: values => dispatch(initialize('convention_input_form', values)),
})

export default connect(null, mapDispatchToProps)(DocFieldsElement)
