import React, { Component } from 'react'
import UserAvatar from 'react-user-avatar'
import NewModal from '../../../../../elements/Modal'
import rightsDropDown from './RightsDropDown'

export class ModalBulkAccessRights extends Component {

  state = {
    modalOpen: false
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => {
    this.setState({ ...initState })
  }

  renderModalTrigger = () => (
    <button
      type='button'
      className='dropdown-item btn'
      onClick={this.handleOpen}
    >
      <div>
        <i className='svg-icon gray share-file-icon mr-2' />
      </div>
      <span className='item-text'>Edit team / add members</span>
    </button>
  )
  
  renderContent = () => {
    return (
      <form>
        <div className='modal-container'>
          <div className='modal-container__title-block'>
            <h4>Apply attributes to selected members</h4>
          </div>
          <div className='modal-container__content-block'>
            <label>Selected persons</label>
            <div className='users-row-margin-left'>
              <UserAvatar size='42' name='TESST SET' />
              <UserAvatar size='42' name='Set Test' />
            </div>

            <div className='my-4'>
              <div className="form-group">
                <label>Select originating company</label>
                {rightsDropDown('FOU', 'Originating company')}
              </div>

              <div className="form-group">
                <label>Select discipline</label>
                {rightsDropDown('ASD', 'Discipline')}
              </div>

              <div className="form-group">
                <label>Select document type</label>
                {rightsDropDown('RTY, BNG', 'document type')}
              </div>
            </div>
            
          </div>       
        </div>
        <div className='modal-footer justify-content-center'>
          <button
            type='button'
            className='btn btn-white'
            onClick={this.handleClose}
          >
            Close
          </button>
          <button type='submit' className='btn btn-purple'>
            Apply
          </button>
        </div>
      </form>
    )
  }
    
  render() {
    const { modalOpen } = this.state

    return (
      <NewModal
        content={this.renderContent()}
        trigger={this.renderModalTrigger()}
        open={modalOpen}
        onClose={this.handleClose}
      />
    )
  }
}

export default ModalBulkAccessRights
