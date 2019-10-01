import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import NewModal from '../../../../elements/Modal'
import InputField from '../../../../elements/InputField'
import { startCreateFolder } from '../../../../actions/foldersActions'

export class CreateFolder extends Component {

  state = {
    modalOpen: false
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOpenBtn)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOpenBtn)
  }

  setWrapperRef = node => { this.wrapperRef = node }

  handleClickOpenBtn = event => {
    if (this.wrapperRef
        && (event.target.className.includes('openFolderForm') || event.target.closest('.openFolderForm'))) {
      this.handleOpen()
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  renderModalTrigger = () => (
    <button
      type='button'
      className='btn'
      onClick={this.handleOpen}
    >
      <span className='icon-add_1' />
      <span>New folder</span>
    </button>
  )

  handleSubmit = values => {
    const { match: { params: { project_id } }, createFolder } = this.props
    return createFolder(project_id, values).then(() => this.handleClose())
  }

  renderContent = () => {
    return (
      <form noValidate={true} onSubmit={this.props.handleSubmit(this.handleSubmit)} className='new-modal'>
        <div className='new-modal__header'>
          <h6>Create new folder</h6>
        </div>
        <div className='new-modal__body'>
          <Field
            name='title'
            label='Define a folder title'
            placeholder='Title'
            component={InputField}
          />
        </div>
        <div className='new-modal__footer'>
          <button
            type='button'
            className='btn btn-white'
            onClick={this.handleClose}
          >
            Cancel
          </button>
          <button type='submit' className='btn btn-purple'>
            Create
          </button>
        </div>
      </form>
    )
  }

  render() {
    const { modalOpen } = this.state
    const { trigger } = this.props

    return (
      <div ref={this.setWrapperRef}>
        <NewModal
          content={this.renderContent()}
          trigger={trigger || this.renderModalTrigger()}
          open={modalOpen}
          onClose={this.handleClose}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createFolder: (projectId, title) => dispatch(startCreateFolder(projectId, title))
})

export default withRouter(connect(null, mapDispatchToProps)(reduxForm( { form: 'document_folder' })(CreateFolder)))
